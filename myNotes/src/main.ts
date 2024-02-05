//Imports the function from logIn.ts

import { logIn } from "./components/logIn/logIn";

//creates the base layout
function baseLayout() {
  //Gets access to the only element in the index.html
  const wrapperEl: HTMLElement | null = document.getElementById("wrapper");
  //creates the navbar
  const navEl: HTMLElement = document.createElement("nav");
  navEl.classList.add("navbar");
  wrapperEl?.appendChild(navEl);
  //Create a img for the logo
  const logoImgEl: HTMLImageElement = document.createElement("img");
  logoImgEl.classList.add("logoIMG");
  logoImgEl.src = "./src/img/Title.png";
  navEl.appendChild(logoImgEl);

  //creates the Main
  const mainEl: HTMLElement = document.createElement("main");
  mainEl.classList.add("main");
  wrapperEl?.appendChild(mainEl);

logIn();
}

baseLayout();
