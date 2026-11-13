<?php
/**
 * ============================================================
 *  SITE SETTINGS: the only file you need to edit after upload
 * ============================================================
 */
return [
    // Where form submissions (speaking requests, volunteers, partners, sign-ups) are emailed
    'to_email'   => 'hello@tameckagrate.com',

    // "From" address on emails. Must be an address on this domain or hosts may block it.
    'from_email' => 'no-reply@tameckagrate.com',
    'from_name'  => 'Tamecka Grate Website',

    // Stripe secret key (Stripe Dashboard -> Developers -> API keys), starts with sk_live_
    // Leave empty to keep the shop + donations in safe preview mode (nothing is charged).
    'stripe_secret_key' => '',

    // Login for the settings page at /admin (PayPal email, inbox email, eBook link).
    // The password is stored scrambled (a hash), never in plain text. A plain password
    // also works here if you ever need to reset it. Empty = /admin switched off.
    // It can be changed later inside /admin.
    'admin_user'     => 'tameckagrate',
    'admin_password' => '$2y$10$1AKPM1mguIQz5rt2uOzx1uXFCYJ4ZGY61yOSHSgbnthobv38Ca04G',

    // Link to the free "Aspire to Inspire" eBook PDF, emailed to new subscribers.
    // e.g. upload the PDF to /downloads/ and put 'https://www.tameckagrate.com/downloads/aspire-to-inspire.pdf'
    // Leave empty to send the welcome email without a download link.
    'ebook_url' => '',
];
