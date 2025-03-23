document.addEventListener("DOMContentLoaded", () => {
  
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((characters) => {
      const characterBar = document.getElementById("character-bar");
      characters.forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.textContent = character.name;
        characterBar.appendChild(characterSpan);

        
        characterSpan.addEventListener("click", () =>
          showCharacterDetails(character)
        );
      });
    });

  
  function showCharacterDetails(character) {
    const detailedInfo = document.getElementById("detailed-info");
    detailedInfo.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}" />
      <p>Votes: <span id="votes">${character.votes}</span></p>
      <form id="votes-form">
        <input type="number" id="vote-input" placeholder="Add votes" />
        <button type="submit">Vote</button>
      </form>
    `;

    
    const voteForm = document.getElementById("votes-form");
    voteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addVotes(character.id);
    });
  }

  
  function addVotes(characterId) {
    const voteInput = document.getElementById("vote-input");
    const newVotes = parseInt(voteInput.value, 10);

    fetch(`http://localhost:3000/characters/${characterId}`)
      .then((response) => response.json())
      .then((character) => {
        const updatedVotes = character.votes + newVotes;
        fetch(`http://localhost:3000/characters/${characterId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ votes: updatedVotes }),
        }).then(() => {
          
            
          document.getElementById("votes").textContent = updatedVotes;
        });
      });
  }
});
