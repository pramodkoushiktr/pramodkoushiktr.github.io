function toggleTheme(){
  const current = localStorage.getItem('theme');
  const icon = document.getElementById('themeIcon');

  if(current === 'light'){
    document.body.classList.remove('light');
    localStorage.setItem('theme','dark');
    if(icon) icon.innerHTML = "☀️";
  } else{
    document.body.classList.add('light');
    localStorage.setItem('theme','light');
    if(icon) icon.innerHTML = "🌙";
  }
}

window.onload = () => {
  const saved = localStorage.getItem('theme');
  const icon = document.getElementById('themeIcon');

  if(saved === 'light'){
    document.body.classList.add('light');
    if(icon) icon.innerHTML = "🌙";
  } else{
    if(icon) icon.innerHTML = "☀️";
  }
};
