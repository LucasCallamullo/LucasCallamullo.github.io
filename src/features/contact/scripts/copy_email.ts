import { SOCIAL_LINKS } from '@shared/data/links';
import { getCurrentLang } from '@shared/scripts/navbar/translations';


/**
 * Copia un texto al portapapeles dado el ID o selector de un botón
 * @param buttonSelector Selector CSS o ID del botón (ej: '#copyEmailBtn' o 'copyEmailBtn')
 * @param textToCopy Texto que se desea copiar al portapapeles
 */
export function setupClipboardCopy(
    buttonSelector: string, 
    buttonSelectorTag: string, 
    textToCopy: string = SOCIAL_LINKS['email'].href
): void {

  const textEmail = textToCopy.split(":")[1]

  const buttonId = buttonSelector.startsWith('#') || buttonSelector.startsWith('.')
      ? buttonSelector
      : `#${buttonSelector}`;

  const tagId = buttonSelectorTag.startsWith('#') || buttonSelectorTag.startsWith('.')
      ? buttonSelectorTag
      : `#${buttonSelectorTag}`;

  const copyBtn = document.querySelector(buttonId);
  if (!copyBtn) return;

  async function copyToClipboard(): Promise<boolean> {
    try {
      // API moderna (requiere HTTPS o localhost)
      await navigator.clipboard.writeText(textEmail);
      return true;
    } catch (err) {
      console.error('Error con clipboard API:', err);

      // Fallback para navegadores antiguos
      try {
          const textarea = document.createElement('textarea');
          textarea.value = textEmail;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          const success = document.execCommand('copy');
          document.body.removeChild(textarea);
          return success;
      } catch (fallbackErr) {
          console.error('Error en fallback:', fallbackErr);
          return false;
      }
    }
  }

  copyBtn.addEventListener('click', async () => {
    const copied = await copyToClipboard();
    if (copied) {

      // Lógica adicional cuando se copia con éxito si la necesitas
      const tagLabel = document.querySelector(tagId);
      if (!tagLabel) return;
      const originalText = tagLabel.textContent;

      // show based on lang
      tagLabel.textContent = getCurrentLang() === 'en' ? 
        'Copied' : 'Copiado';
      setTimeout(() => {
        tagLabel.textContent = originalText;
      }, 1500)
    }
  });
}


