"use strict";
const form = document.querySelector('#defineform');
form.onsubmit = () => {
    //Form data
    const formData = new FormData(form);
    //Get user input
    const text = formData.get('defineword');
    const defLists = document.querySelector(".list-unstyled");
    //API call 
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + text)
        //Cast response to json
        .then((Response) => Response.json())
        //Get data from API and add definitions to web page
        .then((data) => {
        //Create new heading element
        const heading = document.createElement("h2");
        //Set heading text to word being defined
        heading.textContent = text;
        //Create new list for definitions
        const definitionsList = document.createElement("ul");
        //Add necessary class
        definitionsList.classList.add("list-unstyled");
        //This is where the magic happens
        for (let i = 0; i < data[0].meanings.length; i++) {
            const meaning = data[0].meanings[i].definitions[0].definition;
            const partOfSpeech = data[0].meanings[i].partOfSpeech;
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>${partOfSpeech}</strong>: ${meaning}`;
            //Add definition to list
            definitionsList.appendChild(listItem);
        }
        //Add heading to page
        defLists === null || defLists === void 0 ? void 0 : defLists.insertAdjacentElement("beforeend", heading);
        //Add definitions to page
        defLists === null || defLists === void 0 ? void 0 : defLists.insertAdjacentElement("beforeend", definitionsList);
    });
    //Prevent page from reloading
    return false;
};
//# sourceMappingURL=index.js.map