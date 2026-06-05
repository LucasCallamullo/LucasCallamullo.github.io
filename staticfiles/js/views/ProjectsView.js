

// ========================  DATA DE PROYECTOS ========================
const projectsData = [
    {
        id: "1",
        group: ["Back-End", "Front-End", "DevOps", "SQL"],
        date_es: "2024 - \nEn progreso",
        date_en: "2024 - \nIn Progress",
        title_es: "E-commerce Engine",
        title_en: "E-commerce Engine",
        icon: "ri-store-3-line",
        descriptionList_es: [
            "Motor modular de e-commerce con Django, Docker y Vanilla JS.",
            "Integración Mercado Pago (webhooks + API), carga masiva vía CSV/Excel.",
            "Caché Redis, búsqueda full-text con PostgreSQL, test suite con pytest, reverse proxy Nginx.",
            "Arquitectura de monolito modular con capa de servicios, listo para VPS."
        ],
        descriptionList_en: [
            "Modular e-commerce engine with Django, Docker and Vanilla JS.",
            "Mercado Pago integration (webhooks + API), bulk CSV/Excel product upload.",
            "Redis caching, PostgreSQL full-text search, pytest test suite, Nginx reverse proxy.",
            "Modular monolith architecture with service layer, ready for VPS deployment."
        ],
        techStack: ["Python", "Django", "DRF", "PostgreSQL", "Redis", "Docker", "Docker Compose", "Nginx", "Mercado Pago API", "pytest"],
        githubLink: "https://github.com/LucasCallamullo/E-commerce-Public-Demo",
        liveLink: null
    },
    {
        id: "4",
        group: ["Back-End", "DevOps", "SQL"],
        date_es: "2025 - \nEn progreso",
        date_en: "2025 - \nIn Progress",
        title_es: "Microservicios · Gestión de flotas",
        title_en: "Microservices · Fleet Management",
        icon: "ri-git-merge-line",
        descriptionList_es: [
            "Sistema de gestión de contenedores y flotas con arquitectura de microservicios.",
            "API Gateway (Spring Cloud Gateway), autenticación centralizada con Keycloak (OAuth2/JWT).",
            "Comunicación síncrona/asíncrona entre microservicios. Docker Compose para orquestación."
        ],
        descriptionList_en: [
            "Container and fleet management system based on microservices architecture.",
            "API Gateway (Spring Cloud Gateway), centralized authentication with Keycloak (OAuth2/JWT).",
            "Synchronous/asynchronous communication between microservices. Docker Compose orchestration."
        ],
        techStack: ["Java 17", "Spring Boot", "Spring Cloud", "JWT", "Keycloak", "PostgreSQL", "Docker", "Docker Compose", "JUnit5"],
        githubLink: "https://github.com/LucasCallamullo/java-backend-3k2",
        liveLink: null
    },
    {
        id: "3",
        group: ["Back-End", "SQL"],
        date_es: "2026 - \nEn progreso",
        date_en: "2026 - \nIn Progress",
        title_es: "Student Forum · API con JWT",
        title_en: "Student Forum · JWT Auth API",
        icon: "ri-nodejs-line",
        descriptionList_es: [
            "API para foro estudiantil con Node.js, Express y Sequelize (PostgreSQL).",
            "Autenticación JWT manual: registro, login, middleware de validación.",
            "Arquitectura por capas (Controllers → Services → Models) + encriptación bcrypt.",
            "Documentación Swagger, tests Jest/Supertest, manejo de errores centralizado."
        ],
        descriptionList_en: [
            "Student forum REST API with Node.js, Express and Sequelize (PostgreSQL).",
            "Manual JWT authentication: signup, login, token validation middleware.",
            "Layered architecture (Controllers → Services → Models) + bcrypt encryption.",
            "Swagger documentation, Jest/Supertest tests, centralized error handling."
        ],
        techStack: ["Node.js", "Express", "Sequelize", "JWT", "bcrypt", "PostgreSQL", "Jest", "Swagger"],
        githubLink: "https://github.com/LucasCallamullo/desarrollo-software-3k1",
        liveLink: "https://www.youtube.com/watch?v=jWQxnE9pUiw&list=PLXN8Fu4EL1x9gvbNMOsEdly4CRy4PdB8y"
    }
];



