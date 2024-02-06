import { API_GET } from "../../api/apiGET";

export function seeNotes(username: string){
    console.log("Du är inne i seeNotes funktionen");
    
   //When entering this side we want to call the function for getting the notes frpn the API
   API_GET();

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
    

};