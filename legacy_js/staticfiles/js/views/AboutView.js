

// ======================= DATOS DE EJEMPLOS (portfolio) =======================
// Icons  ri-palette-line    ri-code-s-slash-line        ri-macbook-line    ri-git-repository-commits-line
// ri-macbook-line        ri-external-link-line
const EXTERNAL_REFERNCES = {
    "1": [
        { icon: 'ri-github-line', label: "external.code", title: "external.github", link: 'https://github.com/LucasCallamullo/E-commerce-Public-Demo' }
    ],
    "2": [
        { icon: 'ri-school-line', label: "external.external", title: "external.university", link: 'https://www.frc.utn.edu.ar' }
    ],
    "3": [
        { icon: 'ri-github-line', label: "external.code", title: "external.github", link: 'https://github.com/LucasCallamullo/desarrollo-software-3k1' },
        { icon: 'ri-youtube-line', label: "external.youtube", title: "external.youtube_playlist", link: 'https://www.youtube.com/watch?v=jWQxnE9pUiw&list=PLXN8Fu4EL1x9gvbNMOsEdly4CRy4PdB8y' }
    ],
    "4": [
        { icon: 'ri-github-line', label: "external.code", title: "external.github", link: 'https://github.com/LucasCallamullo/java-backend-3k2' }
    ],
    "5": [
        { icon: 'ri-github-line', label: "external.code", title: "external.github", link: 'https://github.com/LucasCallamullo/Tutoring-Algorithms-Data-Structures' },
        { icon: 'ri-youtube-line', label: "external.youtube", title: "external.youtube_channel", link: 'https://www.youtube.com/@lucas_backend13' }
    ],
    "6": [
        { icon: 'ri-github-line', label: "external.code", title: "external.github", link: 'https://github.com/No-Country-simulation/Antojitos_Ecommerce' }
    ],
    "7": [
        { icon: 'ri-github-line', label: "external.code", title: "external.github", link: 'https://github.com/LucasCallamullo/Proyect-Pawn-in-Game' }
    ],
}


const classicDataEng = [
    {  
        id: "1", date: "2024 - Present", title: "E-commerce Engine (Deployed Project)", icon: "ri-code-s-slash-line", 
        desc: `Full-featured e-commerce engine with Django, Docker, PostgreSQL and Redis.
           Mercado Pago integration, bulk product upload via CSV/Excel,
           advanced caching, full-text search, test suite (pytest) and Nginx reverse proxy.
           100% documented project ready to deploy with docker-compose.`,
    }, 
    { 
        id: "2", date: "2023 - Present", title: "Systems Engineering - UTN", icon: "ri-graduation-cap-fill", 
        desc: `Advanced student (3rd year). Outstanding GPA in Algorithms, OOP/Functional Paradigms,
            Backend, Software Development and Databases.`,
    },
    { 
        id: "3", date: "2026 - In Progress", title: "Student Forum - Architectural Evolution (YouTube Project)", icon: "ri-youtube-line", 
        desc: `Documented evolution: Monolith → Modular → Microservices.
          Educational content about architectural decisions, trade-offs and best practices. Complete E2E series.`,
    },
    { 
        id: "4", date: "2025", title: "Microservices with Java & Spring Boot", icon: "ri-git-merge-line", 
        desc: `Container and fleet management system. Microservices architecture, gateway,
          Keycloak authentication, discovery service.`,
    },
    { 
        id: "5", date: "2024 - 2025", title: "Programming Tutoring (Freelance)", icon: "ri-macbook-line", 
        desc: `+150 students assisted. Algorithms, Data Structures,
          OOP/Functional Paradigms and Backend. Exam and final preparation.`,
    },
    { 
        id: "6", date: "2024", title: "No Country - Food Recycling App", icon: "ri-group-line", 
        desc: `Collaborative project with a 5-person team (2 backend, 2 frontend, 1 QA).
           My role: REST API development + integration coordination.
           Delivered functional MVP in 4 weeks using agile methodology.
           Skills developed: synchronous GitHub workflow, code reviews, daily reporting.`,
    },
    { 
        id: "7", date: "2021 - 2023", title: "Game Modder (Freelance)", icon: "ri-earth-fill", 
        desc: `Custom scripts in Pawn and Lua for CS 1.6 servers.
          Economy systems, events and server administration.`,
    },
];

