(function(window) {

	var $contact,
		$title,
		$summary,
		$success,
		timeline;

	var $contactForm,
		$usernameField,
		$emailField,
		$messageField,
		$errorFeedback,
		$okButton,
		$sendButton;

	function Contact() { }

	Contact.prototype.init = function() {
		cacheSelectors();
		$contact.addClass('viewedSection');

		// display form by default
		$contactForm.css( { 'display' : 'block'} );
		$success.css( { 'display' : 'none'} );

		// remove any error classes
		$errorFeedback.text('');
		$usernameField.removeClass('error');
		$emailField.removeClass('error');
		$messageField.removeClass('error');

		resetValues();

		// animate!
		timeline = new TimelineMax();
		timeline.from($title, 1, { opacity : 0, ease : Expo.easeOut });
		timeline.from($summary, 1, { opacity : 0, marginLeft : '-60px', ease : Expo.easeOut }, '-=0.8');
		timeline.from($contactForm, 1, { opacity : 0, ease : Expo.easeOut }, '-=0.8');

		$usernameField.on('blur', function() {
			validateField($(this), false);
		});

		$messageField.on('blur', function() {
			validateField($(this), false);
		});

		$emailField.on('blur', function() {
			validateField($(this), true);
		});

		$emailField.on('keypress', function() {
			validateField($(this), true);
		});

		// send button
		$sendButton.on('click', function(e) {
			e.preventDefault();
			validateForm();
		});

		// "ENTER" key press
		$(window).on('keyup', function(e) {
			if (e.keyCode === 13) {
				validateForm();
			}
		});

		// go back to form
		$okButton.on('click', function(e) {
			e.preventDefault();

			$success.fadeOut('normal', function() {
				resetValues();
				$contactForm.fadeIn();
			});
		});
	};

	/**
	 * Validate a single field
	 */
	var validateField = function($field, isEmail) {
		var fieldValue = $field.val();

		if (fieldValue === '') {
			$errorFeedback.text('All fields are required.');
			$field.addClass('error');

			return false;
		}

		if (isEmail) {
			var emailRegex = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;

			if (fieldValue.search(emailRegex) === -1) {
				$errorFeedback.text('Invalid email.');
				$field.addClass('error');

				return false;
			}
		}

		if ($usernameField.hasClass('error') === false && $emailField.hasClass('error') === false && $messageField.hasClass('error') === false) {
			$errorFeedback.text('');
		}

		$field.removeClass('error');

		return true;
	};

	/**
	 * Check if all fields are OK
	 */
	var validateForm = function() {
		var usernameValidation = validateField($usernameField, false),
			emailValidation = validateField($emailField, true),
			messageValidation = validateField($messageField, false);

		if (usernameValidation === false || messageValidation === false) {
			$errorFeedback.text('All fields are required.');
			return false;
		}

		if (emailValidation === false) {
			$errorFeedback.text('Invalid email.');
			return false;
		}

		$errorFeedback.text('');
		$usernameField.removeClass('error');
		$emailField.removeClass('error');
		$messageField.removeClass('error');

		var username = $usernameField.val(),
			useremail = $emailField.val(),
			usermessage = $messageField.val();

		$.ajax({
			type : 'POST',
			url : 'php/submit_contact_form.php',
			data : { un : username, ue : useremail, um : usermessage }, 
			success : function() {
				$contactForm.fadeOut('normal', function() {
					$success.fadeIn();
				});
			},
			error : function() {
				console.log('error!');
			}
		});
	};

	/**
	 * Reset field values
	 */
	var resetValues = function() {
		$usernameField.val('');
		$emailField.val('');
		$messageField.val('');
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		$contact = $('#contact');
		$title = $('.title');
		$summary = $('.summary');
		$success = $('#success');

		$contactForm = $('#contact_form');
		$usernameField = $('#username');
		$emailField = $('#email');
		$messageField = $('#message');
		$errorFeedback = $('.error_feedback');
		$sendButton = $('#send');
		$okButton = $('#ok');
	};

	window.Contact = Contact;
	
}(window));