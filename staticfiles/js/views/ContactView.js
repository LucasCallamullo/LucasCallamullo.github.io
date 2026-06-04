/**
 * ================================================================
 * CONTACT FORM HANDLER - Web3Forms Integration
 * ================================================================
 * 
 * This function handles form submission to Web3Forms API,
 * a free service that forwards form data to email.
 * 
 * Features:
 *   - Base64-encoded access key (basic obfuscation)
 *   - Success/error UI feedback via span element
 *   - Loading state with disabled button
 *   - i18n support for multilingual messages
 *   - Graceful error handling with API error messages
 * 
 * Security note: The access key is public and rate-limited by Web3Forms.
 * For production, consider proxying through a backend.
 * 
 * @param {HTMLFormElement} form - The form element containing inputs
 * @param {HTMLElement} spanForm - Element to display success/error messages
 * 
 * @returns {Promise<void>}
 * 
 * @example
 * const form = document.querySelector('#contact-form');
 * const feedbackSpan = document.querySelector('#form-feedback');
 * sm(form, feedbackSpan);
 * ================================================================
 */


async function sm(form, spanForm) {

    // ============================================================
    // Helper: Render success message in the feedback span
    // ============================================================
    /**
     * Displays a success message with a thank you note
     * 
     * @param {HTMLElement} spanForm - Target element to insert the HTML
     */
    const renderSuccess = (spanForm) => {
        // Get translated strings from global translations object
        const textContact = getTranslationValue(g_TRANSLATIONS, "contact.email_success");
        const textThanks = getTranslationValue(g_TRANSLATIONS, "contact.email_thanks_success");

        spanForm.innerHTML = /*html*/`
            <span class="text-console form-md color-console mt-5 ms-2" data-i18n="contact.email_success">
                ${textContact || 'Message sent successfully!'} 
            </span>

            <div class="tooltip-container mt-5">
                <span class="tooltip font-md text-console" data-i18n="contact.email_thanks_success">
                    ${textThanks || 'Thank u!'}  
                </span>
                <i class="ri-mail-check-line icon_cart font-lg"></i>
            </div>
        `;
    };

    // ============================================================
    // Helper: Render error message in the feedback span
    // ============================================================
    /**
     * Displays an error message (custom or generic)
     * 
     * @param {HTMLElement} spanForm - Target element to insert the HTML
     * @param {Object|null} data - API response data containing error message
     */
    const renderError = (spanForm, data = null) => {
        // Get translated error string
        const textError = getTranslationValue(g_TRANSLATIONS, "contact.email_error");
        // Use API error message if available, otherwise fallback to generic
        const apiError = data?.message || "Something went wrong. Please try again.";

        spanForm.innerHTML = /*html*/`
            <span class="text-console form-md color-console mt-5 ms-2" data-i18n="contact.email_error">
                ${textError} ${apiError} 
            </span>
        `;
    };

    // ============================================================
    // Main submission logic
    // ============================================================

    // Get the submit button to control its state
    const submitBtn = form.querySelector('button[type="submit"]');
        
    // ============================================================
    // Access Key (base64 encoded for basic obfuscation)
    // ============================================================
    // Note: This access key is public and rate-limited by Web3Forms.
    // For production, this should be proxied through a backend.
    // Key is base64-encoded to avoid plain-text scraping.
    // Decoding: atob("MDNmYWVlZmMt...") = "03faeefc-7c18-444a-9955-ee540c62dd05"
    const ACCESS_KEY = atob("MDNmYWVlZmMtN2MxOC00NDRhLTk5NTUtZWU1NDBjNjJkZDA1");

    // Prepare form data
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);

    // Set loading state
    const parentContainer = submitBtn.parentElement;
    parentContainer.originalHtml = parentContainer.innerHTML;

    // Optional: smooth scroll to form
    window.scrollBy({ top: 170, behavior: 'smooth' });

    parentContainer.innerHTML = /*html*/`
        <div class="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
        </div>
    `

    try {
        // ========================================================
        // Send request to Web3Forms API
        // ======================================================== /* 
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json(); 

        // Handle response based on HTTP status
        if (response.ok) {
            renderSuccess(spanForm);
            // form.reset(); // Uncomment to clear form after successful submission
        } else {
            renderError(spanForm, data);
        } 

        // For testing
        // renderSuccess(spanForm);

    } catch (error) {
        // Network error or request failure
        renderError(spanForm, null);
    } finally {
        // Restore button state regardless of success/failure
        setTimeout(()=> { parentContainer.innerHTML = parentContainer.originalHtml }, 300)
    }
}


