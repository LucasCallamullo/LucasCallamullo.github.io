
const TECH_STACK = {
    // Lenguajes principales
    "Java": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/java/java-original.svg",
    "Spring Boot": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/spring/spring-original.svg",
    "Python": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/python/python-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/javascript/javascript-original.svg",
    "TypeScript": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/typescript/typescript-original.svg",
    "Go": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/go/go-original.svg",
    
    // Frameworks Backend
    "Django": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/django/django-plain.svg",
    "DRF": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/djangorest/djangorest-original.svg",
    "FastAPI": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/fastapi/fastapi-original.svg",
    "Node.js2": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/nodejs/nodejs-original.svg",
    "Node.js": "https://icongr.am/devicon/nodejs-original.svg",
    "Express": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/express/express-original.svg",
    
    // Frameworks Frontend
    "React": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/react/react-original.svg",
    "Next.js": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/nextjs/nextjs-original.svg",
    
    // Bases de datos
    "PostgreSQL": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/postgresql/postgresql-original.svg",
    "MySQL": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/mysql/mysql-original.svg",
    "SQLite": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/sqlite/sqlite-original.svg",
    "Redis": "https://icongr.am/devicon/redis-original.svg",
    
    // Contenedores y Servidores
    "Docker": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/docker/docker-original.svg",
    "Docker Compose": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/docker/docker-original.svg",
    "Nginx": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/nginx/nginx-original.svg",
    
    // Herramientas y Control de versiones
    "Git": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/git/git-original.svg",
    "GitHub": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/github/github-original.svg",
    "GitHub Actions": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/githubactions/githubactions-original.svg",
    "Linux": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/linux/linux-original.svg",
    "Bash": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/bash/bash-original.svg",
    
    // Testing y Documentación
    "PyTest": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/pytest/pytest-original.svg",
    "JUnit5": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/junit/junit-original-wordmark.svg",
    "Postman": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/postman/postman-original.svg",
    "Swagger": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/swagger/swagger-original.svg",
    
    // Frontend básico
    "HTML5": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/html5/html5-original.svg",
    "CSS3": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/css3/css3-original.svg",
    "Bootstrap": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/bootstrap/bootstrap-original.svg",
    
    // ORMs y Herramientas Java
    "Hibernate": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/hibernate/hibernate-original.svg",
    "Sequelize": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/sequelize/sequelize-original.svg",
    
    // Utilidades
    "VSCode": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/vscode/vscode-original.svg",
    "DBeaver": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/dbeaver/dbeaver-original.svg",
    "Ngrok": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/ngrok/ngrok-original.svg",

    // Otros
    "Pandas": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/pandas/pandas-original.svg",
    "OAuth": "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/oauth/oauth-plain.svg",
};


const TECH_STACK_ORDER = [
    "Java", "Spring Boot", "PostgreSQL", "Docker", "Docker Compose",
    "Python", "Django", "DRF", "Redis", "SQLite",
    "JavaScript", "React", "Git", "Linux", "Bash", "Nginx"
];


function renderTechStack(techList = null) {
    // 1. Determinar qué lista usar
    //    - Si me pasan una lista, uso esa
    //    - Si no, uso TECH_STACK_ORDER por defecto
    const technologies = techList || TECH_STACK_ORDER;
    
    // 2. FILTRAR: solo quedarme con las tecnologías que existen en TECH_STACK
    //    Ejemplo: si "Node.js2" no existe en TECH_STACK, la elimino
    const existingTechs = technologies.filter(tech => TECH_STACK[tech]);
    
    // 3. MAPEAR: convertir cada tecnología a HTML
    const slidesArray = existingTechs.map(tech => {
        const iconUrl = TECH_STACK[tech];
        return /*html*/`
            <div class="swiper-slide tech-group">
                <img src="${iconUrl}" alt="${tech}" loading="lazy">
                <h3 class="mt-2 roboto-regular fw-normal">${tech}</h3>
            </div>
        `;
    });
    
    // 4. JOIN: unir todo en un solo string
    const slidesHTML = slidesArray.join('');
    
    // 5. Retornar el HTML completo
    return slidesHTML;
}

