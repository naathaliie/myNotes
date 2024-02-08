/* //Function to the GET a specific posted notes from the specific username
export async function API_GET_UPDATE(id: string){
    console.log('Du är inne i funktionen API_GET_UPDATE');

    const response = await fetch(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${id}`);

    if (!response.ok) {
        throw new Error('Det gick inte att få ett response');
    }

    const data = await response.json();
      console.log('Detta är datan vi får ut', data.notes);
       return await data.notes;
     
}; */