//Function for when the user wants to publish a new note
import { BASE_URL } from "../api/apiURL";
import { Note } from "../interfaces/interface";

export async function API_POST(noteInfo: Note) {
  //The BASE_URL + the querys? to reach correct...
  let postAPI = BASE_URL + "/api" + "/notes";

  try {
    //NOW finally we will try to post the things to the api
    let response = await fetch(postAPI, {
      method: "POST",
      body: JSON.stringify(noteInfo), //Remakes it into a JSON-object
      headers: {
        "Content-Type": "application/json", //Tells the server that what we are sending is a JSON-object
      },
    });

     //If the response is not ok, throw an Error
    if (!response.ok) {
        throw new Error('Fetch request failed with status: ' + response.status);
    }


  } catch (error) {
    //Handle errors occuring during the fetch-request
    console.error('An error occurred during fetch:');
  }
};

