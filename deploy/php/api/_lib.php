<?php
/** Shared helpers for the site's form + checkout endpoints. */

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

$config = require __DIR__ . '/config.php';

/** Send a JSON response and stop. */
function respond(array $data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

/** Only accept POST with a JSON body. */
function read_json(): array
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Method not allowed.'], 405);
    $data = json_decode(file_get_contents('php://input') ?: '', true);
    return is_array($data) ? $data : [];
}

function valid_email($email): bool
{
    return is_string($email) && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/** Strip anything that could break out of an email header. */
function clean_line($value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', (string) $value));
}

/** Keep a private backup of every submission (folder is blocked from the web). */
function save_backup(string $kind, array $data): void
{
    $row = ['time' => date('c'), 'kind' => $kind] + $data;
    @file_put_contents(__DIR__ . '/data/submissions.log', json_encode($row) . PHP_EOL, FILE_APPEND | LOCK_EX);
}

function send_mail(string $to, string $subject, string $body, string $replyTo = ''): bool
{
    global $config;
    $headers = [
        'From: ' . clean_line($config['from_name']) . ' <' . clean_line($config['from_email']) . '>',
        'Content-Type: text/plain; charset=utf-8',
    ];
    if ($replyTo && valid_email($replyTo)) $headers[] = 'Reply-To: ' . clean_line($replyTo);
    return @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

/** Simple honeypot + per-IP rate limit to keep spam bots out. */
function guard(array $data): void
{
    if (!empty($data['website'])) respond(['ok' => true]); // bots fill hidden fields
    $file = sys_get_temp_dir() . '/tg_rate_' . md5($_SERVER['REMOTE_ADDR'] ?? '');
    $hits = array_filter(json_decode(@file_get_contents($file) ?: '[]', true) ?: [], fn($t) => $t > time() - 600);
    if (count($hits) >= 10) respond(['error' => 'Too many requests. Please try again later.'], 429);
    $hits[] = time();
    @file_put_contents($file, json_encode(array_values($hits)));
}
