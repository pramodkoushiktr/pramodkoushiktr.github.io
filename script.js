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




let loggedUser = null;



function buyCourse(){

if(localStorage.getItem("user")){

showPurchase();

}

else{

openAuthModal();

}

}





function openAuthModal(){

document.getElementById("authModal")
.style.display="flex";

}




function closeAuthModal(){

document.getElementById("authModal")
.style.display="none";

}




function login(){

let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



if(email==="" || password===""){

alert("Enter email and password");

return;

}



localStorage.setItem(
"user",
email
);



closeAuthModal();


showPurchase();


}







function register(){

let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



if(email==="" || password===""){

alert("Enter details");

return;

}



localStorage.setItem(
"user",
email
);



alert("Account created");


closeAuthModal();


showPurchase();


}








function showPurchase(){

document.getElementById("purchaseModal")
.style.display="flex";

}






function closePurchaseModal(){

document.getElementById("purchaseModal")
.style.display="none";

}







function payment(plan){


if(plan=="monthly"){

alert("Opening Razorpay Monthly Subscription");

}


if(plan=="quarterly"){

alert("Opening Razorpay Quarterly Subscription");

}


if(plan=="yearly"){

alert("Opening Razorpay Yearly Subscription");

}


if(plan=="lifetime"){

alert("Opening Razorpay One Time Payment");

}



// Razorpay code will come here later


}
