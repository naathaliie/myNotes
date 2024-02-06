import { getApi } from "../../api/fetchApi";

/* 1: Skapa laouten för sidan. 
   2: Klickar man på knappen "Se tidigare anteckningar" skall användarnamnet följa med
   som parameter vid functionsanropet på "seeNotes" för att kunna visa alla anteckningar som användaren skrivit.
   Har användaren inte skrivit några så????
   3: Klickar användaren på knappen publicera skall anteckningen pushas till APIet och användaren skall hamna på seeNotes
   sidan där den senast skapade anteckningar hamnar överst.*/

export function writeNote(username: string){
    
    //Get access to the mainElement (created in main.ts)
    const mainEl: HTMLElement | null = document.querySelector('.main');

    //Create a writeNoteWrapper
    const writeNoteWrapper: HTMLDivElement = document.createElement('div');
    writeNoteWrapper.classList.add('writeNoteWrapper');
    mainEl?.appendChild(writeNoteWrapper);

    //Create the seePrevious Button
    const seePreviousButton: HTMLButtonElement = document.createElement('button');
    seePreviousButton.classList.add('seePreviousButton');
    seePreviousButton.innerHTML = 'Se tidigare anteckningar';
    writeNoteWrapper?.appendChild(seePreviousButton);

    //Create the noteBox
    const noteBox: HTMLElement = document.createElement('section')
    noteBox.classList.add('noteBox');
    writeNoteWrapper.appendChild(noteBox);

    //Create the publish Button
    const publishButton: HTMLButtonElement = document.createElement('button');
    publishButton.classList.add('publishButton');
    publishButton.innerHTML = 'Publicera';
    writeNoteWrapper?.appendChild(publishButton);

};