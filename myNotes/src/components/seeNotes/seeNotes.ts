import { API_DELETE } from "../../api/apiDELETE";
import { API_GET } from "../../api/apiGET";
import { API_PUT } from "../../api/apiPUT";
import { Note, updateNote } from "../../interfaces/interface";
import { writeNote } from "../writeNotes/writeNotes";

export function seeNotes(username: string) {
  console.log("Du är inne i seeNotes funktionen");

  //We need this to be global in this function
  let noteID: string;

  //Get access to the mainElement (created in main.ts)
  const mainEl: HTMLElement | null = document.querySelector(".main");

  //Create a seeNoteWrapper
  const seeNoteWrapper: HTMLDivElement = document.createElement("div");
  seeNoteWrapper.classList.add("seeNoteWrapper");
  mainEl?.appendChild(seeNoteWrapper);

  //Create the backButton
  const backButton: HTMLButtonElement = document.createElement("button");
  backButton.classList.add("backButton");
  backButton.innerHTML = "Tillbaka";
  seeNoteWrapper.appendChild(backButton);
  //Create the writeNewNoteButton

  /*When entering this side we want to call the function for getting the notes from the API with the username
   We need to use .then and .catch because when you are calling a async function (API_GET) you will receive a promise right away,
   .then waits for the operation to get fullfiled */
  API_GET(username)
    .then((notes) => {
      console.log("Hämtade anteckningar: ", notes);

      //If the user havn´t published any notes yet
      if (notes.length === 0) {
        //Create a noNoteSection
        const noNoteSection: HTMLElement = document.createElement("section");
        noNoteSection.classList.add(`noNoteSection`);
        noNoteSection.innerHTML = "Du har inte skapat några anteckningar ännu";
        seeNoteWrapper.appendChild(noNoteSection);
      }

      //But if the user has published notes we will print them out one by one :)

      notes.forEach((note: Note, i: number) => {
        //Create the noteSection
        const noteSection: HTMLElement = document.createElement("section");
        noteSection.classList.add("noteDiv", `${i}`);
        seeNoteWrapper.appendChild(noteSection);

        //Create the div for the date
        const theDate: HTMLDivElement = document.createElement("div");
        theDate.classList.add("theDate", `${i}`);
        // Here I use the nullish coalescing operator (??) to provide a default value to the variable 'theDate' if 'note.createdAt' is null or undefined.
        theDate.textContent =
          note.createdAt?.toString() ?? "Det finns inget datum";
        noteSection.appendChild(theDate);

        //Create the div for the Title
        const theTitle: HTMLDivElement = document.createElement("div");
        theTitle.classList.add("theTitle", `${i}`);
        theTitle.innerHTML = note.title;
        noteSection.appendChild(theTitle);

        //Create the div for the note
        const theNote: HTMLDivElement = document.createElement("div");
        theNote.classList.add("theNote", `${i}`);
        theNote.innerHTML = note.note;
        noteSection.appendChild(theNote);

        //A box for the heart and the signature
        const signatureDivBox: HTMLDivElement = document.createElement("div");
        signatureDivBox.classList.add("signatureDivBox", `${i}`);
        noteSection.appendChild(signatureDivBox);

        //Create the div for the heart-symbol
        const theHeartSymbol: HTMLImageElement = document.createElement("img");
        theHeartSymbol.classList.add("theHeartSymbol", `${i}`);
        theHeartSymbol.src = "./src/img/icon_heart.png";
        signatureDivBox.appendChild(theHeartSymbol);

        //Create the div for the usernam
        const theUsername: HTMLDivElement = document.createElement("div");
        theUsername.classList.add("theUsername", `${i}`);
        theUsername.innerHTML = note.username;
        signatureDivBox.appendChild(theUsername);

        //Create the updateButton
        const updateNoteButton: HTMLButtonElement =
          document.createElement("button");
        updateNoteButton.classList.add("updateNoteButton", `${i}`);
        updateNoteButton.innerHTML = "Updatera";
        noteSection.appendChild(updateNoteButton);

        //Create the deleteButton
        const deleteButton: HTMLButtonElement =
          document.createElement("button");
        deleteButton.classList.add("deleteButton", `${i}`);
        deleteButton.innerHTML = "Ta bort";
        noteSection.appendChild(deleteButton);



        /*******************UPDATE BUTTON*****************UPDATE BUTTON******************UPDATE BUTTON****************UPDATE BUTTON********************************/

        //When click on the updateButton
        updateNoteButton.addEventListener("click", () => {
          /* När man klickar på updateButton vill jag att en pop-up ruta med allt innehåll från den klickade anteckningen skall poppa upp */
          console.log("du har klickat på updatebutton");

          //Create the updateSection
          const updateSection: HTMLElement = document.createElement("section");
          updateSection.classList.add("updateSection", `${i}`);
          /* updateSection.innerHTML = 'Du vill uppdatera mig med unikt id: ' + note.id; */
          seeNoteWrapper.appendChild(updateSection);

          //Create the div for the date
          const theDate: HTMLDivElement = document.createElement("div");
          theDate.classList.add("theDate", `${i}`);
          theDate.textContent = note.createdAt?.toString() ?? "";
          updateSection.appendChild(theDate);

          //Create the div for the Title
          const updateTitle: HTMLInputElement = document.createElement("input");
          updateTitle.classList.add("updateTitle", `${i}`);
          updateTitle.setAttribute("type", "text");
          updateTitle.setAttribute("id", "updateTitle");
          updateTitle.setAttribute("name", "updateTitle");
          updateTitle.setAttribute("placeholder", note.title);
          updateSection.appendChild(updateTitle);

          //Create the div for the note
          const updateNote: HTMLInputElement = document.createElement("input");
          updateNote.classList.add("updateNote", `${i}`);
          updateNote.setAttribute("type", "text");
          updateNote.setAttribute("id", "updateNote");
          updateNote.setAttribute("name", "updateNote");
          updateNote.setAttribute("placeholder", note.note);
          updateSection.appendChild(updateNote);

          //A box for the heart and the signature
          const signatureDivBox: HTMLDivElement = document.createElement("div");
          signatureDivBox.classList.add("signatureDivBox", `${i}`);
          updateSection.appendChild(signatureDivBox);

          //Create the div for the heart-symbol
          const theHeartSymbol: HTMLImageElement =
            document.createElement("img");
          theHeartSymbol.classList.add("theHeartSymbol", `${i}`);
          theHeartSymbol.src = "./src/img/icon_heart.png";
          signatureDivBox.appendChild(theHeartSymbol);

          //Create the div for the usernam
          const theUsername: HTMLDivElement = document.createElement("div");
          theUsername.classList.add("theUsername", `${i}`);
          theUsername.innerHTML = note.username;
          signatureDivBox.appendChild(theUsername);

          //Create the abortButton
          const abortButton: HTMLButtonElement =
            document.createElement("button");
          abortButton.classList.add("abortButton", `${i}`);
          abortButton.innerHTML = "Avbryt";
          updateSection.appendChild(abortButton);

          //Create the confirmButton
          const confirmButton: HTMLButtonElement =
            document.createElement("button");
          confirmButton.classList.add("confirmButton", `${i}`);
          confirmButton.innerHTML = "Ok";
          updateSection.appendChild(confirmButton);


          /***************************************************ABORT-CONFIRM BUTTON************************************************************/
          //Vad som skall hända när användaren klickar på avbryt
          abortButton.addEventListener("click", () => {
            updateSection.remove();
          });

          /***************************************************ABORT-CONFIRM BUTTON************************************************************/





          /***************************************************UPDATE-CONFIRM BUTTON************************************************************/
          //Vad som skall hända när vi klickar på okknappen
          confirmButton.addEventListener("click", () => {
            //Saves all the collected info needed of the user into a object with datatype of interface Note
            let updatedNote: updateNote = {
              note: updateNote.value,
            };
            //Adds it to the global variable of this function
            noteID = note.id ?? "Inget ID";
            //Sends the updatednote to the API
            API_PUT(updatedNote, noteID);

            seeNoteWrapper.remove();

            setTimeout(() => {
              seeNotes(username);
            }, 300);
          });
          /***************************************************UPDATE-CONFIRM BUTTON************************************************************/

        });

/*******************UPDATE BUTTON*****************UPDATE BUTTON******************UPDATE BUTTON****************UPDATE BUTTON********************************/


/*******************DELETE BUTTON*****************DELETE BUTTON******************DELETE BUTTON****************DELETE BUTTON********************************/

        //When click on the deleteButton
        deleteButton.addEventListener("click", () => {
          console.log(
            "Du klickade på deletknappen för note nr: " +
              `${i}. ` +
              "Med unikt id: " +
              note.id
          );
          //Call the API_DELETE function to delete the message

          /* A confirmBox, if the user klicks ok it will be true if the user klicks avbryt it will be false */
          const checkIfDelete = confirm(
            "Är du säker på att du vill radera din anteckning?"
          );
          if (checkIfDelete) {
            //Adds it to the global variable of this function
            noteID = note.id ?? "Inget ID";
            //The klicked note will be deleted
            API_DELETE(noteID);
            //We will reset the created elements
            seeNoteWrapper.remove();

            //Set a timeout so the deleted note has a chanse of being deleted
            setTimeout(() => {
              seeNotes(username);
            }, 300);
          } else {
            return;
          }
        });

/*******************DELETE BUTTON*****************DELETE BUTTON******************DELETE BUTTON****************DELETE BUTTON********************************/

      });
    })
    .catch((error) => {
      console.error("Ett fel uppstod vid hämtning av anteckningar.");
    });

/*******************GO-BACK BUTTON*****************GO-BACK  BUTTON******************GO-BACK  BUTTON****************GO-BACK  BUTTON***************************/

  //When click on the backButton to go back to seeNote page
  backButton.addEventListener("click", () => {
    //get access to the writeNoteWrapper
    const writeNoteWrapper: HTMLDivElement =
      document.querySelector(".writeNoteWrapper");

    if ((writeNoteWrapper.style.display = "none")) {
      writeNoteWrapper.style.display = "block";
    }

    //To make the previous created elements disappear.
    writeNoteWrapper.remove();

    //Makes the seeNoteWrapper "Dissappear"
    seeNoteWrapper.style.display = "none";

    writeNote(username);
  });

  /*******************GO-BACK BUTTON*****************GO-BACK  BUTTON******************GO-BACK  BUTTON****************GO-BACK  BUTTON***************************/

}
