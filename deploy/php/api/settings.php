<?php
/** Public settings the pages need at runtime (which PayPal account checkout goes to). No secrets here. */
require __DIR__ . '/_lib.php';

header('Cache-Control: no-store');
respond([
    'paypalEmail'   => (string) $settings['paypalEmail'],
    'monthlyGiving' => (bool) $settings['monthlyGiving'],
]);
