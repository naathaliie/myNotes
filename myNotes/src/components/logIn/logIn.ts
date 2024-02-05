//Create the look on the "Log in" window
//Wxport is needed to be able to reach it from main.ts
export function logIn(){
    //Get access to the mainElement (created in main.ts)
    const mainEl: HTMLElement | null = document.querySelector('.main');

    //Create a mainWrapper
    const mainWrapper: HTMLDivElement = document.createElement('div');
    mainWrapper.classList.add('mainWrapper');
    mainEl?.appendChild(mainWrapper);

    //Create a box for the input-field and its lable
    const inputFormEl: HTMLFormElement = document.createElement('form');
    inputFormEl.classList.add('inputForm');
    mainWrapper?.appendChild(inputFormEl);

    //Create the lable and the input
    const userNameLable: HTMLLabelElement = document.createElement('label');
    userNameLable.classList.add('userNameLable');
    userNameLable.setAttribute('for', 'fname');
    userNameLable.innerHTML = "Användarnamn";
    inputFormEl.appendChild(userNameLable);

    const userNameInput: HTMLInputElement = document.createElement('input');
    userNameInput.classList.add('userNameInput');
    userNameInput.setAttribute('type','text');
    userNameInput.setAttribute('id','fname');
    userNameInput.setAttribute('name','fname');
    userNameInput.setAttribute('placeholder', 'Skriv in ditt användarnamn...');
    inputFormEl.appendChild(userNameInput);

    //Create the logIn Button
    const logInButton: HTMLButtonElement = document.createElement('button');
    logInButton.classList.add('logInButton');
    logInButton.innerHTML = 'Logga in';
    mainWrapper?.appendChild(logInButton);

    console.log("Du är inne i logIn funktionen");

};

