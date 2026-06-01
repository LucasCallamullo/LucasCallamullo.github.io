

const SKILLS_CONFIG = {
    categories: {
        "Languages": ["Python", "Java", "JavaScript"],
        "Back-End": ["Spring Boot", "Django", "DRF"],
        "Front-End": ["React", "HTML5", "CSS3", "Bootstrap"],
        "Databases": ["PostgreSQL", "SQLite", "Redis"],
        "Containers & Reverse Proxies": ["Docker", "Docker Compose", "Nginx"],
        "DevOps & Automation": ["Git", "GitHub Actions", "Linux", "Bash"],
        "Testing & Docs": ["JUnit5", "PyTest", "Postman", "Swagger"]
    },
    order: ["Languages", "Back-End", "Front-End", "Databases",  "Containers & Reverse Proxies", "DevOps & Automation", "Testing & Docs"]
};


function renderSkillsFromConfig() {
    return SKILLS_CONFIG.order.map(cat => {
        const techs = SKILLS_CONFIG.categories[cat];
        const itemsHTML = techs.map(tech => {
            const url = TECH_STACK[tech];
            return url ? /*html*/`
                <div class="d-flex align-center gap-1 skills__cont__card__img">
                    <img class="skills__card__img" src="${url}" alt="${tech}">
                    <span class="text-console font-md text-truncate">${tech}</span>
                </div>
            ` : '';
        }).join('');
        
        return /*html*/`
            <div class="card-skills">
                <div class="card-top-border d-flex justify-between align-center px-3 py-2">
                    <h3 class="d-flex font-md-plus color-console text-console">${cat}</h3>

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


const SkillView = {
    template: /*html*/`
        <div class="full-bg-secondary-dark d-flex-col pt-6 pb-5 gap-3">
            <div class="cont-page d-flex gap-1 justify-start align-center text-start">
                <span class="roboto-regular font-xl color-console"> $ </span>
                <h2 class="text-console font-xl text-primary">ls -la skills/</h2>
            </div>

            <span class="cont-page roboto-regular ms-3 font-md text-secondary">
                Exploring technical expertise
            </span>
        </div>

        <!-- Sección de Tecnologías / Skills -->
        <section class="full-bg-primary pt-4 pb-6" id="skillTech">
            <div class="cont-page py-5 d-grid gap-2 grid-122">

                <div class="d-flex-col gap-2 grid-col-all justify-self-center justify-center align-center pb-4">
                    <h2 class="text-console font-lg color-console">
                        Featured Technologies
                    </h2>
                    <span class="text-console text-secondary font-md"> 
                        Tooling and stacks I have worked with
                    </span>
                </div>

                ${renderSkillsFromConfig()}
            </div>
        </section>
    `,

    /* funcion que se ejecuta al terminar el renderizado del anterior html */ 
    onMount: function() { }
};
