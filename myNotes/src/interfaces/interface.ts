
//Interface for POST to the api
export interface Note{
    id?: string;
    username: string;
    title: string;
    note: string;
    createdAt?: string;
}

//Interface for PUT (update) a note in the api
//Kanske skall lägga till att vi även kan ändra titel??
export interface updateNote{
    note: string;
}