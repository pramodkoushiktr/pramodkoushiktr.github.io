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

  /* ===== LOAD BOOKS ===== */
  loadBooks(2028, 8, "books-2026");
  loadBooks(2027, 8, "books-2025");
  loadBooks(2026, 8, "books-2026");
  loadBooks(2025, 8, "books-2025");
  loadBooks(2024, 8, "books-2026");
  loadBooks(2019, 8, "books-2025");
};






async function loadBooks(year, minRating, containerId) {

    const url = "https://script.google.com/macros/s/AKfycbztcRGkNZt2sVgnq6CnmrvpGZrzbNdNrb68rkHuTrpOVG2ZGZxiZxIXvjlqHW3e19PwHg/exec";

    const response = await fetch(url);
    const books = await response.json();

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    books
        .filter(book =>
            book.read_year == year &&
            book.rating >= minRating
        )
        .forEach(book => {

            const div = document.createElement("div");
            div.textContent = `• ${book.book_name} | ${book.author}`;
            container.appendChild(div);

        });
}
