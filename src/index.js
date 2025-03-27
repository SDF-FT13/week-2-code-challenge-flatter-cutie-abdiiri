const baseURL = "http://localhost:3001/characters";

fetch(baseURL)
  .then((response) => response.json())
  .then((characters) => {
    const characterBar = document.getElementById("character-bar");

    characterBar.innerHTML = "";

    characters.forEach((character) => {

      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");

      const characterName = document.createElement("span");
      characterName.innerHTML = character.name;

      const characterImage = document.createElement("img");
      characterImage.src = character.image;
      characterImage.alt = character.name; 

      characterDiv.addEventListener("click", () => {
        showCharacterDetails(character);
      });

  
      characterDiv.appendChild(characterName);
      characterDiv.appendChild(characterImage);

      characterBar.appendChild(characterDiv);
    });
  })
  .catch((error) => console.error("Error fetching characters:", error));

function showCharacterDetails(character) {
  const detailedInfo = document.getElementById("detailed-info");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const voteCount = document.getElementById("vote-count");

  characterName.innerHTML = character.name;
  characterImage.src = character.image;
  characterImage.alt = character.name;
  voteCount.innerHTML = character.votes;

  detailedInfo.classList.add("active");

  const voteForm = document.getElementById("votes-form");
  voteForm.onsubmit = (event) => {
    event.preventDefault();
    const votes = parseInt(document.getElementById("votes").value) || 0;
    character.votes += votes;
    voteCount.innerHTML = character.votes;

    document.getElementById("votes").value = "";
  };

  const resetBtn = document.getElementById("reset-btn");
  resetBtn.onclick = () => {
    character.votes = 0;
    voteCount.innerHTML = character.votes;
  };
}
