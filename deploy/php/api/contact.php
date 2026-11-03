<?php
/** Speaking requests, volunteer, partner, book-club and boutique sign-ups. Emails Tamecka. */
require __DIR__ . '/_lib.php';

$data = read_json();
guard($data);
if (!valid_email($data['email'] ?? null)) respond(['error' => 'Please enter a valid email.'], 400);

$fields = [];
foreach ($data as $key => $value) {
    if ($key === 'website' || is_array($value)) continue;
    $fields[clean_line($key)] = mb_substr(trim((string) $value), 0, 5000);
}
save_backup('contact', $fields);

$type = ucfirst($fields['type'] ?? 'contact');
$body = "New {$type} request from the website:\n\n";
foreach ($fields as $key => $value) $body .= ucfirst($key) . ": {$value}\n";

send_mail($config['to_email'], "Website: new {$type} request from " . ($fields['name'] ?? $fields['email']), $body, $fields['email']);
respond(['ok' => true]);
