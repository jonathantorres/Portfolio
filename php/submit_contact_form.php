<?php

	require_once('class.phpmailer.php');

	$username = htmlentities($_POST['un']);
	$email = htmlentities($_POST['ue']);
	$message = htmlentities($_POST['um']);

	// html body
	$body = '<h3>Mensaje de: ' . $username . '</h3>';
	$body .= 'Nombre: ' . $username;
	$body .= '<br>Email: ' . $email;
	$body .= '<br>Mensaje: ' . $message;
	$body .= '<br><br><br>www.jonathantorres.com';

	// alt text body
	$alt = 'Mensaje de: ' . $username . '\n\n';
	$alt .= 'Nombre: ' . $username;
	$alt .= '\nEmail: ' . $email;
	$alt .= '\nMensaje: ' . $message;
	$alt .= '\n\n\nwww.jonathantorres.com';

	// send email
	$mail = new PHPMailer();
	$mail->From = $email;
	$mail->FromName = $username;
	$mail->AddAddress('info@jonathantorres.com', 'Jonathan Torres');
	$mail->AddReplyTo($email, $username);

	$mail->IsHTML(true);
	$mail->Subject = 'Mensaje de: ' . $username;
	$mail->MsgHTML($body);
	$mail->AltBody = $alt;
	$mail->Send();

?>
