<?php
/**
 * Creates a Stripe Checkout session for either:
 *  - kind "shop":     cart items (prices looked up here from products.json, never trusted from the browser)
 *  - kind "donation": one-time or monthly gift
 * Without a Stripe key in config.php it runs in preview mode and charges nothing.
 */
require __DIR__ . '/_lib.php';

$body = read_json();
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https' ? 'https' : 'http';
$origin = $scheme . '://' . $_SERVER['HTTP_HOST'];
$donation = ($body['kind'] ?? '') === 'donation';

$params = [
    'success_url' => $origin . '/thank-you/?type=' . ($donation ? 'donation' : 'order'),
    'cancel_url'  => $origin . ($donation ? '/donate/' : '/shop/'),
];

if ($donation) {
    $amount = (int) round(((float) ($body['amount'] ?? 0)) * 100);
    if ($amount < 100 || $amount > 5000000) respond(['message' => 'Please choose an amount between $1 and $50,000.'], 400);
    $monthly = !empty($body['monthly']);
    $params['mode'] = $monthly ? 'subscription' : 'payment';
    $params['line_items'][0] = [
        'quantity' => 1,
        'price_data' => [
            'currency' => 'usd',
            'unit_amount' => $amount,
            'product_data' => ['name' => ($monthly ? 'Monthly gift' : 'Gift') . ' to From Survivor to Soft'],
        ],
    ];
    if ($monthly) $params['line_items'][0]['price_data']['recurring'] = ['interval' => 'month'];
    else $params['submit_type'] = 'donate';
} else {
    $catalog = [];
    foreach (json_decode(file_get_contents(__DIR__ . '/products.json'), true) as $p) $catalog[$p['id']] = $p;
    $lines = [];
    foreach (is_array($body['items'] ?? null) ? $body['items'] : [] as $item) {
        $product = $catalog[$item['id'] ?? ''] ?? null;
        if (!$product) continue;
        $lines[] = [
            'quantity' => min(20, max(1, (int) ($item['qty'] ?? 1))),
            'price_data' => [
                'currency' => 'usd',
                'unit_amount' => (int) round($product['price'] * 100),
                'product_data' => ['name' => $product['name']],
            ],
        ];
    }
    if (!$lines) respond(['message' => 'Your bag is empty.'], 400);
    $params['mode'] = 'payment';
    $params['shipping_address_collection'] = ['allowed_countries' => ['US']];
    $params['line_items'] = $lines;
}

if (empty($config['stripe_secret_key'])) {
    respond(['message' => "Preview mode: secure checkout switches on once Tamecka's Stripe account is connected. Nothing was charged."]);
}

$ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERPWD => $config['stripe_secret_key'] . ':',
    CURLOPT_POSTFIELDS => http_build_query($params),
    CURLOPT_TIMEOUT => 20,
]);
$session = json_decode((string) curl_exec($ch), true);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status !== 200 || empty($session['url'])) {
    error_log('[checkout] stripe error: ' . ($session['error']['message'] ?? 'no response'));
    respond(['message' => 'Checkout is unavailable right now. Please try again.'], 502);
}
respond(['url' => $session['url']]);
