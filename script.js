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




//==================================================
// GOOGLE APPS SCRIPT URL
//==================================================

const API_URL = "https://script.google.com/macros/s/AKfycbyDVlmBrr7n-3GQXvhJD1-nrE6YywmsWtnGmFtzQmuU6jf0CGcNWUDJ2DEWvSC0wbSp/exec";


//==================================================
// VARIABLES
//==================================================

let selectedCourse = "";
let selectedCourseName = "";
let selectedCourseLink = "";


//==================================================
// BUY COURSE
//==================================================

function buyCourse(courseId){

    selectedCourse = courseId;

    document.getElementById("currentCourseId").value = courseId;

    if(sessionStorage.getItem("studentId")==null){

        openLogin();

        return;

    }

    checkPurchase();

}



//==================================================
// POPUPS
//==================================================

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



//==================================================
// LOADING
//==================================================

function showLoading(){

    openPopup("loadingPopup");

}

function hideLoading(){

    closePopup("loadingPopup");

}



//==================================================
// PAGE LOAD
//==================================================

window.onload=function(){

    if(sessionStorage.getItem("studentId")){

        document.getElementById("studentBar").style.display="block";

        document.getElementById("studentName").innerHTML=sessionStorage.getItem("studentName");

    }

}



//==================================================
// LOGOUT
//==================================================

function logoutStudent(){

    sessionStorage.clear();

    location.reload();

}



//==================================================
// SIGNUP
//==================================================

async function signupStudent(){

    let name=document.getElementById("signupName").value.trim();

    let email=document.getElementById("signupEmail").value.trim();

    let password=document.getElementById("signupPassword").value.trim();

    if(name==""){

        alert("Enter your name.");

        return;

    }

    if(email==""){

        alert("Enter email.");

        return;

    }

    if(password==""){

        alert("Enter password.");

        return;

    }

    showLoading();

    let response=await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"signup",

            name:name,

            email:email,

            password:password

        })

    });

    let result=await response.json();

    hideLoading();

    if(result.status=="exists"){

        alert("Email already registered.");

        return;

    }

    sessionStorage.setItem("studentId",result.studentId);

    sessionStorage.setItem("studentName",name);

    sessionStorage.setItem("studentEmail",email);

    document.getElementById("studentBar").style.display="block";

    document.getElementById("studentName").innerHTML=name;

    closePopup("signupPopup");

    checkPurchase();

}



//==================================================
// LOGIN
//==================================================

async function loginStudent(){

    let email=document.getElementById("loginEmail").value.trim();

    let password=document.getElementById("loginPassword").value.trim();

    if(email==""){

        alert("Enter email.");

        return;

    }

    if(password==""){

        alert("Enter password.");

        return;

    }

    showLoading();

    let response=await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"login",

            email:email,

            password:password

        })

    });

    let result=await response.json();

    hideLoading();

    if(result.status!="success"){

        alert("Wrong email or password.");

        return;

    }

    sessionStorage.setItem("studentId",result.studentId);

    sessionStorage.setItem("studentName",result.name);

    sessionStorage.setItem("studentEmail",email);

    document.getElementById("studentBar").style.display="block";

    document.getElementById("studentName").innerHTML=result.name;

    closePopup("loginPopup");

    checkPurchase();

}


//==================================================
// CHECK COURSE PURCHASE STATUS
//==================================================

async function checkPurchase(){

    let studentId=sessionStorage.getItem("studentId");

    if(!studentId){

        openLogin();

        return;

    }


    showLoading();


    let response=await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"checkPurchase",

            studentId:studentId,

            courseId:selectedCourse

        })

    });


    let result=await response.json();


    hideLoading();



    // No purchase found

    if(result.status=="notPurchased"){

    alert("Payment popup should open now");

    openPopup("paymentPopup");

    return;

}



    // Payment submitted but not approved

    if(result.status=="Pending"){

        openPopup("pendingPopup");

        return;

    }



    // Course activated

    if(result.status=="Approved"){

        openPopup("approvedPopup");

        return;

    }


}



//==================================================
// SUBMIT UPI TRANSACTION
//==================================================

async function submitTransaction(){


    let transactionId=document
    .getElementById("transactionId")
    .value
    .trim();



    if(transactionId==""){

        alert("Enter UPI Transaction ID.");

        return;

    }



    let studentId=sessionStorage.getItem("studentId");



    if(!studentId){

        alert("Please login again.");

        return;

    }



    showLoading();



    let response=await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"submitPayment",

            studentId:studentId,

            courseId:selectedCourse,

            transactionId:transactionId

        })

    });



    let result=await response.json();



    hideLoading();



    if(result.status=="success"){


        closePopup("paymentPopup");


        openPopup("successPopup");


        return;


    }



    alert("Something went wrong. Try again.");



}



//==================================================
// OPEN COURSE
//==================================================

function openCourse(){


    closePopup("approvedPopup");


    if(selectedCourse=="COURSE001"){


        window.location.href="course.html?id=COURSE001";


    }


}



//==================================================
// CLOSE POPUP WHEN CLICKING OUTSIDE
//==================================================

window.onclick=function(event){


    let popups=document.getElementsByClassName("popup");


    for(let i=0;i<popups.length;i++){


        if(event.target==popups[i]){


            popups[i].style.display="none";


        }

    }


}
