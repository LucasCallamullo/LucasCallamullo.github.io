import { bindModal } from "@/shared/scripts/utils/modal";
import { renderModalWithProjects } from '@/features/projects/components/modalProjects';
import { setEventTypewriter } from '@shared/scripts/utils/typewriter';

export async function initAbout() {

  async function boot() {
    // this events call init typewriter methods, only need the right selectors
    setEventTypewriter({
      container: '#aboutMain',
      title: '[data-typewriter]',
      elementsToFade: ['[data-fade-1]'],
    });

    // --- PROJECTS MODAL - MAIN STACK ---
    const b = bindModal({ 
      modalSelector: '#modalProjects',  
      overlaySelector: '#overlayProjects',  
      openBtnSelector: '[data-tech]',  
      contBtnToDelegate: '#contMainStack',
      onOpen: ({ modal, trigger }) => {
        const cont = modal.querySelector<HTMLElement>('.modal__data');
        if (!cont || !trigger) return;

        renderModalWithProjects(cont, trigger);
      },
      onClose: ({ modal }) => {
        const cont = modal.querySelector<HTMLElement>('.modal__data');
        if (!cont) return;
      },
    });


    // --- PROJECTS MODAL - contStackAbout ---
    const c = bindModal({ 
      modalSelector: '#modalProjects',  
      overlaySelector: '#overlayProjects',  
      openBtnSelector: '[data-tech]',  
      contBtnToDelegate: '#contStackAbout',
      onOpen: ({ modal, trigger }) => {
        const cont = modal.querySelector<HTMLElement>('.modal__data');
        if (!cont || !trigger) return;

        renderModalWithProjects(cont, trigger);
      },
      onClose: ({ modal }) => {
        const cont = modal.querySelector<HTMLElement>('.modal__data');
        if (!cont) return;
      },
    });
  }

  document.addEventListener('astro:page-load', boot);
}

