
const SKILLS_CONFIG = {
    categories: {
        languages: {
            title: "Languages",
            i18n: "skills.languages",
            items: ["Python", "Java", "JavaScript"]
        },
        backend: {
            title: "Back-End",
            i18n: "skills.backend",
            items: ["Spring Boot", "Django", "DRF"]
        },
        frontend: {
            title: "Front-End",
            i18n: "skills.frontend",
            items: ["React", "HTML5", "CSS3", "Bootstrap"]
        },
        databases: {
            title: "Databases",
            i18n: "skills.databases",
            items: ["PostgreSQL", "SQLite", "Redis"]
        },
        containers: {
            title: "Containers & Reverse Proxies",
            i18n: "skills.containers",
            items: ["Docker", "Docker Compose", "Nginx"]
        },
        devops: {
            title: "DevOps & Automation",
            i18n: "skills.devops",
            items: ["Git", "GitHub Actions", "Linux", "Bash"]
        },
        testing: {
            title: "Testing & Docs",
            i18n: "skills.testing",
            items: ["JUnit5", "PyTest", "Postman", "Swagger"]
        }
    },
    // Order uses the category keys
    order: ["languages", "backend", "frontend", "databases", "containers", "devops", "testing"]
};


/**
 * Renders the skills section from the SKILLS_CONFIG object.
 * Each category is rendered as a card with a title, window dots, and tech items.
 * @returns {string} HTML string of all skill cards
 */
function renderSkillsFromConfig() {
    return SKILLS_CONFIG.order.map(categoryKey => {
        const category = SKILLS_CONFIG.categories[categoryKey];
        
        // Guard clause: skip if category is missing
        if (!category) {
            console.warn(`Category not found: ${categoryKey}`);
            return '';
        }
        
        // desempaqueta keys in vars
        const { title: categoryTitle, i18n: i18nKey, items: techItems } = category;
        
        // Generate HTML for each technology item
        const itemsHTML = techItems.map(tech => {
            const url = TECH_STACK[tech];
            if (!url) {
                console.warn(`Icon not found for technology: ${tech}`);
                return '';
            }
            
            return /*html*/`
                <div class="d-flex align-center gap-1 skills__cont__card__img cont__to__animate">
                    <img class="skills__card__img" src="${url}" alt="${tech}">
                    <span class="text-console font-md text-truncate">${tech}</span>
                </div>
            `;
        }).join('');
        
        return /*html*/`
            <div class="card-skills">
                <div class="card-top-border d-flex justify-between align-center px-3 py-2">
                    <h3 class="d-flex font-md-plus color-console text-console tech-skill" data-i18n="${i18nKey}">
                        ${categoryTitle}
                    </h3>
                    <div class="d-flex gap-1">
                        <div class="dot dot-red"></div>
                        <div class="dot dot-yellow"></div>
                        <div class="dot dot-green"></div>
                    </div>
                </div>
                <div class="card-bot-border d-grid grid-123 gap-1 px-3 py-5">
                    ${itemsHTML}
                </div>
            </div>
        `;
    }).join('');
}


/**
 * Applies entry animation to skill cards after rendering.
 * Cards animate in from the left with staggered delays.
 * @param {number} [staggerDelay=30] - Delay in ms between each card animation
 */
function animateSkillCards(staggerDelay = 30, cards) {
    // Get all skill cards within the container
    
    if (!cards.length) {
        console.warn('No skill cards found to animate');
        return;
    }
    
    // Apply staggered animation
    cards.forEach((card, index) => {
        // Set custom transition delay based on index
        const delay = index * staggerDelay;
        card.style.transitionDelay = `${delay}ms`;
        
        // Force reflow to ensure transition works
        void card.offsetHeight;
        
        // Add animation class
        card.classList.add('animate-in');
    });
}


/**
 * Waits for DOM updates and then animates skill cards
 * @returns {Promise<void>}
 */
async function initSkillCardsAnimation(classHtml = '.cont__to__animate') {
    // Small delay to ensure DOM is ready
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Check if cards exist
    const cards = document.querySelectorAll(`${classHtml}`);
    
    if (cards.length === 0) {
        // Cards not found, wait a bit more
        await new Promise(resolve => setTimeout(resolve, 100));
        return initSkillCardsAnimation(classHtml); // Retry
    }
    
    // Apply animation
    animateSkillCards(40, cards);
}


const SkillView = {
    template: /*html*/`
        <div class="full-bg-secondary-dark d-flex-col pt-6 pb-5 gap-3 h-200">
            <div class="cont-page d-flex gap-1 justify-start align-center text-start">
                <span class="roboto-regular font-xl color-console"> $ </span>
                <h2 class="text-console font-xl text-primary typewriter-cursor" id="skillsTittle">ls -la skills/</h2>
            </div>

            <span class="cont-page roboto-regular ms-3 font-md text-secondary" id="skillsSpan" data-i18n="skills.exploring">
                Exploring technical expertise
            </span>
        </div>

        <!-- Sección de Tecnologías / Skills -->
        <section class="full-bg-secondary pt-4 pb-6" id="skillTech">
            <div class="cont-page py-5 d-grid gap-2 grid-122">

                <div class="d-flex-col gap-2 grid-col-all justify-self-center justify-center align-center pb-4">
                    <h2 class="text-console font-lg color-console" data-i18n="skills.featured">
                        Featured Technologies
                    </h2>
                    <span class="text-console text-secondary font-md" data-i18n="skills.subFeatured"> 
                        Tooling and stacks I have worked with
                    </span>
                </div>

                ${renderSkillsFromConfig()}
            </div>
        </section>
    `,

    /* funcion que se ejecuta al terminar el renderizado del anterior html */ 
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
    }
};
