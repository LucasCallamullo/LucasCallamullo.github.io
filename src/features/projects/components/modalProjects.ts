import { formatDateRange, getProjectsBySlugs, getProjectsByTech, type Project } from '@shared/data/projects';
import { formatTranslationValue, getCurrentLang, resolveKey } from "@/shared/scripts/navbar/translations";
import { getTech, type Tech, type TechKey } from '@/shared/data/tech_stack';
import { REPOS_TO_DONUT } from '@/shared/data/github_stats';



function renderModalPrivate(
  cont: HTMLElement,  
  matches: Project[], 
  tech: Tech | null, 
  iconHtml: string,
  otherTitle: string | null
) {

  const total = matches.length;

  // Header (once)
  const headerHtml = /*html*/`
    <div class="flex justify-between items-center font_console"> 
      <h2 class="flex items-center gap-3 text-xl mb-2 font-medium">
        ${iconHtml}
        ${(otherTitle != null) 
          ? /*html*/`
            <span>${getTitleModal()}</span> 
            <span class="text-console"> ${otherTitle}</span>
          `
          : /*html*/`
            <span>${getTitleModal()}</span> 
            <span class="text-console"> ${tech?.name}</span>
          `
        }
        
      </h2>
      <p class="text-base"> 
        <span>Total: </span>
        <span class="text-accent">${total}</span>
      </p>
    </div>
  `;

  if (total === 0) {
    const voidText = /*html*/`
      <p class="text-content-muted">No projects use this tech yet.</p>
    `;
    cont.innerHTML = headerHtml + voidText;
    return;
  }
  
  // List (many)
  const listHtml = matches.map((project, index) => {
    const title = resolveKey(project.title) as string;
    // const milestone = resolveKey(project?.milestone || '');
    const summary = resolveKey(project?.timeline?.summary as string || '');

    return /*html*/`
      <div class="flex flex-col gap-1 p-3 rounded-xl transition-colors border group flex-wrap
        bg-surface-900 border-surface-800 max-w-full"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <p class="font_console text-sm text-content-main/60 group-hover:text-content-main">
            <span class="group-hover:text-console-100">${index + 1} | </span>
            <span class="group-hover:text-accent">${formatDateRange(project.date)}</span>
          </p>
          <span class="w-3 h-3 rounded-full bg-brand-green-100 shadow-brand-green-100 animate-pulse"></span>
        </div>

        <h4> 
          <a class="font_console text-base text-content-main/80 font-bold mt-2 wrap-break-word
            group-hover:text-console" 
            href="/projects/${project.slug}" title="${getTitleHrefModal(title || '')}">
            ${title}
          </a>
        </h4>

        ${(!summary) ? '' : /*html*/`
          <div class="font_console text-sm text-content-muted/80 mt-1 wrap-break-word text-justify
            group-hover:text-content-muted flex flex-col indent-5 gap-2 pr-5 md:pr-8">
            ${formatTranslationValue(summary as string[], 'newline')}
          </div>
        `}
      </div>
    `;
  }).join('');

  cont.innerHTML = headerHtml + listHtml;
}






export function renderModalProjectsBySlugs(cont: HTMLElement, trigger: HTMLElement) {
  // El trigger es el <button data-src="...">
  const techKey = trigger.dataset.tech as TechKey | undefined;
  if (!techKey) return;

  const matches = getProjectsBySlugs(REPOS_TO_DONUT);

  // get the real tech to render
  const textTitle = "Java, React, TypeScript...";

  // Clone the trigger's icon (astro-icon renders inline SVG)
  const triggerIcon = trigger.querySelector('svg');  // astro-icon renderiza SVG inline

  let iconHtml = '';
  if (triggerIcon) {
    const clone = triggerIcon.cloneNode(true) as SVGElement;
    // Quitar clases de tamaño previas
    clone.classList.remove('w-6', 'h-6', 'w-13', 'h-13', 'w-5', 'h-5',);

    // Aplicar nuevas clases
    clone.classList.add('w-9', 'h-9');
    iconHtml = clone.outerHTML;
  }

  renderModalPrivate(cont, matches, null, iconHtml, textTitle);
}










export function renderModalWithProjects(cont: HTMLElement, trigger: HTMLElement) {
  // El trigger es el <button data-src="...">
  const techKey = trigger.dataset.tech as TechKey | undefined;
  if (!techKey) return;

  const matches = getProjectsByTech(techKey);

  // get the real tech to render
  const tech = getTech(techKey);

  // Clone the trigger's icon (astro-icon renders inline SVG)
  const triggerIcon = trigger.querySelector('svg');  // astro-icon renderiza SVG inline

  let iconHtml = '';
  if (triggerIcon) {
    const clone = triggerIcon.cloneNode(true) as SVGElement;
    // Quitar clases de tamaño previas
    clone.classList.remove('w-6', 'h-6', 'w-13', 'h-13', 'w-5', 'h-5',);

    // Aplicar nuevas clases
    clone.classList.add('w-9', 'h-9');
    iconHtml = clone.outerHTML;
  }

  renderModalPrivate(cont, matches, tech as Tech || '', iconHtml, null);
}


// stupid functions
function getTitleHrefModal(name: string): string {
  const lang = getCurrentLang();
  return lang === 'en'
    ? `View more about ${name} in Portfolio`
    : `Ver más sobre ${name} en Portfolio`;
}

function getTitleModal(): string {
  const lang = getCurrentLang();
  return lang === 'en'
    ? `Projects where I use`
    : `Proyectos donde use`;
}