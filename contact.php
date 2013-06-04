<section id="contact">
    <h1 class="title">Contact Me</h1>
    <p class="summary">Contact me here dude!! :P</p>
    <form id="contact_form">
        <ul>
            <li class="text_input">
                <label for="username">NAME</label>
                <input type="text" id="username" name="username" placeholder="NAME">
            </li>
            <li class="text_input">
                <label for="email">E-MAIL</label>
                <input type="email" id="email" name="email" placeholder="E-MAIL">
            </li>
            <li class="text_area">
                <label for="message">MESSAGE</label>
                <textarea id="message" name="message" placeholder="MESSAGE"></textarea>
            </li>
            <li>
                <p class="error_feedback"></p>
                <input type="submit" class="button" id="send" name="send" value="SEND">
            </li>
        </ul>
    </form>
    <div id="success">
    	<p>Thanks for your message!</p>
    	<a href="#" id="ok" class="button">OK</a>
    </div>
</section>