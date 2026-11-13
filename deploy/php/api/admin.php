<?php
/**
 * Backend for the /admin page: password login + saving site settings
 * (PayPal email, monthly giving, inbox email, eBook link).
 *
 *  GET                      -> { enabled, authed, settings? }
 *  POST { action: login, username, password }
 *  POST { action: save, settings: {...} }
 *  POST { action: password, current, next }
 *  POST { action: logout }
 *
 * Username + first password come from config.php. Once the password is
 * changed in /admin, the new one is stored hashed in data/settings.json.
 */
require __DIR__ . '/_lib.php';

header('Cache-Control: no-store');

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
session_name('tg_admin');
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
session_start();

$hash    = $settings['adminPasswordHash'] ?? '';
$initial = (string) ($config['admin_password'] ?? '');
$enabled = $hash !== '' || $initial !== '';
$authed  = $enabled && !empty($_SESSION['admin']);

function check_password(string $given): bool
{
    global $hash, $initial;
    if ($hash !== '') return password_verify($given, $hash);
    if ($initial === '') return false;
    // config.php may hold a hash (recommended) or a plain password
    return password_get_info($initial)['algo'] ? password_verify($given, $initial) : hash_equals($initial, $given);
}

/** The editable fields only (never the password hash). */
function editable(array $s): array
{
    return [
        'paypalEmail'   => (string) $s['paypalEmail'],
        'monthlyGiving' => (bool) $s['monthlyGiving'],
        'inboxEmail'    => (string) $s['inboxEmail'],
        'ebookUrl'      => (string) $s['ebookUrl'],
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    respond(['enabled' => $enabled, 'authed' => $authed] + ($authed ? ['settings' => editable($settings)] : []));
}

$body = read_json();
$action = $body['action'] ?? '';

if (!$enabled) respond(['error' => 'Admin is switched off. Set admin_password in api/config.php first.'], 403);

if ($action === 'login') {
    // Max 8 tries per visitor every 15 minutes
    $file = sys_get_temp_dir() . '/tg_login_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
    $tries = array_filter(json_decode(@file_get_contents($file) ?: '[]', true) ?: [], fn($t) => $t > time() - 900);
    if (count($tries) >= 8) respond(['error' => 'Too many attempts. Please wait 15 minutes.'], 429);
    $user = strtolower(trim((string) ($body['username'] ?? '')));
    $userOk = hash_equals(strtolower((string) ($config['admin_user'] ?? '')), $user);
    if (!check_password((string) ($body['password'] ?? '')) || !$userOk) {
        $tries[] = time();
        @file_put_contents($file, json_encode(array_values($tries)));
        respond(['error' => 'Wrong username or password.'], 401);
    }
    @unlink($file);
    session_regenerate_id(true);
    $_SESSION['admin'] = true;
    respond(['ok' => true, 'settings' => editable($settings)]);
}

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    respond(['ok' => true]);
}

if (!$authed) respond(['error' => 'Please log in again.'], 401);

if ($action === 'save') {
    $in = is_array($body['settings'] ?? null) ? $body['settings'] : [];
    $paypal = trim((string) ($in['paypalEmail'] ?? ''));
    $inbox  = trim((string) ($in['inboxEmail'] ?? ''));
    $ebook  = trim((string) ($in['ebookUrl'] ?? ''));
    if ($paypal !== '' && !valid_email($paypal)) respond(['error' => 'The PayPal email does not look right.'], 400);
    if ($inbox !== '' && !valid_email($inbox)) respond(['error' => 'The inbox email does not look right.'], 400);
    if ($ebook !== '' && !preg_match('#^https?://\S+$#i', $ebook)) respond(['error' => 'The eBook link must start with https://'], 400);

    $settings['paypalEmail']   = $paypal;
    $settings['monthlyGiving'] = !empty($in['monthlyGiving']);
    $settings['inboxEmail']    = $inbox;
    $settings['ebookUrl']      = $ebook;
    if (!save_settings($settings)) respond(['error' => 'Could not save. Check that the api/data folder is writable.'], 500);
    respond(['ok' => true, 'settings' => editable($settings)]);
}

if ($action === 'password') {
    $next = (string) ($body['next'] ?? '');
    if (!check_password((string) ($body['current'] ?? ''))) respond(['error' => 'Current password is wrong.'], 400);
    if (strlen($next) < 8) respond(['error' => 'New password needs at least 8 characters.'], 400);
    $settings['adminPasswordHash'] = password_hash($next, PASSWORD_DEFAULT);
    if (!save_settings($settings)) respond(['error' => 'Could not save. Check that the api/data folder is writable.'], 500);
    respond(['ok' => true]);
}

respond(['error' => 'Unknown action.'], 400);
