import { API_DELETE } from "../../api/apiDELETE";
import { API_GET } from "../../api/apiGET";
import { API_PUT } from "../../api/apiPUT";
import { Note, updateNote } from "../../interfaces/interface";
import { writeNote } from "../writeNotes/writeNotes";

export function seeNotes(username: string) {

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

  //Create the writeNewNoteButton as a div
  const writeNewButton: HTMLDivElement = document.createElement("div");
  writeNewButton.classList.add("writeNewButton");
  seeNoteWrapper.appendChild(writeNewButton);
  //The img för the writeNewButton
  const thePenSymbol: HTMLImageElement =
  document.createElement("img");
  thePenSymbol.classList.add("thePenSymbol");
  thePenSymbol.src = "./src/img/Vector.png";
  writeNewButton.appendChild(thePenSymbol);

  /* When click on writeNewButton
  1: Get access to the writeNoteWrapper and make it visible
  2:Makes the previous created elements disappear and to avoid stacking them on top of each other.
  3:Call the writeNote-function to get the user to the "next page".*/

  writeNewButton.addEventListener('click', () => {
    
      /*1*/
      const writeNoteWrapper: HTMLDivElement =
        document.querySelector(".writeNoteWrapper");
  
      if ((writeNoteWrapper.style.display = "none")) {
        writeNoteWrapper.style.display = "block";
      }
  
      /*2*/
      writeNoteWrapper.remove();
      seeNoteWrapper.remove();
      /*3*/
      writeNote(username);
  });

  /*Function for getting the notes from the API with the username is called automatically.
   We need to use .then and .catch because when you are calling a async function (API_GET) you will receive a promise right away,
   .then waits for the operation to get fullfiled */
  API_GET(username)
    .then((notes) => {
     
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
        noteSection.classList.add("noteSection", `${i}`);
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



        /*******************UPDATE BUTTON*****************/

        /*When click on the updateButton the note will pop-up on the screen*/
        updateNoteButton.addEventListener("click", () => {
        
          //Create the updateSection
          const updateSection: HTMLElement = document.createElement("section");
          updateSection.classList.add("updateSection", `${i}`);
          seeNoteWrapper.appendChild(updateSection);

          //Create the div for the date
          const theDate: HTMLDivElement = document.createElement("div");
          theDate.classList.add("theDate", `${i}`);
          theDate.textContent = note.createdAt?.toString() ?? "";
          updateSection.appendChild(theDate);

          //Create the div for the Title
          const updateTitle: HTMLDivElement = document.createElement("div");
          updateTitle.classList.add("updateTitle", `${i}`);
          updateTitle.innerHTML = note.title;
          updateSection.appendChild(updateTitle);

          //Create the div for the note
          const updateNote: HTMLTextAreaElement = document.createElement("textarea");
          updateNote.classList.add("updateNote", `${i}`);
          updateNote.setAttribute("id", "updateNote");
          updateNote.setAttribute("name", "updateNote");
          updateNote.setAttribute("rows", "10");
          updateNote.setAttribute("cols", "50");
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


          /*******************************ABORT-CONFIRM BUTTON*******************/
          
          /*When click on the abortButton the pop-up note will be removed */
          abortButton.addEventListener("click", () => {
            updateSection.remove();
          });



          /*********************************UPDATE-CONFIRM BUTTON***************/
          /*When click on the ConfirmButton
          1:Saves all the collected info needed of the user into a object with datatype of interface Note.
          2:Adds it to the global variable of this function.
          3:Sends the updatednote to the API
          4:Call the seeNoteWrapper to get the user to the "next page".
          5:A timedelay so the api will get updated before we send the user to the "next page". */
          confirmButton.addEventListener("click", () => {
            /*1*/
            let updatedNote: updateNote = {
              note: updateNote.value,
            };
            /*2*/
            noteID = note.id ?? "Inget ID";
            /*3*/
            API_PUT(updatedNote, noteID);
            /*4*/
            seeNoteWrapper.remove();
            /*5*/
            setTimeout(() => {
              seeNotes(username);
            }, 800);
          });
        });


        /*******************DELETE BUTTON**************/

        /*When click on the deleteButton:
        1:A confirmBox, if the user klicks ok it will be true if the user klicks avbryt it will be false.
        2:IF= the user cliks on ok -> Adds it to the global variable of this function.
        3:The klicked note will be deleted.
        4:We will reset the created elements.
        5:A timedelay so the api will get updated before we send the user to the "next page".
        6:ELSE= Nothing happens, the user gets back a step.*/
        deleteButton.addEventListener("click", () => {
          
          /*1*/
          const checkIfDelete = confirm(
            "Är du säker på att du vill radera din anteckning?"
          );
          if (checkIfDelete) {
            /*2*/
            noteID = note.id ?? "Inget ID";
            /*3*/
            API_DELETE(noteID);
            /*4*/
            seeNoteWrapper.remove();

            /*5*/
            setTimeout(() => {
              seeNotes(username);
            }, 800);
            /*6*/
          } else {
            return;
          }
        });
      });
    })
    .catch((error) => {
      console.error("Ett fel uppstod vid hämtning av anteckningar.");
    });

/*******************GO-BACK BUTTON****************/

  /*When click on the backButton:
   1:Get access to the writeNoteWrapper and make it visible.
   2:Removes the previous created elements to avoid stacking them on top of each other.
   3:Makes the seeNoteWrapper "Dissappear".
   4:Call the writeNote-function to get the user to the "next page".*/

  backButton.addEventListener("click", () => {
    /*1*/
    const writeNoteWrapper: HTMLDivElement =
      document.querySelector(".writeNoteWrapper");
    
    if ((writeNoteWrapper.style.display = "none")) {
      writeNoteWrapper.style.display = "block";
    }

    /*2*/
    writeNoteWrapper.remove();
    seeNoteWrapper.remove();

    /*3*/
    seeNoteWrapper.style.display = "none";
    /*4*/
    writeNote(username);
  });
}
