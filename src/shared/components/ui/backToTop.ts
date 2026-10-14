const CIRCUMFERENCE = 2 * Math.PI * 18; // ≈ 113.1

function backToTheTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleBackToTopButton(show: boolean, btn: HTMLElement) {
  btn.classList.toggle('show', show);
}

export function eventBackToTopBtn() {
  const btn = document.getElementById('btn__back_to_top');
  if (!btn) return;

  const progressCircle = btn.querySelector<SVGCircleElement>('.progress circle');
  if (!progressCircle) return;

  // Make sure the CSS variables match the runtime constants.
  progressCircle.style.strokeDasharray = String(CIRCUMFERENCE);
  progressCircle.style.strokeDashoffset = String(CIRCUMFERENCE);

  btn.addEventListener('click', backToTheTop);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    toggleBackToTopButton(scrollTop > 100, btn);

    const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = String(dashOffset);
  }, { passive: true });
}