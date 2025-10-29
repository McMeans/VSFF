<?php
// Virginia Student Film Festival - Contact Form Handler
// Simple, reliable contact form that logs submissions and attempts to send email

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get and sanitize form data
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }
    
    // Create log entry
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    
    // Log to file (always works)
    $log_file = 'contact_submissions.log';
    $log_line = json_encode($log_entry) . "\n";
    $log_success = file_put_contents($log_file, $log_line, FILE_APPEND | LOCK_EX);
    
    // Try to send email
    $to = 'vastudentff@gmail.com';
    $email_subject = 'VSFF Contact Form: ' . ($subject ? $subject : 'No Subject');
    $email_body = "New contact form submission from Virginia Student Film Festival website:\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Subject: " . ($subject ? $subject : 'No Subject') . "\n\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n";
    
    $headers = "From: VSFF Website <noreply@vasff.org>\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $email_sent = @mail($to, $email_subject, $email_body, $headers);
    
    // Always return success since we have the data logged
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We\'ll get back to you soon.',
        'logged' => $log_success ? 'yes' : 'no',
        'email_sent' => $email_sent ? 'yes' : 'no'
    ]);
    
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>