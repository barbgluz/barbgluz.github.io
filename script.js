/* =============================================
   BLTMR PLC 2.4.00 — Terminal Script
   ============================================= */

// ─── TAB SWITCHING ─────────────────────────────
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    // Update tabs
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show correct panel
    panels.forEach(panel => {
      if (panel.id === `tab-${target}`) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });
  });
});


// ─── CHAT SEND ─────────────────────────────────
const chatLog   = document.getElementById('chatLog');
const chatInput = document.getElementById('chatInput');

// ─── ACCORDIONS ──────────────────────────────
document.querySelectorAll('.accordion-row').forEach(row => {
  row.addEventListener('click', () => {
    const isOpen = row.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-row.open').forEach(r => r.classList.remove('open'));
    // Open clicked unless it was already open
    if (!isOpen) row.classList.add('open');
  });
});


// ─── SPECIAL CHAR BUTTONS ──────────────────────
document.querySelectorAll('.char-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const char = btn.textContent;
    const pos  = chatInput.selectionStart;
    const val  = chatInput.value;
    chatInput.value = val.slice(0, pos) + char + val.slice(pos);
    chatInput.selectionStart = chatInput.selectionEnd = pos + 1;
    chatInput.focus();
  });
});


// ─── ESCAPE HTML ───────────────────────────────
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ─── STARTUP BLINK EFFECT ──────────────────────
// Simulate a brief screen boot on load
document.addEventListener('DOMContentLoaded', () => {
  const tw = document.querySelector('.terminal-window');
  tw.style.opacity = '0';
  tw.style.transition = 'opacity 0.08s';

  let flashes = 0;
  const bootFlash = setInterval(() => {
    tw.style.opacity = tw.style.opacity === '0' ? '1' : '0';
    flashes++;
    if (flashes >= 5) {
      clearInterval(bootFlash);
      tw.style.opacity = '1';
    }
  }, 80);
});