const ContactView = {
    template: /*html*/`
        <div class="full-bg-secondary-dark d-flex-col pt-6 pb-5 gap-3 h-200">
            <div class="cont-page d-flex gap-1 justify-start align-center text-start">
                <span class="roboto-regular font-xl color-console"> $ </span>
                <h2 class="text-console font-xl text-primary typewriter-cursor" 
                    id="skillsTittle" data-i18n="contact.ping">   ping contact.server</h2>
            </div>

            <span class="cont-page roboto-regular ms-3 font-md text-secondary" id="skillsSpan" data-i18n="contact.establishing">
                Establishing connection to communication endpoint
            </span>
        </div>

        <!-- Sección de Tecnologías / Skills -->
        <section class="full-bg-secondary pt-4 pb-4" id="contactSection">
            <div class="cont-page py-5 gap-3 d-grid grid-123 w-100">

                <!-- Formulario -->
                <form class="justify-self-center d-grid grid-122 gap-2 border-secondary border-hover 
                    grid-col-span-2 def__container cont__to__animate" id="contactForm">

                    <h2 class="text-console color-console grid-col-all" data-i18n="contact.title">Contact Me</h2>

                    <label class="d-flex-col gap-1">
                        <span class="text-console font-md text-primary" data-i18n="contact.name_label">Name:</span>
                        <input type="text" name="name" required>
                    </label>

                    <label class="d-flex-col gap-1">
                        <span class="text-console font-md text-primary" data-i18n="contact.email_label">Email:</span>
                        <input type="email" name="email" required>
                    </label>

                    <label class="grid-col-all d-flex-col gap-1">
                        <span class="text-console font-md text-primary" data-i18n="contact.message_label">Message:</span>
                        <textarea class="h-150" name="message" required></textarea>
                    </label>
                    
                    <div class="d-grid grid-col-all">
                        <button class="btn btn-main justify-self-center align-center px-3 py-1 gap-1" type="submit">
                            <span class="text-console font-md-plus" data-i18n="contact.send_button">Send</span>
                            <i class="ri-send-plane-line font-md-plus"></i>
                        </button>
                    </div>
                </form>

                <div class="def__container d-flex-col gap-1 border-bot-header cont__to__animate">
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

            <!--  Span de enviado email -->
            <div class="full-bg-secondary-dark h-160">
                <div class="cont-page d-flex gap-2 justify-center align-center" id="spanForm">
                    
                </div>
            </div>

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

        applyTranslations();



        /**
         * Title element where typewriter effect will be applied
         * @type {HTMLElement}
         */
        const titleElement = document.getElementById('skillsTittle');
        
        /**
         * Description span that will fade in after title typing completes
         * @type {HTMLElement}
         */
        const description1 = document.getElementById('skillsSpan');

        // Retrieve title text from data attribute or fallback to text content
        const titleText = titleElement.getAttribute('data-original-text') || titleElement.textContent;

        // Temporarily clear text content while the title is typing
        const desc1Original = description1.textContent;
        // Clear description text temporarily (will be shown via fade-in later)
        description1.textContent = '';
        
        // Add initial fade class for smooth entrance animation
        description1.classList.add('fade-init');

        /**
         * Start typing animation on the title element.
         * When typing completes, the callback function executes.
         */
        TYPE_WRITER.typeTitle(titleElement, titleText, () => {
            // Restore original text content
            description1.textContent = desc1Original;
            
            /**
             * Animate elements in sequence:
             * - description1: fades in after 200ms delay, over 300ms
             * 
             * The TYPE_WRITER.showSequential method handles the timing
             * and CSS class management for each element in the array.
             */
            TYPE_WRITER.showSequential([
                { 
                    element: description1,      // DOM element to animate
                    delayBefore: 200,           // Milliseconds to wait before animation
                    duration: 300               // Animation duration in milliseconds
                }
            ], 0); // Initial delay before first animation (0ms)
        });

        /**
         * Initialize entrance animation for skill cards.
         * Typically applies staggered fade-in/scale effects.
         */
        initSkillCardsAnimation();


        /**
         * Get contact form and its feedback container elements.
         * These are optional — form may not exist on all pages.
         */
        const form = document.getElementById('contactForm');
        const spanForm = document.getElementById('spanForm');
        
        /**
         * Bind submit event handler to the contact form if it exists.
         * Prevents default browser behavior and delegates to custom sm() function.
         * 
         * @param {Event} e - Submit event
         */
        if (form && spanForm) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();           // Prevent page reload
                await sm(form, spanForm);     // Handle form submission with feedback
            });
        }
    }
};