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
window.onload = async function () {
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
  await fetchBooks();
  
};




let allBooks = [];

async function fetchBooks() {
    const url = "https://script.google.com/macros/s/AKfycbztcRGkNZt2sVgnq6CnmrvpGZrzbNdNrb68rkHuTrpOVG2ZGZxiZxIXvjlqHW3e19PwHg/exec";

    const response = await fetch(url);
    allBooks = await response.json();

    displayBooks();
}

function displayBooks() {

    const years = [ 2026, 2025, 2024, 2019];

    years.forEach(year => {

        const container = document.getElementById(`books-${year}`);
        container.innerHTML = "";

        const html = allBooks
            .filter(book =>
                Number(book.read_year) === year &&
                Number(book.rating) >= 8
            )
            .map(book =>
                `<div>• ${book.book_name} | ${book.author}</div>`
            )
            .join("");

        container.innerHTML = html;
    });

}




// =========================
// GOOGLE APPS SCRIPT URL
// =========================

const API_URL = "PASTE_YOUR_WEBAPP_URL_HERE";


// =========================
// SESSION
// =========================

let currentCourse = "";
let currentCourseName = "";
let currentCourseLink = "";


// =========================
// BUY NOW
// =========================

function buyCourse(courseId){

    currentCourse = courseId;

    document.getElementById("currentCourseId").value = courseId;

    if(sessionStorage.getItem("studentId")==null){

        openLogin();

        return;

    }

    checkPurchase();

}



// =========================
// POPUPS
// =========================

function openPopup(id){

    document.getElementById(id).style.display="flex";

}

function closePopup(id){

    document.getElementById(id).style.display="none";

}

function openLogin(){

    closePopup("signupPopup");

    openPopup("loginPopup");

}

function openSignup(){

    closePopup("loginPopup");

    openPopup("signupPopup");

}



// =========================
// SIGNUP
// =========================

async function signupStudent(){

    let name=document.getElementById("signupName").value.trim();

    let email=document.getElementById("signupEmail").value.trim();

    let password=document.getElementById("signupPassword").value.trim();

    if(name=="" || email=="" || password==""){

        alert("Fill all fields.");

        return;

    }

    openPopup("loadingPopup");

    const response=await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"signup",

            name:name,

            email:email,

            password:password

        })

    });

    const data=await response.json();

    closePopup("loadingPopup");

    if(data.status=="exists"){

        alert("Email already registered.");

        return;

    }

    sessionStorage.setItem("studentId",data.studentId);

    sessionStorage.setItem("studentName",name);

    sessionStorage.setItem("studentEmail",email);

    document.getElementById("studentName").innerHTML=name;

    document.getElementById("studentBar").style.display="block";

    closePopup("signupPopup");

    checkPurchase();

}



// =========================
// LOGIN
// =========================

async function loginStudent(){

    let email=document.getElementById("loginEmail").value.trim();

    let password=document.getElementById("loginPassword").value.trim();

    if(email=="" || password==""){

        alert("Enter email and password.");

        return;

    }

    openPopup("loadingPopup");

    const response=await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"login",

            email:email,

            password:password

        })

    });

    const data=await response.json();

    closePopup("loadingPopup");

    if(data.status!="success"){

        alert("Wrong email or password.");

        return;

    }

    sessionStorage.setItem("studentId",data.studentId);

    sessionStorage.setItem("studentName",data.name);

    sessionStorage.setItem("studentEmail",email);

    document.getElementById("studentName").innerHTML=data.name;

    document.getElementById("studentBar").style.display="block";

    closePopup("loginPopup");

    checkPurchase();

}



// =========================
// LOGOUT
// =========================

function logoutStudent(){

    sessionStorage.clear();

    location.reload();

}



// =========================
// PAGE LOAD
// =========================

window.onload=function(){

    if(sessionStorage.getItem("studentId")!=null){

        document.getElementById("studentBar").style.display="block";

        document.getElementById("studentName").innerHTML=sessionStorage.getItem("studentName");

    }

}
