const querystring = require('querystring');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST'
      },
      body: JSON.stringify({ success: false, message: 'Invalid request method.' })
    };
  }

  const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
  let payload = {};

  try {
    if (contentType.includes('application/json')) {
      payload = JSON.parse(event.body || '{}');
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      payload = querystring.parse(event.body || '');
    } else {
      payload = JSON.parse(event.body || '{}');
    }
  } catch (error) {
    console.error('Failed to parse request body', error);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, message: 'Invalid request payload.' })
    };
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const subject = (payload.subject || '').trim();
  const message = (payload.message || '').trim();

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, message: 'Please fill in all required fields.' })
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, message: 'Please enter a valid email address.' })
    };
  }

  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    name,
    email,
    subject,
    message,
    ip: event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || 'unknown'
  };

  // Log to Netlify function logs
  console.info('VSFF contact submission', logEntry);

  let emailSent = false;
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'vastudentff@gmail.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'VSFF Website <noreply@vastudentfilmfest.com>';

  if (resendApiKey) {
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `VSFF Contact Form: ${subject || 'No Subject'}`,
          text: [
            'New contact form submission from Virginia Student Film Festival website:',
            '',
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject || 'No Subject'}`,
            '',
            'Message:',
            message,
            '',
            '---',
            `Submitted: ${timestamp}`,
            `IP: ${logEntry.ip}`
          ].join('\n')
        })
      });

      if (!emailResponse.ok) {
        const errorBody = await emailResponse.text();
        console.error('Email provider responded with error', emailResponse.status, errorBody);
      } else {
        emailSent = true;
      }
    } catch (error) {
      console.error('Failed to send email via Resend', error);
    }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      logged: 'function_log',
      email_sent: emailSent ? 'yes' : 'no'
    })
  };
};

