function toggleTheme(){
  const current = localStorage.getItem('theme');
  const icon = document.getElementById('themeIcon');

  if(current === 'light'){
    document.body.classList.remove('light');
    localStorage.setItem('theme','dark');
    if(icon) icon.innerHTML = "☀︎";
  } else{
    document.body.classList.add('light');
    localStorage.setItem('theme','light');
    if(icon) icon.innerHTML = "☽";
  }
}

function toggleLanguage() {
  const en = document.getElementById("content-en");
  const kn = document.getElementById("content-kn");

  if (en.style.display === "none") {
    en.style.display = "block";
    kn.style.display = "none";
    localStorage.setItem("lang", "en");
  } else {
    en.style.display = "none";
    kn.style.display = "block";
    localStorage.setItem("lang", "kn");
  }
}

/* ✅ SINGLE LOAD HANDLER (IMPORTANT FIX) */
window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  const savedLang = localStorage.getItem('lang');
  const icon = document.getElementById('themeIcon');

  /* ===== THEME RESTORE ===== */
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    if (icon) icon.innerHTML = "☽";
  } else {
    document.body.classList.remove('light');
    if (icon) icon.innerHTML = "☀︎";
  }

  /* ===== LANGUAGE RESTORE ===== */
  const en = document.getElementById("content-en");
  const kn = document.getElementById("content-kn");

  if (en && kn) {
    if (savedLang === "kn") {
      en.style.display = "none";
      kn.style.display = "block";
    } else {
      en.style.display = "block";
      kn.style.display = "none";
    }
  }
};