const HomeView = {
    template: /*html*/`
        <section class="full-bg-secondary-dark d-flex-col justify-center align-center" id="main-root">
            <div class="cont-page d-flex-col justify-center align-center">
                <div class="d-flex gap-1">
                    <span class="roboto-regular font-xl bold-console" data-i18n="prompt">$</span>
                    <span class="roboto-regular font-xl prompt-console" data-i18n="whoami">whoami</span>
                </div>

                <!-- texto effect typewriter -->
                <h1 class="text-console font-xxxxl mt-3 text-center mx-auto typewriter-cursor" 
                    id="title" data-i18n="title">        Lucas Callamullo</h1>
                <h2 class="text-console font-xxxl mt-2 text-center mx-auto prompt-console" id="subtitle" data-i18n="subtitle">
                    Software Engineer
                </h2>

                <span class="font-md mt-3 text-center mx-auto" id="main-span" data-i18n="description.line1">
                    Hi, I'm Lucas, you can see my projects and my skills on this page,
                </span>
                <span class="font-md mt-1 text-center mx-auto" id="main-spann" data-i18n="description.line2">
                    I'm mainly interested in backend development
                </span>

                
                <!-- buttons stuff -->
                <div class="d-flex-col-row align-center gap-3 mt-3" id="main-buttons">
                    <button class="btn btn-timeline hover-up gap-1 align-center justify-center" data-nav="projects">
                        <i class="ri-code-s-slash-line font-md-plus fw-normal prompt-console"></i>
                        <span class="text-primary text-console font-md-plus text-truncate" data-i18n="button.projects">
                            View Projects
                        </span>
                    </button>


                    <a class="btn btn-timeline hover-up gap-1 align-center justify-center download-cv" 
                        data-i18n="footer.href_download" 
                        target="_blank"
                        download="LucasCallamullo_Software_Resume.pdf"
                        href="./CV/LucasCallamullo_Software_Resume.pdf">

                        <i class="ri-file-pdf-2-line font-md-plus fw-normal prompt-console"></i>
                        <span class="text-primary text-console font-md-plus text-truncate" data-i18n="button.cv">
                            Download CV
                        </span>
                    </a>


                    <button class="btn btn-timeline hover-up gap-1 align-center justify-center" data-nav="contact">
                        <i class="ri-send-plane-fill font-md-plus fw-normal prompt-console"></i>
                        <span class="text-primary text-console font-md-plus text-truncate" data-i18n="button.contact">
                            Contact
                        </span>
                    </button>
                </div>
            </div>
        </section>

        <!-- ABOUT SECTION ON HOME  -->
        <section class="full-bg-primary py-6">
            <div class="cont-page d-flex justify-center align-center py-6">
            
                <div class="def__container px-3 py-3 d-flex-col justify-center gap-1 home_section_containers hover-up">
                    
                    <p class="text-break text-console font-md-plus prompt-console">
                        $ cat <span class="text-primary text-console font-md-plus" data-i18n="home.about_txt">about.txt</span>  | head
                    </p>

                    <p class="mt-2">
                        <span class="color-console font-md-plus text-console"> > </span>
                        <span class="font-md-plus text-console" data-i18n="home.about_p1"> 
                            Hi, I'm Lucas.   
                        </span>
                        <span class="font-md-plus text-console color-console">
                            Backend / Full Stack Developer
                        </span>
                        <span class="font-md-plus text-console" data-i18n="home.about_p2">
                             based in Córdoba, Argentina.
                        </span>
                    </p>
                    <p class="mt-1">
                        <span class="color-console font-md-plus text-console"> > </span>
                        <span class="font-md-plus text-console" data-i18n="home.about_p3"> 
                            Currently finishing 4th year of 
                        </span>
                        <span class="font-md-plus text-console color-console" data-i18n="home.about_p4">
                            Systems Engineering at UTN. 
                        </span>
                    </p>
                    <p class="mt-1">
                        <span class="color-console font-md-plus text-console"> > </span>
                        <span class="font-md-plus text-console" data-i18n="home.about_p5">
                            I enjoy building things that work, teaching what I learn, 
                            and improving bit by bit.
                        </span>
                    </p>

                    <div class="d-flex gap-1 align-center justify-center mt-2">
                        <button class="btn btn-timeline hover-up gap-1 align-center justify-center" data-nav="about">
                            <span class="font-md-plus text-console prompt-console text-truncate">$ cd</span>
                            <span class="text-primary text-console font-md-plus" data-i18n="home.about_txt">about.txt</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección de Tecnologías / Skills -->
        <section class="full-bg-secondary-dark py-6" id="skillsMain">
            <div class="cont-page py-6">

                <div class="d-flex-col justify-center align-center text-center gap-3">
                    <!-- Ttitle --> 
                    <h2 class="text-console font-xl color-console" data-i18n="home.skills.title">
                        Featured Technologies
                    </h2>
                    <span class="text-console font-md pb-3" data-i18n="home.skills.subtitle">
                        My daily stack for backend development, databases, and deployment.
                    </span>

                    <!-- Swiper Container -->
                    <div class="swiper skillsSwiper">
                        <div class="swiper-wrapper">
                            <!-- Cada slide tendrá un ancho definido por CSS -->
                            ${renderTechStack()}
                        </div>
                    </div>

                    <button class="btn btn-timeline hover-up gap-1 align-center justify-center" data-nav="skills">
                        <i class="ri-external-link-line font-lg fw-normal text-primary"></i>
                        <span class="text-primary text-console font-md-plus text-truncate" data-i18n="home.skills.button">
                            View all skills
                        </span>
                    </button>
                </div>
            </div>
        </section>

        <!--  CONTACT Y GITHUB SECTION   -->
        <section class="full-bg-primary py-6">
            <div class="cont-page d-flex justify-center align-center py-6">
            
                <div class="def__container px-3 py-3 d-flex-col justify-center gap-1 home_section_containers hover-up">
                    
                    <span class="text-break text-console font-lg color-console" data-i18n="home.contact_p1">
                        Construyamos algo que funcione.
                    </span>

                    <p class="mt-2">
                        <span class="color-console font-md-plus text-console"> > </span>
                        <span class="font-md-plus text-console" data-i18n="home.contact_p2"> 
                            Desarrollo backend, APIs REST, y arquitecturas limpias. 
                        </span>
                    </p>
                    <p class="mt-1">
                        <span class="color-console font-md-plus text-console"> > </span>
                        <span class="font-md-plus text-console" data-i18n="home.contact_p3"> 
                            Feliz de charlar sobre código, aprendizaje y proyectos que resuelven problemas reales.
                        </span>
                    </p>

                    <div class="d-flex-col-row gap-2 align-center justify-center mt-2">
                        <button class="btn btn-timeline hover-up gap-1 align-center justify-center" data-nav="contact">
                            <i class="ri-external-link-line font-lg fw-normal text-primary"></i>
                            <span class="text-primary text-console font-md-plus" data-i18n="home.contact_btn">Contacto</span>
                        </button>

                        <a class="btn btn-timeline hover-up gap-1 align-center justify-center" 
                            href="https://github.com/LucasCallamullo">
                            <i class="ri-github-line font-lg fw-normal"></i>
                            <span class="text-primary text-console font-md-plus">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `,

    firstTypeWriter: false,

    /* funcion que se ejecuta al terminar el renderizado del anterior html */ 
    onMount: function() { 

        /* document.querySelectorAll('.download-cv').forEach(e => {
            const key = e.getAttribute('data-i18n');
            // quitar la key "footer.href_download"
            if (g_TRANSLATIONS[key]) {
                e.href = g_TRANSLATIONS[key];
            }
        }); */

        applyTranslations();

        swipperInitMain();

        // Small delay to ensure DOM is fully rendered - stupid check
        if (HomeView.firstTypeWriter) {
            initTypewriter();
            // setTimeout(initTypewriter, 0);
        }
        HomeView.firstTypeWriter = true;
    }
};