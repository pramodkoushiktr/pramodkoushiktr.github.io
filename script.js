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





async function loadBooks(year, minRating) {

    const url = "https://script.google.com/macros/s/AKfycbztcRGkNZt2sVgnq6CnmrvpGZrzbNdNrb68rkHuTrpOVG2ZGZxiZxIXvjlqHW3e19PwHg/exec";

    const response = await fetch(url);
    const books = await response.json();

    const container = document.getElementById("book-list");
    container.innerHTML = "";

    books
        .filter(book =>
            book.read_year == year &&
            book.rating >= minRating
        )
        .forEach(book => {

            const div = document.createElement("div");
            div.textContent = `${book.book_name} | ${book.author}`;
            container.appendChild(div);

        });
}
