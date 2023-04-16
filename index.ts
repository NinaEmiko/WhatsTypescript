const form : HTMLFormElement = document.querySelector('#defineform')!;

form.onsubmit = () => {
  const formData = new FormData(form); // form data
  const text = formData.get('defineword') as string; // get user input

  const defLists : HTMLUListElement = document.querySelector(".list-unstyled")!;

  // API call 
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+text)

  // cast response to json
  .then((Response) => Response.json())

  // get data from API and add definitions to web page
  .then((data) => {

    const heading = document.createElement("h2"); // create a new heading element
    heading.textContent = text; // set the heading text to the input word

    const definitionsList = document.createElement("ul"); // create a new list for the definitions
    definitionsList.classList.add("list-unstyled"); // add the necessary class
    for (let i = 0; i < data[0].meanings.length; i++) {
      const meaning = data[0].meanings[i].definitions[0].definition;
      const partOfSpeech = data[0].meanings[i].partOfSpeech;
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${partOfSpeech}</strong>: ${meaning}`;
      definitionsList.appendChild(listItem); // add the definition to the list
    }

    defLists?.insertAdjacentElement("beforeend", heading); // add the heading to the page
    defLists?.insertAdjacentElement("beforeend", definitionsList); // add the definitions to the page

  });

  return false; // prevent reload
};