"use strict";
// // Import stylesheets
// import './style.css';
// const form: HTMLFormElement = document.querySelector('#defineform')!;
// form.onsubmit = () => {
//   const formData = new FormData(form);
//   console.log(formData);
//   const text = formData.get('defineword') as string;
//   console.log(text);
//   return false; // prevent reload
// };
// get form from element html for reference and preform manipulation
const form = document.querySelector('#defineform');
form.onsubmit = () => {
    const formData = new FormData(form); // forma data from form
    const text = formData.get('defineword'); // get the word user input
    //for debugging
    //console.log(formData);
    //console.log(text);
    const defLists = document.querySelector(".list-unstyled");
    const p = document.createElement("li");
    p.textContent = "Hello, World!";
    defLists === null || defLists === void 0 ? void 0 : defLists.appendChild(p);
    // API call 
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + text)
        // cast response to be in json format???
        .then((Response) => Response.json())
        // get the data from API call and adding definitions to the web page
        .then((DataTransfer) => {
        console.log(DataTransfer);
    });
    return false; // prevent reload
};
//# sourceMappingURL=index.js.map