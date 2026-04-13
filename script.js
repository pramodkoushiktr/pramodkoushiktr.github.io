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

window.onload = () => {
  const saved = localStorage.getItem('theme');
  const icon = document.getElementById('themeIcon');

  if(saved === 'light'){
    document.body.classList.add('light');
    if(icon) icon.innerHTML = "☽";
  } else{
    if(icon) icon.innerHTML = "☀︎";
  }
};

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

// Load saved language
window.onload = function() {
  const lang = localStorage.getItem("lang");

  if (lang === "kn") {
    document.getElementById("content-en").style.display = "none";
    document.getElementById("content-kn").style.display = "block";
  }
}
