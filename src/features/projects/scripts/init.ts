import { bindModal } from "@/shared/scripts/utils/modal";


export function initModals() {

  // Every SPA navigation
  document.addEventListener('astro:page-load', () => {

    // --- PROJECTS IMAGES MODAL ---
    const modalImages = bindModal({ 
      modalSelector: '#imagesView',  
      overlaySelector: '#imagesOverlay',  
      openBtnSelector: '.imageBtn',  
      contBtnToDelegate: '#contBtnsModal',
      onOpen: ({ modal, trigger }) => {
        const img = modal.querySelector<HTMLImageElement>('img');
        if (!img || !trigger) return;

        // El trigger es el <button data-src="...">
        const src = trigger.dataset.src;
        if (src) img.src = src;
      },
      onClose: ({ modal }) => {
        const img = modal.querySelector<HTMLImageElement>('img');
        if (img) img.src = '';
      },
    });
  });

}