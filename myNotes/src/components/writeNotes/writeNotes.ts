import { seeNotes } from "../seeNotes/seeNotes";
import { Note } from "../../interfaces/interface";
import { API_POST } from "../../api/apiPOST";

/*The writeNote-layout*/
export function writeNote(username: string) {
  //Get access to the mainElement (created in main.ts)
  const mainEl: HTMLElement | null = document.querySelector(".main");

  //Create a writeNoteWrapper
  const writeNoteWrapper: HTMLDivElement = document.createElement("div");
  writeNoteWrapper.classList.add("writeNoteWrapper");
  mainEl?.appendChild(writeNoteWrapper);

  //Create the exitButton
  const exitButton: HTMLButtonElement = document.createElement("button");
  exitButton.classList.add("exitButton");
  exitButton.innerHTML = "Logga ut";
  writeNoteWrapper?.appendChild(exitButton);

  //Create the seePrevious Button
  const seePreviousButton: HTMLButtonElement = document.createElement("button");
  seePreviousButton.classList.add("seePreviousButton");
  seePreviousButton.innerHTML = "Se tidigare anteckningar";
  writeNoteWrapper?.appendChild(seePreviousButton);

  /*Create the noteBox. Inside it we will have:
    1: Div for the date
    2:Inputfield for the Title
    3:Inputfield for the note*/
  const noteBox: HTMLElement = document.createElement("section");
  noteBox.classList.add("noteBox");
  writeNoteWrapper.appendChild(noteBox);

  //Create the div for the date
  const currentDate: HTMLDivElement = document.createElement("div");
  currentDate.classList.add("currentDate");
  const currDate = new Date();
  const formatedData = currDate.toLocaleDateString();
  currentDate.innerHTML = formatedData;
  noteBox.appendChild(currentDate);

  //Create the inputfield for title
  const titleInput: HTMLInputElement = document.createElement("input");
  titleInput.classList.add("titleInput");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "titleInput");
  titleInput.setAttribute("name", "titleInput");
  titleInput.setAttribute("placeholder", "Min anteckning");
  noteBox.appendChild(titleInput);

  //Create the inputfield for the note
  const noteInput: HTMLTextAreaElement = document.createElement("textarea");
  noteInput.classList.add("noteInput");
  noteInput.setAttribute("id", "noteInput");
  noteInput.setAttribute("name", "noteInput");
  noteInput.setAttribute("rows", "10");
  noteInput.setAttribute("cols", "50");
  noteInput.setAttribute("placeholder", "Vad vill du skriva om idag...");
  noteBox.appendChild(noteInput);

  //Create the publishButton
  const publishButton: HTMLButtonElement = document.createElement("button");
  publishButton.classList.add("publishButton");
  publishButton.innerHTML = "Publicera";
  writeNoteWrapper?.appendChild(publishButton);

  //when click on exitButton
  exitButton.addEventListener("click", () => {
    location.reload();
  });


  /*When click on seePreviousButton:
  "Hides" the login-layout to make room for the "next page".
  Call the seeNote-function to get the user to the "next page".*/

  seePreviousButton.addEventListener("click", async () => {  
    if (mainEl !== null && mainEl !== undefined) {
      writeNoteWrapper.style.display = "none";
    }

    seeNotes(username);
  });

  
  /*When click on publishButton:
   1:If the user havn´t typed in a Title and/or a note an alertbox will appear
        the .trim() is a built in method that delets any blankspaces in the beginning or end (if there are any)
        This is because we want to avoid try to push anything "empty" to the API.
    2:Saves all the collected info needed from the user into a object with datatype of interface Note
    3:Sends the collected info to the API.
    4:Removes the publishButton to make room for the seeNotesButton
    5:Creates the seeNotesButton.
    6:When click on the seeNotesButton
    7:Same as 1.
    8:Call the seeNote-function to get the user to the "next page".*/

  
  publishButton.addEventListener("click", async () => {
   /*1*/
    if (titleInput.value.trim() === "" || noteInput.value.trim() === "") {
      alert(
        "Du måste fylla i en Titel och en Anteckning för att kunna publicera"
      );
      return; // The return; will throw you back before the if everytime you end up inside it (everytime either the titleinput or noteinput is empty)
    }
    /*2*/
    let noteInfo: Note = {
      username: username,
      title: titleInput.value,
      note: noteInput.value,
    };

    /*3*/
    API_POST(noteInfo);

    /*4*/
    publishButton.remove();

    /*5*/
    const seeNotesButton: HTMLButtonElement = document.createElement("button");
    seeNotesButton.classList.add("seeNotesButton");
    seeNotesButton.innerHTML = "Se dina anteckningar";
    writeNoteWrapper.appendChild(seeNotesButton);

    /*6*/
    seeNotesButton.addEventListener("click", () => {
      /*7*/
      if (mainEl !== null && mainEl !== undefined) {
        writeNoteWrapper.style.display = "none";
      }
      /*8*/
      seeNotes(username);
    });
  });
}
