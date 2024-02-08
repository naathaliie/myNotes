//hämta anteckning och skicka med det specifika idet så att all rätt info skall hamna på rätt plats

import { API_GET_UPDATE } from "../../api/apiGetUpdate";

export function updateNote(noteID: string) {
  console.log("Du är inne i updateNote funktionen");
  console.log("Du kommer ändra anteckningen med id: " + `${noteID}`);

  //Collect the specific note
  /*When entering this side we want to call the function for getting the notes from the API with the specific ID
    We need to use .then and .catch because when you are calling a async function (API_GET) you will receive a promise right away,
    .then waits for the operation to get fullfiled */
  API_GET_UPDATE(noteID).then((note) => {
    console.log("Hämtad anteckning: ", note);
  });

  //Get access to the mainElement (created in main.ts)
  const mainEl: HTMLElement | null = document.querySelector(".main");

  //Create a writeNoteWrapper
  const writeNoteWrapper: HTMLDivElement = document.createElement("div");
  writeNoteWrapper.classList.add("writeNoteWrapper");
  mainEl?.appendChild(writeNoteWrapper);

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

  //Create the inpurfield for the note
  const noteInput: HTMLInputElement = document.createElement("input");
  noteInput.classList.add("noteInput");
  noteInput.setAttribute("type", "text");
  noteInput.setAttribute("id", "noteInput");
  noteInput.setAttribute("name", "noteInput");
  noteInput.setAttribute("placeholder", "Vad vill du skriva om idag...");
  noteBox.appendChild(noteInput);

  //Create the publish Button
  const publishButton: HTMLButtonElement = document.createElement("button");
  publishButton.classList.add("publishButton");
  publishButton.innerHTML = "Publicera";
  writeNoteWrapper?.appendChild(publishButton);

  //When click on seePreviousButton
  seePreviousButton.addEventListener("click", async () => {
    /* To hide the writeNote "page":
          Since mainEl may be null or undefined (HTMLElement | null), we need to verify its existence 
          before accessing its properties. Attempting to assign a value to a property of a null object 
          will result in an error, thats why we need to check it with a if-statement */
    if (mainEl !== null && mainEl !== undefined) {
      writeNoteWrapper.style.display = "none";
    }

    /* seeNotes(username); */
  });

  //When click on publishButton
  /* När man klickar på publicera skall nedan pushas in i api:et */
  /*Måste skickas med:
        1:dagens datum 
        2:Titel
        3:Anteckning
        4:username*/
  publishButton.addEventListener("click", async () => {
    /*If the user havn´t typed in a Title and/or a note an alertbox will appear
          the .trim() is a built in method that delets any blankspaces in the beginning or end (if there are any)
          This is because we want to avoid try to push anything "empty" to the API*/
    if (titleInput.value.trim() === "" || noteInput.value.trim() === "") {
      alert(
        "Du måste fylla i en Titel och en Anteckning för att kunna publicera"
      );
      return; // The return; will throw you back before the if everytime you end up inside it (everytime either the titleinput or noteinput is empty)
    }
    //Saves all the collected info needed of the user into a object with datatype of interface Note
    let noteInfo: Note = {
      username: username,
      title: titleInput.value,
      note: noteInput.value,
      /*             createdAt: currentDate.innerHTML,
       */
    };

    //Functions we want to call
  /*   API_POST(noteInfo); */ //Sends the note to the API

    //knapp för att se sina notes

    const seeNotesButton: HTMLButtonElement = document.createElement("button");
    seeNotesButton.classList.add("seeNotesButton");
    seeNotesButton.innerHTML = "Se dina anteckningar";
    writeNoteWrapper.appendChild(seeNotesButton);

    seeNotesButton.addEventListener("click", () => {
      /* To hide the writeNote "page":
          Since mainEl may be null or undefined (HTMLElement | null), we need to verify its existence 
          before accessing its properties. Attempting to assign a value to a property of a null object 
          will result in an error, thats why we need to check it with a if-statement */
      if (mainEl !== null && mainEl !== undefined) {
        writeNoteWrapper.style.display = "none";
      }

    /*   seeNotes(username);  *///goes to the seenotes page
    });
  });
}