// renderizar cards
function renderProjects() {


    // simple escape para evitar inyección (por si los textos contienen caracteres raros)
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/[&<>]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            return m;
        }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
            return c;
        });
    }


    // Helper para crear badges de tecnologías
    function renderTechTags(tags) {
        if (!tags || tags.length === 0) return '';
        return /*html*/`
            <div class="d-flex-wrap gap-1 mt-1">
                ${tags.map(tag => /*html*/`<span class="tech_tag text-truncate font-sm">${escapeHtml(tag)}</span>`)
            .join('')}</div>
        `;
    }


    const gridContainer = document.getElementById('projectsGrid');
    if (!gridContainer) return;

    let cardsHtml = '';

    projectsData.forEach((proj, index) => {
        
        // card header stuff
        const imgUrl = (index % 2 == 0) ? "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            : "https://img.magnific.com/free-vector/brochure-design-template-mockup-vector_53876-75862.jpg";
            

        // renderizas los devops, backend sobre la imagen
        const groupsStrings = proj.group || [];
        const groupsHtml = groupsStrings.map(gr => {
            return /*html*/`<span class="text-console bolder card_header_tags_tag bold-main">${gr}</span>`
        }).join('');


        // card body stuff
        // descripción con saltos de línea respetados un poco
        const descriptions = (CURRENT_LANG === 'en') ? proj.descriptionList_en : proj.descriptionList_es;
        const descriptionHtml = (descriptions) ? descriptions.map(line => 
            /*html*/`<p class="font-md text-secondary text-pre-wrap">${escapeHtml(line)}</p>`
        ).join('') : '';

        

        // enlaces: si no hay liveLink, solo mostramos github; si existe, dos botones.
        const hasGithub = proj.githubLink;
        const hasLive = proj.liveLink;

        let actionButtons = /*html*/`
            <div class="d-flex-wrap gap-1 mt-1">
                ${hasGithub ? /*html*/`
                    <a href="${proj.githubLink}" target="_blank" rel="noopener noreferrer" 
                        class="btn btn_card btn_primary_card px-2 py-1 gap-1">
                        <i class="ri-github-line font-md-plus"></i> Repository
                    </a>` : ''}

                ${hasLive ? /*html*/`
                    <a href="${proj.liveLink}" target="_blank" rel="noopener noreferrer" 
                        class="btn btn_card px-2 py-1 gap-1">
                        <i class="ri-external-link-line font-md-plus"></i> Live Demo / Video
                    </a>` : ''}

                ${!hasGithub && !hasLive ? /*html*/`
                    <span class="btn btn_card px-2 py-1">
                        <i class="ri-information-line font-md-plus"></i> More info soon
                    </span>` : ''}
            </div>
        `;

        const title = (CURRENT_LANG === 'en') ? proj.title_en : proj.title_es;
        const dateText = (CURRENT_LANG === 'en') ? proj.date_en : proj.date_es;

        cardsHtml += /*html*/`
            <div class="project-card d-flex-col cont__to__animate  border-hover">

                <div class="card_header">
                    <img src="${imgUrl}" alt="" class="card_header_img">

                    <div class="card_header_date d-flex justify-start align-start">
                        <span class="font-md bolder text-console text-pre-wrap">${escapeHtml(dateText)}</span>
                    </div>
                    <div class="card_header_tags d-flex-col align-end gap-1">${groupsHtml}</div>
                </div>

                <div class="mt-1 d-flex-col align-start justify-start gap-1 px-3 pb-3">
                    <h3 class="text-console color-console">${escapeHtml(title)}</h3>
                    <div class="d-flex-col gap-1">
                        ${descriptionHtml}
                    </div>

                    ${renderTechTags(proj.techStack)}

                    ${actionButtons}
                </div>
            </div>
        `;
    });
    gridContainer.innerHTML = cardsHtml;
}








