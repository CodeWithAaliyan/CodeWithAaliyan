/* TYPING EFFECT */
const words=["Building the AI Future"];
let i=0,j=0,del=false;
function type(){
  const word=words[i];
  else if(del && j--===0){ del=false; i=(i+1)%words.length; }
  setTimeout(type,del?60:120);
}
type();

/* SCROLL ANIMATION */
const fades=document.querySelectorAll(".fade");
window.addEventListener("scroll",()=>{
  fades.forEach(el=>{
    if(el.getBoundingClientRect().top<window.innerHeight-100)
      el.classList.add("show");
  });
});

/* MOBILE MENU */
menu.onclick=()=>nav.classList.toggle("show");

/* BUTTON CLICK EFFECT */
const thankBtn = document.getElementById("thankBtn");
thankBtn.onclick = () => {
  alert("Thank you for visiting my website!");
};

/* DARK MODE CIRCLE TOGGLE */
const themeToggleCircle = document.getElementById("themeToggleCircle");
themeToggleCircle.onclick = ()=>{
  if(document.body.dataset.theme === "light"){
    document.body.dataset.theme = "dark";
    themeToggleCircle.innerText = "☀️";
  } else{
    document.body.dataset.theme = "light";
    themeToggleCircle.innerText = "🌙";
  }

};


