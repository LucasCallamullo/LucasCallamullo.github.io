import { setEventTypewriter } from '@shared/scripts/utils/typewriter';
import { bindModal } from "@/shared/scripts/utils/modal";
import { renderModalWithProjects } from '@/features/projects/components/modalProjects';

export async function initSetupSkills() {
  // this events call init typewriter methods, only need the right selectors
  setEventTypewriter({
    container: '#skillsMain',
    title: '[data-typewriter]',
    elementsToFade: ['[data-fade-1]'],
  });

  // --- PROJECTS MODAL - MAIN STACK ---
  const modalProjects = bindModal({ 
    modalSelector: '#modalProjects',  
    overlaySelector: '#overlayProjects',  
    openBtnSelector: '[data-tech]',  
    contBtnToDelegate: '#contStackMain',
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
  
  // --- PROJECTS MODAL - MAIN STACK CAROUSEL ---
  const b = bindModal({ 
    modalSelector: '#modalProjects',  
    overlaySelector: '#overlayProjects',  
    openBtnSelector: '[data-tech]',  
    contBtnToDelegate: '#carouselStack',
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

  // --- PROJECTS MODAL - ALL STACK ---
  const c = bindModal({ 
    modalSelector: '#modalProjects',  
    overlaySelector: '#overlayProjects',  
    openBtnSelector: '[data-tech]',  
    contBtnToDelegate: '#contAllStack',
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