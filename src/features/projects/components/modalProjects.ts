import { formatDateRange, getProjectsByTech } from '@shared/data/projects';
import { resolveKey } from "@/shared/scripts/navbar/translations";
import { getTech, type TechKey } from '@/shared/data/tech_stack';


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

  // Header (once)
  const headerHtml = /*html*/`
    <h2 class="flex items-center gap-3 font_console text-xl mb-2 font-medium">
      ${iconHtml}
      Proyectos donde use <span class="text-console">${tech?.name ?? techKey}</span>
    </h2>
  `;

  if (matches.length === 0) {
    const voidText = /*html*/`
      <p class="text-content-muted">No projects use this tech yet.</p>
    `;
    cont.innerHTML = headerHtml + voidText;
    return;
  }
  
  // List (many)
  const listHtml = matches.map((project, index) => {
    const title = resolveKey(project.title);
    const milestone = resolveKey(project?.milestone || '');

    return /*html*/`
      <div class="flex flex-col gap-1 p-3 rounded-xl transition-colors border group flex-wrap
        bg-surface-900 border-surface-800 max-w-full"
      >
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <p class="font_console text-sm text-content-muted group-hover:text-content-main">
            <span class="group-hover:text-console-100">${index + 1} | </span>
            <span class="group-hover:text-accent">${formatDateRange(project.date)}</span>
          </p>
          <span class="w-3 h-3 rounded-full bg-brand-green-100 shadow-brand-green-100 animate-pulse"></span>
        </div>

        <a class="font_console text-base text-content-muted font-bold mt-2 wrap-break-word
          group-hover:text-console" 
          href="/projects/${project.slug}" title="${title}">
          ${title}
        </a>

        ${(!milestone) ? '' : /*html*/`
          <span class="font_console text-sm text-content-muted/80 mt-1 wrap-break-word
            group-hover:text-content-muted">
            ${milestone}
          </span>
        `}
      </div>
    `;
  }).join('');

  cont.innerHTML = headerHtml + listHtml;
}
