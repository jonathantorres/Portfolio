<?php

	require_once('class.phpmailer.php');

	$username = htmlentities($_POST['un']);
	$email = htmlentities($_POST['ue']);
	$message = htmlentities($_POST['um']);

	// html body
	$body = '<h3>Message from: ' . $username . '</h3>';
	$body .= 'Name: ' . $username;
	$body .= '<br>Email: ' . $email;
	$body .= '<br>Message: ' . $message;
	$body .= '<br><br><br>www.jonathantorres.com';

	// alt text body
	$alt = 'Message from: ' . $username . '\n\n';
	$alt .= 'Name: ' . $username;
	$alt .= '\nEmail: ' . $email;
	$alt .= '\nMessage: ' . $message;
	$alt .= '\n\n\nwww.jonathantorres.com';

	// send email
	$mail = new PHPMailer();
	$mail->From = $email;
	$mail->FromName = $username;
	$mail->AddAddress('info@jonathantorres.com', 'Jonathan Torres');
	$mail->AddReplyTo($email, $username);

	$mail->IsHTML(true);
	$mail->Subject = 'Message from: ' . $username;
	$mail->MsgHTML($body);
	$mail->AltBody = $alt;
	$mail->Send();

?>
