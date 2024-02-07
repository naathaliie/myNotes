import { API_DELETE } from "../../api/apiDELETE";
import { API_GET } from "../../api/apiGET";
import { Note } from "../../interfaces/interface";
import { writeNote } from "../writeNotes/writeNotes";



export function seeNotes(username: string){
    console.log("Du är inne i seeNotes funktionen");
    
    //Get access to the mainElement (created in main.ts)
    const mainEl: HTMLElement | null = document.querySelector('.main');

    //Create a seeNoteWrapper
    const seeNoteWrapper: HTMLDivElement = document.createElement('div');
    seeNoteWrapper.classList.add('seeNoteWrapper');
    mainEl?.appendChild(seeNoteWrapper);

    //Create the backButton
    const backButton: HTMLButtonElement = document.createElement('button');
    backButton.classList.add('backButton');
    backButton.innerHTML = 'Tillbaka';
    seeNoteWrapper.appendChild(backButton);
    //Create the writeNewNoteButton


    /*Create a container för every note from the api
    Get access to the API
    If ther is no notes, message = You dont have any notes
    If ther is notes, they should be displayed*/
 


    /*When entering this side we want to call the function for getting the notes from the API with the username
   We need to use .then and .catch because when you are calling a async function (API_GET) you will receive a promise right away,
   .then waits for the operation to get fullfiled */
   API_GET(username)
   .then(notes => {
       console.log('Hämtade anteckningar: ', notes);
       
       //If the user havn´t published any notes yet
       if (notes.length === 0) {
         
         //Create a noNoteSection
         const noNoteSection: HTMLElement = document.createElement('section');
         noNoteSection.classList.add(`noNoteSection`);
         noNoteSection.innerHTML = 'Du har inte skapat några anteckningar ännu';
         seeNoteWrapper.appendChild(noNoteSection);
         
       }

      //But if the user has published notes we will print them out one by one :)

       notes.forEach((note: Note, i: number)=> {      

        //Create the noteSection
        const noteSection: HTMLElement = document.createElement('section');
        noteSection.classList.add(`noteDiv${i}`);
        noteSection.innerHTML = `box${i}`;
        seeNoteWrapper.appendChild(noteSection);

        //Create the div for the date
        const theDate: HTMLDivElement = document.createElement("div");
        theDate.classList.add("theDate", `${i}`);
        theDate.innerHTML = note.createdAt?.toString();
        noteSection.appendChild(theDate);

        //Create the div for the Title
        const theTitle: HTMLDivElement = document.createElement('div');
        theTitle.classList.add('thTitle', `${i}`);
        theTitle.innerHTML = note.title;
        noteSection.appendChild(theTitle);

        //Create the div for the note
        const theNote: HTMLDivElement = document.createElement('div');
        theNote.classList.add('theNote', `${i}`);
        theNote.innerHTML = note.note;
        noteSection.appendChild(theNote);

        //A box for the heart and the signature
        const signatureDivBox:HTMLDivElement = document.createElement('div');
        signatureDivBox.classList.add('signatureDivBox', `${i}`);
        noteSection.appendChild(signatureDivBox);

        //Create the div for the heart-symbol
        const theHeartSymbol: HTMLImageElement = document.createElement("img");
        theHeartSymbol.classList.add("theHeartSymbol", `${i}`);
        theHeartSymbol.src = "./src/img/icon_heart.png";
        signatureDivBox.appendChild(theHeartSymbol);

        //Create the div for the usernam
        const theUsername: HTMLDivElement = document.createElement('div');
        theUsername.classList.add('theUsername', `${i}`);
        theUsername.innerHTML = note.username;
        signatureDivBox.appendChild(theUsername);

        //Create the updateButton
        const updateNoteButton:HTMLButtonElement = document.createElement('button');
        updateNoteButton.classList.add('updateNoteButton', `${i}`);
        updateNoteButton.innerHTML = 'Updatera';
        noteSection.appendChild(updateNoteButton);

         //Create the deleteButton
         const deleteButton:HTMLButtonElement = document.createElement('button');
         deleteButton.classList.add('deleteButton', `${i}`);
         deleteButton.innerHTML = 'Ta bort';
         noteSection.appendChild(deleteButton);


         //When click on the updateButton
         updateNoteButton.addEventListener('click', () => {

         });


         //When click on the deleteButton
         deleteButton.addEventListener('click', () => {
          console.log('Du klickade på deletknappen för note nr: ' + `${i}. ` + 'Med unikt id: ' + note.id);
           //Call the API_DELETE function to delete the message
           API_DELETE(note.id);
           
           seeNoteWrapper.remove();
           seeNotes(username);

         });
       });


   })
   .catch(error => {
       console.error('Ett fel uppstod vid hämtning av anteckningar.');
   })

//When click on the backButton to go back to seeNote page
backButton.addEventListener('click', () => {
         
    //get access to the writeNoteWrapper
    const writeNoteWrapper:HTMLDivElement = document.querySelector('.writeNoteWrapper');

    if (writeNoteWrapper.style.display = "none") {
       writeNoteWrapper.style.display = "block";
     }

     //To make the previous created elements disappear.
     writeNoteWrapper.remove();
       
     //Makes the seeNoteWrapper "Dissappear"
     seeNoteWrapper.style.display = "none";
     
     

       writeNote(username);
    });
   
   
};