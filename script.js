const cohort = "2304-FTB-ET-WEB-FT";
const baseURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}`;

const cards = document.getElementById("cards");
const currentRoster = [];

let allPlayers = [];
let selectedPlayer = undefined;

const fetchPlayers = async () => {
  try {
    let res = await fetch(`${baseURL}/players`);

    let data = await res.json();
    let players = data.data.players;
    console.log(players);

    return players;
  } catch (error) {
    console.log(error);
  }
};

const renderPlayers = async () => {
  let allPlayers = await fetchPlayers();
  try {
    for (let i = 0; i < allPlayers.length; i++) {
      let currentPlayerObject = allPlayers[i];
      cards.appendChild(createCards(currentPlayerObject));
    }
  } catch (error) {
    console.log(error);
  }
};

const renderRoster = () => {
  let rosterContainer = document.getElementById("roster-list");
  rosterContainer.innerHTML = "";
  try {
    for (let i = 0; i < currentRoster.length; i++) {
      let currentRosterObject = currentRoster[i];
      rosterContainer.appendChild(createCards(currentRosterObject));
    }
  } catch (error) {
    console.log(error);
  }
};

const createCards = (puppy) => {
  let playerCard = document.createElement("div");
  playerCard.className = "player-card";
  let nameBreed = document.createElement("div");
  nameBreed.className = "name-breed";
  let picture = document.createElement("div");
  picture.className = "image";

  ////////
  //PUPPY INFO
  ///////

  let name = document.createElement("h4");
  name.className = "name";
  name.innerText = puppy.name;

  let breed = document.createElement("h4");
  breed.className = "breed";
  breed.innerText = puppy.breed;

  let image = document.createElement("img");
  image.src = puppy.imageUrl;

  picture.appendChild(image);
  nameBreed.appendChild(name);
  nameBreed.appendChild(breed);

  playerCard.appendChild(nameBreed);
  playerCard.appendChild(picture);

  playerCard.addEventListener("click", () => {
    pickPuppy(puppy);
  });
  return playerCard;
};

const pickPuppy = (puppy) => {
  let html = `
<div class="selected-pup-display">
    <img id="pup-selected-img" src="${puppy.imageUrl}" />
      <h3>Name: ${puppy.name}</h3>
      <h3>Name: ${puppy.breed}</h3>
      <h3>Pup ID: ${puppy.id}</h3>
      <h3>Bench Status: ${puppy.status}</h3>
</div>`;

  let selectedPlayerElement = document.getElementById(
    "selected-player-content"
  );
  selectedPlayerElement.innerHTML = html;
  selectedPlayer = puppy;

  let button = document.createElement("button");

  if (currentRoster.includes(puppy)) {
    // display remove button
    button.innerText = "Remove from Roster";
    button.onclick = () => {
      removeFromRoster(puppy);
    };
  } else {
    button.innerText = "Add to Roster";
    button.onclick = () => {
      addToRoster(puppy);
    };
  }
  selectedPlayerElement.appendChild(button);
};

const addToRoster = (puppy) => {
  //onclick add to roster button - shoves to roster section
  currentRoster.push(puppy);
  console.log(currentRoster);
  pickPuppy(puppy);
  renderRoster();
};

const removeFromRoster = (puppy) => {
  let index = currentRoster.findIndex((element) => {
    if (element.id === puppy.id) {
      return true;
    }
    return false;
  });
  if (index !== false) {
    currentRoster.splice(index, 1);
  }
  console.log(currentRoster);

  pickPuppy(puppy);
  renderRoster();
};

renderPlayers();
