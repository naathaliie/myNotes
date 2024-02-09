//Import is so we can use code from other files
import { writeNote } from "../writeNotes/writeNotes";

/*Create the LogIn-layout
Export is needed to be able to reach the function from main.ts*/
export function logIn() {
  //Get access to the mainElement (created in main.ts)
  const mainEl: HTMLElement | null = document.querySelector(".main");

  //Create a mainWrapper
  const mainWrapper: HTMLDivElement = document.createElement("div");
  mainWrapper.classList.add("mainWrapper");
  mainEl?.appendChild(mainWrapper);

  //Create a box for the input-field and its lable
  const inputFormEl: HTMLFormElement = document.createElement("form");
  inputFormEl.classList.add("inputForm");
  mainWrapper?.appendChild(inputFormEl);

  //Create the lable...
  const userNameLable: HTMLLabelElement = document.createElement("label");
  userNameLable.classList.add("userNameLable");
  userNameLable.setAttribute("for", "username");
  userNameLable.innerHTML = "Användarnamn";
  inputFormEl.appendChild(userNameLable);
  //...and the input
  const userNameInput: HTMLInputElement = document.createElement("input");
  userNameInput.classList.add("userNameInput");
  userNameInput.setAttribute("type", "text");
  userNameInput.setAttribute("id", "username");
  userNameInput.setAttribute("name", "username");
  userNameInput.setAttribute("placeholder", "Skriv in ditt användarnamn...");
  inputFormEl.appendChild(userNameInput);

  //Create the logIn Button
  const logInButton: HTMLButtonElement = document.createElement("button");
  logInButton.classList.add("logInButton");
  logInButton.innerHTML = "Logga in";
  mainWrapper?.appendChild(logInButton);

  /*When the user clicks on the logInButton this will happen:
  1: We want to make sure the user has typed in its username.
  2:We collect the username so we can use it(we need it to get the notes).
  3.This "hides" the login-layout to make room for the "next page",
    Since mainEl may be null or undefined (HTMLElement | null), we need to verify its existence 
    before accessing its properties. Attempting to assign a value to a property of a null object 
    will result in an error, thats why we need to check it with a if-statement 
  4.Call the writeNote-function to get the user to the "next page".*/
  
    logInButton.addEventListener("click", () => {
    /*1*/
      if (userNameInput.value.trim() === "") {
      alert("Du måste fylla i ditt användarnamn för att kunna logga in");
      return; // This will "throw" the user back so they have to type in a username
    }

    /*2*/
    let userName = userNameInput.value;

    /*3*/
    if (mainEl !== null && mainEl !== undefined) {
      mainWrapper.style.display = "none";
    }

    /*4*/
    writeNote(userName);
  });
}

