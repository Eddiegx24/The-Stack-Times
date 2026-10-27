// The Stack Times — small interactions: date, mobile nav, theme toggle, newsletter forms.
// Theme is dark (Batman) by default; the toggle switches to the light theme.
document.addEventListener('DOMContentLoaded', function () {
  // Live date in the masthead
  var todayEl = document.getElementById('today');
  if (todayEl) {
    try {
      todayEl.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) { /* keep the static fallback date */ }
  }

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Theme toggle, remembered across visits. Dark is the default.
  var themeBtn = document.getElementById('theme-toggle');
  var saved = null;
  try { saved = localStorage.getItem('stacktimes-theme'); } catch (e) {}
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeBtn) themeBtn.textContent = '🦇 Dark mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeBtn) themeBtn.textContent = '☀️ Light mode';
    }
  }
  applyTheme(saved === 'light' ? 'light' : 'dark');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      try { localStorage.setItem('stacktimes-theme', next); } catch (e) {}
    });
  }

  // Newsletter forms: front-end validation only; wire to your email provider later
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]').value.trim();
      var msg = form.parentElement.querySelector('.form-msg');
      if (email.indexOf('@') === -1) {
        if (msg) msg.textContent = 'Please enter a valid email address.';
        return;
      }
      if (msg) msg.textContent = 'Welcome to The Stack Times! Check your inbox to confirm (connect this form to your email provider before launch).';
      form.reset();
    });
  });
});
