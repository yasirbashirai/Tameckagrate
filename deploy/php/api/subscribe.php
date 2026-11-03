<?php
/** Email sign-up for the free Aspire to Inspire eBook. Notifies Tamecka + sends a welcome email. */
require __DIR__ . '/_lib.php';

$data = read_json();
guard($data);
$email = $data['email'] ?? null;
if (!valid_email($email)) respond(['error' => 'Please enter a valid email.'], 400);
$name = clean_line(mb_substr((string) ($data['name'] ?? ''), 0, 100));

save_backup('subscribe', ['name' => $name, 'email' => $email]);
send_mail($config['to_email'], "Website: new subscriber {$email}", "New email sign-up:\n\nName: {$name}\nEmail: {$email}\n");

$hi = $name ? "Hi {$name}," : 'Hi,';
$link = $config['ebook_url'] ? "\n\nHere is your free copy of Aspire to Inspire:\n{$config['ebook_url']}" : "\n\nYour free copy of Aspire to Inspire is on its way.";
send_mail($email, 'Welcome! Your Aspire to Inspire eBook', "{$hi}\n\nThank you for joining me.{$link}\n\nWith love,\nTamecka Grate\n", $config['to_email']);

respond(['ok' => true]);
