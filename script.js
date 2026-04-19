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

function setLanguage(lang) {
  // hide everything
  document.querySelectorAll(".lang").forEach(el => {
    el.style.display = "none";
  });

  // show selected language
  document.querySelectorAll(".lang-" + lang).forEach(el => {
    el.style.display = "block";
  });

  localStorage.setItem("lang", lang);
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
  const defaultLang = savedLang || "en";
  setLanguage(defaultLang);
};

/* ==================this is the contact text box saving thing============*/

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    };

    await fetch("https://script.google.com/macros/s/AKfycbzGkGWgM_Y5WjfPV2ng9lDyGUoOa7N7iU8pS50kouFZwkPE0xpd8UHRsKj3idE3NuyClA/exec", {
      method: "POST",
      body: JSON.stringify(data)
    });

    alert("Message saved!");
  });
});
