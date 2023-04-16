const form : HTMLFormElement = document.querySelector('#defineform')!;

form.onsubmit = () => {
  //Form data
  const formData = new FormData(form);

  //Get user input
  const text = formData.get('defineword') as string;

  const defLists : HTMLUListElement = document.querySelector(".list-unstyled")!;

  //API call 
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)

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
    data.forEach((entry: any) => {
      // Create a new list item for each entry
      const listItem = document.createElement("li");

      // Add the phonetic pronunciation if it exists
      if (entry.phonetics && entry.phonetics[0]?.text) {
        const phonetic = document.createElement("span");
        phonetic.classList.add("phonetic");
        phonetic.textContent = `/${entry.phonetics[0].text}/ `;
        listItem.appendChild(phonetic);
      }

      // Add the origin if it exists
      if (entry.origin) {
        const origin = document.createElement("span");
        origin.classList.add("origin");
        origin.textContent = `(${entry.origin}) `;
        listItem.appendChild(origin);
      }

      // Add the part of speech and definition(s)
      const partOfSpeech = document.createElement("strong");
      partOfSpeech.textContent = `${entry.meanings[0].partOfSpeech}: `;
      listItem.appendChild(partOfSpeech);

      const definitions = document.createElement("span");
      definitions.innerHTML = `${entry.meanings.map((meaning: any) => meaning.definitions[0].definition).join("; ")}`;
      listItem.appendChild(definitions);

      // Add the list item to the definitions list
      definitionsList.appendChild(listItem);
    });

    //Add heading to page
    defLists?.insertAdjacentElement("beforeend", heading);
    //Add definitions to page
    defLists?.insertAdjacentElement("beforeend", definitionsList);

  });

  //Prevent page from reloading
  return false;
};
