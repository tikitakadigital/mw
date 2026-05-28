<?php
define('RESEND_API_KEY', '%%RESEND_API_KEY%%');
define('ADMIN_EMAIL', 'hello@mallorcawedding.co.uk');
define('FROM_EMAIL', 'Mallorca Wedding <noreply@mallorcawedding.co.uk>');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

$name       = htmlspecialchars(trim($data['name'] ?? ''));
$email      = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$guests     = htmlspecialchars(trim($data['guests'] ?? ''));
$month      = htmlspecialchars(trim($data['month'] ?? ''));
$year       = htmlspecialchars(trim($data['year'] ?? ''));
$venue      = htmlspecialchars(trim($data['venueName'] ?? ''));
$estimateLow  = htmlspecialchars(trim($data['estimateLow'] ?? ''));
$estimateHigh = htmlspecialchars(trim($data['estimateHigh'] ?? ''));
$tierName   = htmlspecialchars(trim($data['tierName'] ?? ''));
$tierDesc   = htmlspecialchars(trim($data['tierDesc'] ?? ''));
$complexity = htmlspecialchars(trim($data['complexityScore'] ?? ''));
$addOns     = $data['addOns'] ?? [];
$planners   = $data['planners'] ?? [];

if (!$name || !$email) { http_response_code(400); echo json_encode(['error' => 'Name and email required']); exit; }

// Build add-ons breakdown rows
$addOnRows = '';
foreach ($addOns as $a) {
  $label = htmlspecialchars($a['label'] ?? '');
  $value = htmlspecialchars($a['value'] ?? '');
  $addOnRows .= "<tr>
    <td style='padding:8px 0;border-bottom:1px solid #EDE9E1;font-size:14px;color:#4A3F35'>{$label}</td>
    <td style='padding:8px 0;border-bottom:1px solid #EDE9E1;font-size:14px;color:#1A1512;font-weight:600;text-align:right'>+€" . number_format((float)$value) . "</td>
  </tr>";
}

// Build planner cards
$plannerCards = '';
foreach ($planners as $i => $p) {
  $num   = $i + 1;
  $pName = htmlspecialchars($p['name'] ?? '');
  $firm  = htmlspecialchars($p['firm'] ?? '');
  $loc   = htmlspecialchars($p['location'] ?? '');
  $price = htmlspecialchars($p['price'] ?? '');
  $pid   = htmlspecialchars($p['id'] ?? '');
  $url   = 'https://mallorcawedding.co.uk/planner/' . $pid . '/';
  $plannerCards .= "
  <div style='border:1px solid #E4DDD4;border-radius:10px;padding:16px 20px;margin-bottom:10px'>
    <p style='margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6b7a3a;font-family:sans-serif'>Match #{$num}</p>
    <h3 style='margin:0 0 3px;font-size:18px;font-weight:400;font-family:Georgia,serif'>{$pName}</h3>
    <p style='margin:0 0 10px;font-size:13px;color:#8C7B6B;font-family:sans-serif'>{$firm} · {$loc} · From {$price}</p>
    <a href='{$url}' style='background:#6b7a3a;color:#fff;padding:8px 16px;border-radius:100px;text-decoration:none;font-size:12px;font-family:sans-serif'>View profile</a>
  </div>";
}

$coupleHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#6b7a3a;padding:24px 32px;border-radius:12px 12px 0 0'>
    <h1 style='color:#fff;margin:0;font-size:20px;font-weight:400'>Your refined Mallorca wedding estimate</h1>
  </div>
  <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <p style='font-size:14px;color:#8C7B6B;font-family:sans-serif;margin:0 0 20px'>Hi {$name} · {$guests} guests · {$month} {$year}" . ($venue ? " at {$venue}" : '') . "</p>

    <div style='background:#F6F3EE;border-radius:10px;padding:20px 24px;text-align:center;margin-bottom:24px'>
      <p style='font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8C7B6B;font-family:sans-serif;margin:0 0 6px'>All-in estimate</p>
      <p style='font-size:36px;font-style:italic;font-weight:500;color:#1A1512;margin:0'>€{$estimateLow} – €{$estimateHigh}</p>
      <p style='font-size:12px;color:#8C7B6B;font-family:sans-serif;margin:6px 0 0'>Venue, catering, infrastructure, florals, music, photography, planner fee and extras</p>
    </div>

    " . ($addOnRows ? "
    <table style='width:100%;border-collapse:collapse;margin-bottom:20px'>
      <thead><tr>
        <th style='text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8C7B6B;font-family:sans-serif;padding-bottom:8px;border-bottom:2px solid #E4DDD4'>What&apos;s included in this estimate</th>
        <th style='text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8C7B6B;font-family:sans-serif;padding-bottom:8px;border-bottom:2px solid #E4DDD4'>Cost</th>
      </tr></thead>
      <tbody>{$addOnRows}</tbody>
    </table>" : '') . "

    " . ($tierName ? "
    <div style='border:1px solid #E4DDD4;border-radius:10px;padding:16px 20px;margin-bottom:24px'>
      <p style='font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6b7a3a;font-family:sans-serif;margin:0 0 4px'>Recommended planner tier · {$complexity}/10 complexity</p>
      <p style='font-size:18px;font-weight:400;font-family:Georgia,serif;margin:0 0 4px;color:#1A1512'>{$tierName}</p>
      <p style='font-size:13px;color:#4A3F35;font-family:sans-serif;margin:0'>{$tierDesc}</p>
    </div>" : '') . "

    <p style='font-size:14px;color:#8C7B6B;font-family:sans-serif;margin:0 0 16px'>Your three matched planners:</p>
    {$plannerCards}

    <div style='margin-top:20px;text-align:center'>
      <a href='https://mallorcawedding.co.uk/planners/' style='border:1.5px solid #1A1512;color:#1A1512;padding:10px 22px;border-radius:100px;text-decoration:none;font-size:13px;font-family:sans-serif'>Browse the full directory</a>
    </div>
  </div>
  <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px;font-family:sans-serif'>Mallorca Wedding · An independent guide to getting married in Mallorca<br>mallorcawedding.co.uk</p>
</div>";

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => json_encode([
    'from'    => FROM_EMAIL,
    'to'      => [$email],
    'subject' => "Your Mallorca wedding all-in estimate, {$name}",
    'html'    => $coupleHtml,
  ]),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . RESEND_API_KEY, 'Content-Type: application/json'],
]);
$result = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status >= 400) {
  http_response_code(500);
  echo json_encode(['error' => 'Email failed', 'detail' => $result]);
} else {
  echo json_encode(['ok' => true]);
}