const classicData = [
    { 
        id: "1", date: "2024 - Actualidad", title: "E-commerce Engine (Proyecto Desplegado)", icon: "ri-code-s-slash-line", 
        desc: `Motor de e-commerce completo con Django, Docker, PostgreSQL y Redis.
           Integración con Mercado Pago, carga masiva de productos por CSV/Excel,
           caché avanzada, búsqueda full-text, test suite (pytest) y reverse proxy con Nginx.
           Proyecto 100% documentado y desplegable con docker-compose.` 
    }, 
    { 
        id: "2", date: "2023 - Actualidad", title: "Ingeniería en Sistemas - UTN", icon: "ri-graduation-cap-fill", 
        desc: `Estudiante avanzado (3° año). Promedio destacado en Algoritmos, Paradigmas POO/Funcional, 
          Backend, Desarrollo de Software y Bases de Datos.` 
    },
    { 
        id: "3", date: "2026 - En Proceso", title: "Foro Estudiantil - Evolución Arquitectónica (Proyecto YouTube)", icon: "ri-youtube-line", 
        desc: `Evolución documentada: Monolito → Modular → Microservicios. 
          Contenido didáctico sobre decisiones arquitectónicas, trade-offs y buenas prácticas. Serie E2E completa.` 
    },
    { 
        id: "4", date: "2025", title: "Microservicios con Java & Spring Boot", icon: "ri-git-merge-line", 
        desc: `Sistema de gestión de contenedores y flotas. Arquitectura microservicios, gateway, 
          autenticación Keycloak, discovery service.` 
    },
    { 
        id: "5", date: "2024 - 2025", title: "Tutorías de Programación (Freelance)", icon: "ri-macbook-line", 
        desc: `+150 estudiantes asistidos. Algoritmos, Estructuras de Datos, 
          Paradigmas POO/Funcional y Backend. Preparación parciales/finales.` 
    },
    { 
        id: "6", date: "2024", title: "No Country - App de Reciclaje de Comida", icon: "ri-group-line", 
        desc: `Proyecto colaborativo con equipo de 5 personas (2 backend, 2 frontend, 1 QA).
           Mi rol: desarrollo de API REST + coordinación de integraciones.
           Entregamos MVP funcional en 4 semanas usando metodología ágil.
           Skills desarrolladas: trabajo sincrónico en GitHub, code reviews, daily reporting.` 
    },
    { 
        id: "7", date: "2021 - 2022", title: "Game Modder (Freelance)", icon: "ri-earth-fill", 
        desc: `Scripts personalizados en Pawn y Lua para servidores CS 1.6. 
          Sistemas de economía, eventos y administración.` 
    },
];


// ========== FUNCIÓN PARA RENDER TIMELINE CLÁSICO ==========
function renderButtonsOnTimeline() {
    const containers = document.querySelectorAll('.cont-btns-external-timeline');
    if (!containers) return;
    containers.forEach(cont => {
        // Obtener referencias externas usando el ID del item
        const externalRefs = EXTERNAL_REFERNCES[cont.dataset.id] || [];

        // Generar los botones dinámicamente
        cont.innerHTML = externalRefs.map(ref => {
            // Obtener el texto traducido del label
            const labelText = getTranslationValue(g_TRANSLATIONS, ref.label)
            const titleText = getTranslationValue(g_TRANSLATIONS, ref.title)
            
            return /*html*/`
                <a class="btn btn-timeline roboto-regular hover-up gap-1 align-center justify-center" 
                href="${ref.link}" target="_blank" rel="noopener noreferrer"
                title="${titleText}">
                    <i class="${ref.icon} font-md-plus"> </i>
                    <span class="text-primary font-md" data-i18n=${ref.label}>${labelText}</span>
                </a>
            `;
        }).join('');
    });
}


