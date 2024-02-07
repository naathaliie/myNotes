//Function the GET all posted notes from the specific username
export async function API_GET(username: string){
    console.log('Du är inne i funktionen API_GET!');

    const response = await fetch(`https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/${username}`);

    if (!response.ok) {
        throw new Error('Det gick inte att få ett response');
    }

    const data = await response.json();
    console.log('Detta är datan vi får ut', data);
    
     
};