//Function to deleta a written note 
import { BASE_URL } from "../api/apiURL";

export async function API_DELETE(id: string){
    console.log('Du är inne i funktionen API_DELETE!');

    //The BASE_URL + the endpoints needed   
  let deleteAPI = BASE_URL + "/api" + "/notes" + `/${id}`;
  
  //Collect the requestoptions in a own object
  const requestOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
  };

  try{
    const response = await fetch(deleteAPI, requestOptions);
    const responseData = await response.json();
    console.log('Svar från server: ', responseData);
  }

  catch (error) {
    console.error('Ett fel uppstod', error);
    throw error;
  }
};