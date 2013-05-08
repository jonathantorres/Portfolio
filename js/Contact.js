(function(window) {

	var $contact,
		$title,
		$summary,
		$contactForm,
		$success;

	function Contact() { }

	Contact.prototype.init = function() {
		cacheSelectors();
		$contact.addClass("viewedSection");

		/**
		 * Validate/Submit Form
		 */
		$contactForm.validate({
			rules : {
				username: "required",
				email: { required : true, email : true },
				message: "required"
			},

			messages : {
				username: "",
				email: "",
				message: ""
			},

			submitHandler : function(form) {
				var username = $("#username").val(),
					useremail = $("#email").val(),
					usermessage = $("#message").val();

				console.log(form);

				$.ajax({
					type : "POST",
					url : "php/submit_contact_form.php",
					data : { un : username, ue : useremail, um : usermessage }, 
					success : function() {				
						$contactForm.fadeOut("normal", function() {
							$success.fadeIn();
						});
					},
					error : function() {
						console.log("error!");
					}
				});
			}
		});
	};

	/**
	 * Selectors
	 */
	var cacheSelectors = function() {
		$contact = $("#contact");
		$title = $(".title");
		$summary = $(".summary");
		$contactForm = $("#contact_form");
		$success = $(".success");
	};

	window.Contact = Contact;
	
}(window));