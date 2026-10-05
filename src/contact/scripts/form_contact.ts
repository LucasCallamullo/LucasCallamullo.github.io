import { getCurrentLang } from '@shared/scripts/navbar/translations';


interface Web3FormsResponse {
    success: boolean;
    message: string;
    [key: string]: unknown;
}

/**
 * Envía los datos del formulario de contacto mediante Web3Forms.
 * 
 * @param form - Elemento HTMLFormElement a procesar
 * @param spanForm - Elemento HTMLElement donde se renderizan las respuestas
 */
export async function submitContactForm(form: HTMLFormElement, container: HTMLElement): Promise<void> {

  // Clave decodificada base64: "03faeefc-7c18- 444a-9955-ee540c62dd05"
  const ACCESS_KEY = atob("MDNmYWVlZmMtN2MxOC00NDRhLTk5NTUtZWU1NDBjNjJkZDA1");

  const formData = new FormData(form);
  formData.append("access_key", ACCESS_KEY);

  const LANG = getCurrentLang();  // GET LANGUAGE GLOBAL

  // Buttons submit textss
  const btnForm = form.querySelector<HTMLElement>('#spanSubmit');
  const btnText = btnForm?.textContent;
  if (btnForm) btnForm.textContent = (LANG == 'en') ? 'Sending...' : 'Enviando...';

  // container active 
  container.classList.toggle('hidden', false);   // quit
  container.classList.toggle('flex', true);      // add

  container.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
  // window.scrollBy({ top: 170, behavior: 'smooth' });

  const span = container.querySelector('#successMsg');

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData  // 'name' ; 'email' ; 'message', 'access_key'
    });

    const data: Web3FormsResponse = await response.json(); 
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    if (span && response.ok && data.success) {
      span.innerHTML = /*html*/`
        <span class="text-console text-xl">
          ${LANG === 'en'
            ? 'Email sent successfully!'
            : 'Email enviado exitosamente!'
          }
        </span>
        <span class="text-content-muted text-lg">
          ${LANG === 'en'
            ? 'Just leaving the animation effect working.'
            : 'solo dejo el efecto de animación andandooo'
          }
        </span>
      `;
      // form.reset();
    }

  } catch (error) {
      console.error("Error sending the form, please reload the page.:", error);
      if (span) {
        span.innerHTML = /*html*/`
          <span class="text-red-600 text-2xl">
            ${LANG === 'en'
              ? 'Error sending the form, please reload the page.'
              : 'Error enviando el formulario, recargue la página.'
            }
          </span>
        `;
      }

  } finally {
    // reset texts
    if (btnForm && btnText) {
      setTimeout(() => {
        btnForm.textContent = btnText;
      }, 500);
    }
  }
}

/**
 * Inicializa el listener del formulario de contacto.
 * Busca los elementos en el DOM y vincula el evento 'submit'.
 */
export function initContactForm(
    formSelector: string,
    contSelector: string
): void {
    const form = document.querySelector(formSelector) as HTMLFormElement | null;
    const container = document.querySelector<HTMLElement>(contSelector);

    if (form && container) {
        form.addEventListener('submit', async (e: SubmitEvent) => {
            e.preventDefault();
            await submitContactForm(form, container);
        });
    }
}