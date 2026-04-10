function toggleTheme(){
  const current = localStorage.getItem('theme');

  if(current === 'light'){
    document.body.classList.remove('light');
    localStorage.setItem('theme','dark');
  } else{
    document.body.classList.add('light');
    localStorage.setItem('theme','light');
  }
}

window.onload = () => {
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){
    document.body.classList.add('light');
  }
};
