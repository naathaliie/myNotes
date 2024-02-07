//Function for when the user wants to publish a new note
import { BASE_URL } from "../api/apiURL";
import { Note } from "../interfaces/interface";

export async function API_POST(noteInfo: Note) {
  //The BASE_URL + the endpoints needed   
  let postAPI = BASE_URL + "/api" + "/notes";
  
  //Collect the requestoptions in a own object
  const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(noteInfo)
   };

   //The try/catch, if there is any errors
   try {
    const response = await fetch(postAPI, requestOptions);
    const responseData = await response.json();
    console.log('Svar från server: ', responseData);
    
   } catch (error) {
    console.error('Ett fel uppstod: ', error);
    throw error;
   } 
};






 