function renderClassicTimeline() {
    const cont = document.getElementById('classicTimeline');
    if (!cont) return;

    let html = '';
    let toFor = (CURRENT_LANG === 'en' ? classicDataEng : classicData);
    toFor.forEach((item, idx) => {

        // Obtener referencias externas usando el ID del item
        const externalRefs = EXTERNAL_REFERNCES[item.id] || [];

        // determinar si es par o impar para la posición (ya definido por CSS)
        html += /*html*/`
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date bolder d-flex align-center gap-1 w-min">
                        <i class="${item.icon} font-md fw-normal" ></i> 
                        <span class="text-truncate">${item.date}</span>
                    </div>
                    <div class="font-md-plus text-primary mt-2">${item.title}</div>
                    <p class="text-secondary text-justify mt-2">${item.desc}</p>

                    ${(externalRefs.length > 0) ? /*html*/`
                        <div class="d-flex-col-row gap-2 mt-2 cont-btns-external-timeline" data-id="${item.id}">
                            
                        </div>` 
                    : ''}
                </div>
                <div class="timeline-icon">
                    <i class="${item.icon} font-lg text-white"></i>
                </div>
            </div>
        `;
    });

    cont.innerHTML = html;
}



// 1. DEFINIR TUS VISTAS COMO OBJETOS GLOBALES
const AboutView = {
    template: /*html*/`
        <div class="full-bg-secondary-dark d-flex-col justify-center gap-3 h-180">
            <div class="cont-page d-flex gap-1 align-center">
                <span class="roboto-regular font-xl color-console"> $ </span>
                <h2 class="text-console font-xl text-primary typewriter-cursor" 
                    id="aboutTittle" data-i18n="about.ping">   cat about.txt</h2>
            </div>

            <span class="cont-page roboto-regular ms-3 font-md text-secondary" id="aboutSpan" data-i18n="about.establishing">
                Displaying professional background
            </span>
        </div>

        <!-- Sección de Tecnologías / Skills -->
        <section class="full-bg-secondary pt-4 pb-4" id="contactSection">
            <div class="cont-page py-5 gap-3 d-grid grid-123 w-100">
            
                <div class="def__container grid-col-span-2 cont__to__animate">

                    <div class="d-flex align-center gap-2 border-bot-header cont__to__animate p-2">
                        <span class="roboto-regular font-lg prompt-console">$</span>
                        <span class="text-console font-lg color-console ">cat</span>
                        <h3 class="text-console font-lg typewriter-cursor">bio.txt </h3>
                    </div>

                    <!-- 
                    Lucas Callamullo, lógica de programación, Full-Stack autodidacta, Ingeniería en Sistemas,
                    experiencias, experiencia técnica, 
                    
                    sea nuestro medio para convertir cualquier idea en realidad
                    -->
                    <div class="d-flex-col gap-2 p-3 cont__to__animate">
                        <p class="font-md text-justify" data-i18n="about.p_1">
                            Hola! Soy Lucas Callamullo, desarrollador backend / full stack que vive en Córdoba.
                        </p>

                        <p class="font-md text-justify" data-i18n="about.p_2">
                            Me fascina la lógica de programación desde que modificaba mods de juegos, y probablemente paso 
                            más tiempo del que debería programando alguna idea.
                        </p>

                        <p class="font-md text-justify" data-i18n="about.p_3">
                            En los últimos 3 años, hice mi propio RoadMap — un viaje Full-Stack autodidacta 
                            enfocado en desarrollar aplicaciones reales desde cero.
                            Sumado a estar cursando cuarto año de la carrera Ingeniería en Sistemas en la UTN
                        </p>

                        <p class="font-md text-justify" data-i18n="about.p_4">
                            Dar clases fue una de las experiencias que más disfruté
                            Una experiencia que amé de este RoadMap fue: Dar clases de programación (Algoritmos y Paradigmas) 
                            de materias de mi universidad durante 2 años. Me enseñó a bajar ideas complejas a lenguaje común y 
                            conocer gente hermosa que hoy son amistades.
                        </p>
                        
                        <div class="d-flex-col gap-1">
                            <p class="font-md"> 
                                <span class="font-md" data-i18n="about.p_5">Mi experiencia técnica cubre aplicaciones </span>
                                <strong class="text-console">e2e </strong>(<span class="color-main-light text-console">EndToEnd</span>)
                                Apps: 
                            </p>
                            <p class="ms-3 text-console font-md">
                                <strong>Frontend</strong> (
                                    <span class="color-main-light text-console font-md">React</span>, 
                                    <span class="color-main-light text-console font-md">HTML</span>,
                                    <span class="color-main-light text-console font-md">CSS</span>, 
                                    <span class="color-main-light text-console font-md">JS</span>)
                            </p>
                            <p class="ms-3 text-console font-md"> 
                                <strong>Backend</strong>  (
                                    <span class="color-main-light text-console font-md">Java</span> + 
                                    <span class="color-main-light text-console font-md">Spring Boot</span>, 
                                    <span class="color-main-light text-console font-md">Python</span> + 
                                    <span class="color-main-light text-console font-md">Django</span>)
                            </p>
                            <p class="ms-3 text-console font-md">
                                <strong>DBB</strong> (
                                    <span class="color-main-light text-console font-md">PostgreSQL</span>, 
                                    <span class="color-main-light text-console font-md">Redis</span>)
                            </p>
                            <p class="ms-3 text-console font-md">
                                <strong>DevOps</strong> (
                                    <span class="color-main-light text-console font-md">VPS</span>, 
                                    <span class="color-main-light text-console font-md">Docker</span>,
                                    <span class="color-main-light text-console font-md">Compose</span>, 
                                    <span class="color-main-light text-console font-md">scripting in Linux</span>).
                            </p>
                        </div>

                        <p class="font-md text-justify" data-i18n="about.p_6">
                            Para mí, programar es simplificar la vida mediante código — aunque parece imposible replicar
                            el azar de la vida. Me encanta que sea nuestro medio para convertir cualquier idea en realidad.
                        </p>
                    </div>
                </div>

                <!-- QUICK STATS SECTION ---> 
                <div class="def__container cont__to__animate h-min">
                    <div class="d-flex align-center gap-1">
                        <span class="roboto-regular font-lg prompt-console">$</span>
                        <span class="text-console font-lg color-console ">cat</span>
                        <h3 class="text-console font-lg">stats.txt</h3>
                    </div>
                    
                    <div class="d-grid about__grid gap-2 mt-3">
                        <span class="font-md text-secondary" data-i18n="about.stats_1">Experiencia: </span>
                        <span class="text-console font-md color-console justify-self-end" data-i18n="about.stats_2"> 4+ Años</span>

                        <span class="font-md text-secondary">BackEnd: </span>
                        <span class="text-console font-md color-console justify-self-end"> Java | Spring | Python</span>

                        <span class="font-md text-secondary" data-i18n="about.stats_3">DevOps: </span>
                        <span class="text-console font-md color-console justify-self-end"> Docker | Linux</span>

                        <span class="font-md text-secondary" data-i18n="about.stats_4">Actualidad: </span>
                        <span class="text-console font-md color-console justify-self-end" data-i18n="about.stats_5"> Ing. en Sistemas</span>

                        <span class="font-md text-secondary" data-i18n="about.stats_6">Residencia: </span>
                        <span class="text-console font-md color-console justify-self-end"> Córdoba, Argentina</span>

                        <span class="font-md text-secondary" data-i18n="about.stats_7">Universidad: </span>
                        <span class="text-console font-md color-console justify-self-end"> UTN</span>
                    </div>
                </div>

                <!-- TIMELINE --> 
                <div class="grid-col-all d-flex-col justify-center gap-4 pb-3 pt-3">
                    <div class="d-flex-col align-center justify-center gap-2">
                        <h3 class="text-console color-console font-xl" data-i18n="about.timeline">Career Timeline</h3>
                        <span class="font-md text-secondary text-console" data-i18n="about.sub_timeline">
                            From university assignments to robust systems with professional architecture
                        </span>
                    </div>

                    <div class="timeline-classic" id="classicTimeline"> 
                    </div>
                </div>
            </div>
        </section>
    `,
    
    onMount: function() {

        // render after g_TRANSLATIONS on memory
        renderClassicTimeline()
        applyTranslations({
            'refreshTimeline': () => renderButtonsOnTimeline()
        });

        /**
         * Title element where typewriter effect will be applied
         * @type {HTMLElement}
         */
        const titleElement = document.getElementById('aboutTittle');
        
        /**
         * Description span that will fade in after title typing completes
         * @type {HTMLElement}
         */
        const description1 = document.getElementById('aboutSpan');

        // Retrieve title text from data attribute or fallback to text content
        const titleText = titleElement.getAttribute('data-original-text') || titleElement.textContent;

        // Temporarily clear text content while the title is typing
        const desc1Original = description1.textContent;
        // Clear description text temporarily (will be shown via fade-in later)
        description1.textContent = '_';
        
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

    }
};
