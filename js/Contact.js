(function(window) {

	var $contact;

	function Contact() {
		
	}

	Contact.prototype.init = function() {
		$contact = $("#contact");
		$contact.addClass("viewedSection");
	};

	window.Contact = Contact;
	
}(window));