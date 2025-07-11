/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

//  default set games to all games in the GAMES_JSON array

// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);
// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let game of games) {
    // call the function to add each game to the page
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name} image " />
            <h2>${game.name}</h2> 
            <p>${game.description}</p>
        `;
    gamesContainer.appendChild(gameCard);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
  return total + game.backers;
}, 0);
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`; // set the inner HTML using a template literal and toLocaleString to get a number with commas
// set the inner HTML using a template literal and toLocaleString to get a number with commas

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`; // set the inner HTML using a template literal and toLocaleString to get
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames.toLocaleString()}`; // set the inner HTML
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
  console.log(unfundedGames);

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal

  const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  console.log(fundedGames);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document
  .getElementById("unfunded-btn")
  .addEventListener("click", filterUnfundedOnly);
const fundedBtn = document
  .getElementById("funded-btn")
  .addEventListener("click", filterFundedOnly);
const allBtn = document
  .getElementById("all-btn")
  .addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(
  (game) => game.pledged < game.goal
).length;
const totalAmount = GAMES_JSON.reduce((total, game) => {
  return total + game.pledged;
}, 0);
// create a string that explains the number of unfunded games using the ternary operator
const summaryString = `<p>We have a total of ${
  GAMES_JSON.length
} games, with a total of $${totalAmount.toLocaleString()} pledged. Out of these, ${unfundedGamesCount} games are still unfunded.</p>`;
// create a new DOM element containing the template string and append it to the description container
console.log(summaryString);

const summaryElement = document.createElement("p");
summaryElement.innerHTML = summaryString;
descriptionContainer.appendChild(summaryElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [topGame, runnerUpGame] = sortedGames;
const topElement = firstGameContainer.appendChild(document.createElement("p"));

const runnerElement = secondGameContainer.appendChild(
  document.createElement("p")
); // create a new paragraph element to hold the name of the top pledge game

topElement.innerHTML = `
    <p>${topGame.name}</p>
`;

runnerElement.innerHTML = `
    <p>${runnerUpGame.name}</p>
    `;

const statsCard = document.getElementsByClassName("stats-card");
