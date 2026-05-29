<?php
define('RESEND_API_KEY', '%%RESEND_API_KEY%%');
define('FROM_EMAIL', 'Mallorca Wedding <noreply@mallorcawedding.co.uk>');
define('SITE_URL',   'https://mallorcawedding.co.uk');

$id    = preg_replace('/[^a-z0-9_-]/', '', strtolower($_GET['id'] ?? ''));
$token = trim($_GET['token'] ?? '');

if (!$id || !$token) { http_response_code(400); echo 'Missing parameters'; exit; }

$claim_file  = dirname(__DIR__) . '/planner_data/claims/' . $id . '.json';
$status_file = dirname(__DIR__) . '/planner_data/status/' . $id . '.json';

if (!file_exists($claim_file)) { http_response_code(404); echo 'Claim not found'; exit; }

$claim = json_decode(file_get_contents($claim_file), true);

if (!hash_equals($claim['approve_token'] ?? '', $token)) {
  http_response_code(403);
  echo 'Invalid token';
  exit;
}

if (($claim['status'] ?? '') === 'approved') {
  echo '<h2>Already approved</h2><p>This profile was already verified.</p>';
  exit;
}

// Mark as verified
$claim['status']      = 'approved';
$claim['verified_at'] = date('c');
file_put_contents($claim_file, json_encode($claim, JSON_PRETTY_PRINT));

// Status file includes the planner's submitted profile data so the site can use it immediately
file_put_contents($status_file, json_encode([
  'status'      => 'verified',
  'verified_at' => date('c'),
  'email'       => $claim['email'] ?? '',
  // Profile fields the planner submitted — used by the site to override static data
  'profile' => [
    'name'      => $claim['name']      ?? null,
    'firm'      => $claim['firm']      ?? null,
    'bio'       => $claim['bio']       ?? null,
    'services'  => $claim['services']  ?? null,
    'languages' => $claim['languages'] ?? null,
    'based'     => $claim['based']     ?? null,
    'website'   => $claim['website']   ?? null,
    'instagram' => $claim['instagram'] ?? null,
    'phone'     => $claim['phone']     ?? null,
    'email'     => $claim['email']     ?? null,
  ],
]));

$profile_url = SITE_URL . '/planner/' . $id . '/';
$name        = $claim['name'] ?? $id;
$firm        = $claim['firm'] ?? '';
$email       = $claim['email'] ?? '';
$plan_labels = ['ppl' => 'Pay-per-lead (€149/lead)', 'verified' => 'Verified Partner (€399/month)', 'premium' => 'Premium Partner (€899/month)'];
$plan_label  = $plan_labels[$claim['plan'] ?? 'ppl'] ?? ($claim['plan'] ?? '');

// Email to planner
if ($email) {
  $html = "
  <div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
    <div style='background:#6b7a3a;padding:24px 32px;border-radius:12px 12px 0 0'>
      <h1 style='color:#fff;margin:0;font-size:20px;font-weight:400'>Your profile is live</h1>
    </div>
    <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
      <p style='font-size:16px;line-height:1.7;margin:0 0 16px'>Hi {$name},</p>
      <p style='font-size:16px;line-height:1.7;margin:0 0 16px'>Great news — your profile on Mallorca Wedding is now <strong>verified and live</strong>. Couples can find you, view your profile, and send you enquiries directly.</p>
      <div style='background:#eef0e3;border-radius:10px;padding:20px;margin:20px 0'>
        <p style='margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;color:#6b7a3a;font-family:sans-serif'>What happens next</p>
        <ul style='margin:0;padding-left:20px;font-size:14px;line-height:2;font-family:sans-serif;color:#1A1512'>
          <li>Your first 2 matched leads are <strong>free</strong></li>
          <li>Leads are emailed to you with the couple's full brief</li>
          <li>You expressed interest in <strong>{$plan_label}</strong> — we'll be in touch to set this up</li>
          <li>Every enquiry from your profile goes directly to you</li>
        </ul>
      </div>
      <a href='{$profile_url}' style='background:#6b7a3a;color:#fff;padding:14px 28px;border-radius:100px;text-decoration:none;font-size:14px;font-family:sans-serif;font-weight:600;display:inline-block'>View your live profile →</a>
      <p style='font-size:14px;color:#8C7B6B;margin:24px 0 0;font-family:sans-serif'>Questions? Reply to this email or reach us at hello@mallorcawedding.co.uk</p>
    </div>
    <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px;font-family:sans-serif'>Mallorca Wedding · mallorcawedding.co.uk</p>
  </div>";

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode(['from' => FROM_EMAIL, 'to' => [$email], 'subject' => "Your Mallorca Wedding profile is live — first 2 leads free", 'html' => $html]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . RESEND_API_KEY, 'Content-Type: application/json'],
  ]);
  curl_exec($ch);
  curl_close($ch);
}

// Admin confirmation page
header('Content-Type: text/html');
echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Approved</title>
<style>body{font-family:Georgia,serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1A1512}
h1{font-style:italic;color:#6b7a3a} a{color:#6b7a3a}</style></head><body>
<h1>Profile approved</h1>
<p><strong>{$name}</strong> ({$firm}) is now verified on Mallorca Wedding.</p>
<p>A welcome email has been sent to {$email} explaining next steps and their {$plan_label} plan interest.</p>
<p><a href='{$profile_url}'>View live profile →</a></p>
</body></html>";
