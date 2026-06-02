


async function sm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
        

    const formData = new FormData(form);
    formData.append("access_key", "03faeefc-7c18-444a-9955-ee540c62dd05");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}



const ContactView = {
    template: /*html*/`
        <div class="full-bg-secondary-dark d-flex-col pt-6 pb-5 gap-3 h-200">
            <div class="cont-page d-flex gap-1 justify-start align-center text-start">
                <span class="roboto-regular font-xl color-console"> $ </span>
                <h2 class="text-console font-xl text-primary typewriter-cursor" id="skillsTittle" data-i18n="contact.ping">ping contact.server</h2>
            </div>

            <span class="cont-page roboto-regular ms-3 font-md text-secondary" id="skillsSpan" data-i18n="contact.establishing">
                Establishing connection to communication endpoint
            </span>
        </div>

        <!-- Sección de Tecnologías / Skills -->
        <section class="full-bg-secondary pt-4 pb-4" id="contactSection">
            <div class="cont-page py-5 gap-3 d-grid grid-123 w-100">

                <form class="justify-self-center d-grid grid-122 gap-2 border-secondary border-hover grid-col-span-2 cont__to__animate" 
                    id="contactForm">

                    <h2 class="text-console color-console grid-col-all" data-i18n="contact.title">Contact Me</h2>

                    <label class="d-flex-col gap-1">
                        <span data-i18n="contact.name_label">Name:</span>
                        <input type="text" name="name" required>
                    </label>

                    <label class="d-flex-col gap-1">
                        <span data-i18n="contact.email_label">Email:</span>
                        <input type="email" name="email" required>
                    </label>

                    <label class="grid-col-all d-flex-col gap-1">
                        <span data-i18n="contact.message_label">Message:</span>
                        <textarea class="h-150" name="message" required></textarea>
                    </label>
                    
                    <div class="d-grid grid-col-all">
                        <button class="btn btn-main justify-self-center align-center px-3 py-1 gap-1" type="submit">
                            <span class="text-console font-md" data-i18n="contact.send_button">Send</span>
                            <i class="ri-send-plane-line font-md"></i>
                        </button>
                    </div>
                </form>

                <div class="contact-container gap-1 border-bot-header cont__to__animate">
                    <h3 class="text-console color-console" data-i18n="contact.availability_title">Availability Status</h3>

                    <span class="online-status">
                        <span class="status-dot online font-xl"></span>
                        <span class="text-console font-md" data-i18n="contact.open_to_opportunities">Open to opportunities</span>
                    </span>

                    <span class="text-secondary font-sm text-console" data-i18n="contact.response_time">Response time: Within 24 hours</span>
                    <span class="text-secondary font-sm text-console">
                        <i class="ri-time-zone-line font-md"></i>
                        <span data-i18n="contact.timezone">ART (UTC-3)</span>  
                    </span>
                    <span class="text-secondary font-sm text-console">
                        <i class="ri-map-pin-line font-md"></i>
                        <span data-i18n="contact.location">Córdoba, Argentina</span>
                    </span>

                    <h3 class="text-console color-console mt-2" data-i18n="contact.connect_title">Connect With Me</h3>
                    
                    <div class="d-grid grid-122 gap-2 mt-2">
                        <a class="btn btn-tag-effect" target="_blank" href="https://github.com/LucasCallamullo">
                            <span class="tag-effect-top text-console font-sm" data-i18n="contact.github_tag">Go GitHub</span>
                            
                            <div class="d-flex gap-1 align-center">
                                <i class="ri-github-line font-lg"></i>
                                <span class="text-console text-truncate font-md" data-i18n="contact.github_text">Git Hub</span>
                            </div>
                        </a>

                        <a class="btn btn-tag-effect" target="_blank" href="https://www.linkedin.com/in/lucas-callamullo/">
                            <span class="tag-effect-top text-console font-sm" data-i18n="contact.linkedin_tag">Go Linkedin</span>
                            
                            <div class="d-flex gap-1 align-center">
                                <i class="ri-linkedin-box-fill font-lg"></i>
                                <span class="text-console text-truncate font-md" data-i18n="contact.linkedin_text">Linkedin</span>
                            </div>
                        </a>

                        <a class="btn btn-tag-effect mt-2" target="_blank" href="mailto:lucas.callamullo.dev@gmail.com">
                            <span class="tag-effect-top text-console font-sm" data-i18n="contact.email_tag">Send Me Email!</span>
                            
                            <div class="d-flex gap-1 align-center">
                                <i class="ri-mail-line font-lg"></i>
                                <span class="text-console text-truncate font-md" data-i18n="contact.email_text">Email</span>
                            </div>
                        </a>

                        <button class="btn btn-tag-effect mt-2" id="copyEmailBtn">
                            <span class="tag-effect-top text-console font-sm" data-i18n="contact.copy_tag">Copy Email!</span>
                            
                            <div class="d-flex gap-1 align-center">
                                <i class="ri-file-copy-2-line font-lg"></i>
                                <span class="text-console text-truncate font-md" data-i18n="contact.copy_text">Email</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div class="full-bg-secondary-dark h-150"> </div>

            <div class="full-bg-secondary cont-page pt-6 pb-3"> 
            
                <div class="contact_cont d-flex-col align-center justify-center gap-1">

                    <div class="contact_cont_title d-flex-col align-center justify-center gap-2">
                        <div class="d-flex gap-1">
                            <span class="text-console font-xl prompt-console" data-i18n="contact.echo">$ echo</span>
                            <h2 class="text-console font-xl color-console typewriter-cursor" data-i18n="contact.thanks_message">"Thanks for stopping by"</h2>
                        </div>

                        <span class="font-lg text-console text-primary" data-i18n="contact.chat_invite"> 
                            If you want to chat, my emails are always open!
                        </span>

                        <span class="font-md text-console prompt-console" data-i18n="contact.faster_response">
                            I'll answer faster if you contact via email.
                        </span>
                    </div>

                    <div class="contact_cont_info">
                        <span class="text-console font-md text-secondary" data-i18n="contact.connection_message">
                            Connection established. Awaiting your message... :D
                        </span>
                    </div>

                    <!-- text phone to prevent not hover --> 
                    <span class="text-console font-md text-secondary d-flex-mobile" data-i18n="contact.connection_message_mobile">
                        Connection established. Awaiting your message... :D
                    </span>
                </div>
            </div>
        </section>
    `,
    
    onMount: function() {

        const titleElement = document.getElementById('skillsTittle');
        const description1 = document.getElementById('skillsSpan');

        // Retrieve title text from data attribute or fallback to text content
        const titleText = titleElement.getAttribute('data-original-text') || titleElement.textContent;

        // Temporarily clear text content while the title is typing
        const desc1Original = description1.textContent;
        description1.textContent = '';

        description1.classList.add('fade-init');

        // Start typewriter effect on the title
        TYPE_WRITER.typeTitle(titleElement, titleText, () => {
            // Restore original text content
            description1.textContent = desc1Original;
            
            // Fade in elements sequentially:
            // Line 1 appears first, then line 2, then buttons
            TYPE_WRITER.showSequential([
                { element: description1, delayBefore: 200, duration: 300 }
            ], 0);
        });

        // animated cards
        initSkillCardsAnimation();


        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                alert('Mensaje enviado (demo)');
                
                // await sm(form)

            });
        }
    }
};