// 1. DEFINIR TUS VISTAS COMO OBJETOS GLOBALES
const ProjectsView = {
    template: /*html*/`
        <div class="full-bg-secondary-dark d-flex-col justify-center gap-3 h-180">
            <div class="cont-page d-flex gap-1 align-center">
                <span class="roboto-regular font-xl color-console"> $ </span>
                <h2 class="text-console font-xl text-primary typewriter-cursor " id="skillsTittle" data-i18n="contact.ping">
                    docker ps -a/
                </h2>
            </div>

            <span class="cont-page roboto-regular ms-3 font-md text-secondary" id="skillsSpan" data-i18n="projects.exploring">
                Listing deployed projects and applications
            </span>
        </div>

        <!-- Sección de Tecnologías / Skills -->
        <section class="full-bg-secondary pt-4 pb-6" id="skillTech">
            <div class="cont-page py-5 d-grid gap-2 grid-122">

                <div class="d-flex-col gap-2 grid-col-all justify-self-center justify-center align-center pb-4">
                    <h2 class="text-console font-lg color-console cont__to__animate" data-i18n="projects.featured">
                        My Personal Projects
                    </h2>
                    <span class="text-console text-secondary font-md cont__to__animate" data-i18n="projects.subFeatured"> 
                        Some of my documented repositories and demos of my projects are deployed on a VPS.
                    </span>
                </div>

                <div class="d-grid grid-122 grid-col-all gap-2 mt-2" id="projectsGrid">
                
                </div>

            </div>
        </section>


        <!--- contact to move --> 
        <div class="full-bg-secondary-dark d-flex-col justify-center gap-3">

            <div class="cont-page py-5 d-grid">

                <div class="def__container p-3 d-flex-col justify-center align-center justify-self-center bg_cont_projects_move">
                    <h3 class="text-console color-console font-xl" data-i18n="projects.move_title"> More on GitHub </h3>

                    <span class="text-console font-md text-secondary mt-2" data-i18n="projects.move_span_1">
                        Most of my work lives in private repos at MercadoLibre and previous employers. 
                    </span>
                    <span class="text-console font-md text-secondary" data-i18n="projects.move_span_2">
                        Personal experiments, dotfiles, and side projects are on GitHub. 
                    </span>

                    <div class="d-flex gap-2 justify-center mt-3">
                        <a class="btn gap-1 px-3 py-2 btn_glass_glow" href="https://github.com/LucasCallamullo" target="_blank"> 
                            <i class="ri-github-line font-md-plus"></i>
                            <span class="font-md text-console bolder">
                                GitHub
                            </span> 
                        </a>
                        <button class="btn gap-1 px-3 py-2 btn_glass_glow" data-nav="contact"> 
                            <i class="ri-mail-send-line font-md-plus"></i>
                            <span class="font-md text-console bolder"  data-i18n="projects.move_btn">
                                Get In Touch
                            </span> 
                        </button>
                    </div>
                </div>

            </div>
        </div>

        <div class="full-bg-secondary  h-100"> </div>
    `,

    
    onMount: function() {

        applyTranslations({ 'renderProjects': () => renderProjects() });
        

        const titleElement = document.getElementById('skillsTittle');
        const description1 = document.getElementById('skillsSpan');

        // Retrieve title text from data attribute or fallback to text content
        const titleText = titleElement.getAttribute('data-original-text') || titleElement.textContent;

        // Temporarily clear text content while the title is typing
        const desc1Original = description1.textContent;
        description1.textContent = '_';

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
