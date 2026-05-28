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
const sendBtn   = document.getElementById('sendBtn');

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  const line = document.createElement('div');
  line.className = 'chat-line self';
  line.innerHTML = `<span class="sender">YOU:</span><span class="msg">${escapeHTML(text.toUpperCase())}</span>`;
  chatLog.appendChild(line);
  chatLog.scrollTop = chatLog.scrollHeight;

  chatInput.value = '';
  chatInput.focus();

  // Simulate a delayed reply
  setTimeout(() => {
    const replies = [
      "COPY THAT.",
      "UNDERSTOOD. STANDING BY.",
      "WHAT'S YOUR 20?",
      "NEGATIVE. REPEAT LAST.",
      "10-4. OVER.",
      "WHO AUTHORIZED THIS?",
      "RADIO SILENCE FROM HERE.",
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const replyLine = document.createElement('div');
    replyLine.className = 'chat-line other';
    replyLine.innerHTML = `<span class="sender">J. O'NEIL:</span><span class="msg">${reply}</span>`;
    chatLog.appendChild(replyLine);
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 900 + Math.random() * 700);
}

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

sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
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
