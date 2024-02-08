//Function to PUT (update) a note in the api

import { updateNote } from "../interfaces/interface";

export async function API_PUT(updatednote: updateNote, userID: string) {
    console.log('Du är inne i API_PUT och kan nu uppdatera din angteckning med id: ' + userID);
    
    //The BASE_URL + endpoints needed
    let API = `https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${userID}`;

     //Collect the requestoptions in a own object
    const requestOptions = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatednote)
   };

    //The try/catch, if there is any errors
    try {
        const response = await fetch(API, requestOptions);
        const responseData = await response.json();
        console.log('Svar från server om du lyckades ändra din anteckning: ', responseData);
        
       } catch (error) {
        console.error('Ett fel uppstod: ', error);
        throw error;
       } 
};