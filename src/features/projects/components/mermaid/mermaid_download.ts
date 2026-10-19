// src/features/projects/components/mermaid/mermaid_download.ts
import { snapdom } from '@zumer/snapdom';

/**
 * Initializes download listeners for all rendered Mermaid diagrams.
 * 
 * This function is idempotent and safe to call multiple times (e.g., during 
 * Astro's View Transitions lifecycle). It finds all download buttons and 
 * attaches a click handler that captures the sibling SVG and triggers a PNG download.
 */
export function initMermaidDownloads() {
  // Select all download buttons by their unique ID prefix.
  const buttons = document.querySelectorAll<HTMLButtonElement>('button[id^="download-btn-"]');

  buttons.forEach(btn => {
    // Prevent duplicate listeners if the script runs again (SPA navigation).
    if (btn.dataset.listener === 'true') return;
    btn.dataset.listener = 'true';

    btn.addEventListener('click', async () => {
      // Find the parent container to scope the SVG search.
      const container = btn.closest('div[id^="mermaid-container-"]');
      if (!container) return;
      
      // Query the actual SVG element rendered by Mermaid.
      const diagram = container.querySelector('pre.mermaid svg');
      
      if (!diagram) {
        console.warn('[Mermaid Download] Diagram is not rendered yet.');
        return;
      }

      // Save original state for visual feedback during the async download.
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span class="text-xs">...</span>';
      btn.disabled = true;

      // Get the custom filename from the data attribute, fallback to a default.
      const filename = btn.dataset.filename || 'diagrama';

      try {
        await snapdom.download(diagram as HTMLElement, {
          format: 'png',
          filename: filename,
          // Match the diagram's background to the current theme's surface color.
          backgroundColor: getComputedStyle(document.body).getPropertyValue('--surface-900').trim() || '#0D1117'
        });
      } catch (error) {
        console.error('[Mermaid Download] Failed to capture the diagram:', error);
      } finally {
        // Restore the button to its original state.
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      }
    });
  });
}