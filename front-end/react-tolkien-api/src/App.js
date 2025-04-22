//import dependencies
import React, { useState } from "react";
import "./App.css";
import "./styles.css";

function App() {
  //useState hooks for state variables we will use
  const [searchInput, setSearchInput] = useState("");
  const [characters, setCharacters] = useState("");
  const [error, setError] = useState(null);
  const [hideHome, setHideHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");

  //handles characters search
  const handleCharacterSearch = () => {
    if (!searchInput.trim()) return; //prevents empty search

    //set State variables
    setCharacters([]);
    setHideHome(true);
    setLoading(true);
    setError(null);

    //make a fecth request to the backend server to find characters
    fetch(`/character?name=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        //Check for valid data, see if data is not empty, if data.docs exists, if it contains any items
        if (data && data.docs && data.docs.length > 0) {
          //filter results, case insensitive check between search bar input and API results
          const matchingCharacter = data.docs.filter((char) =>
            char.name.toLowerCase().includes(searchInput.toLowerCase())
          );
          //If nothing found, set error. If found, set results to matchingCharacter
          if (matchingCharacter.length === 0) {
            setError(`No characters found matching"${searchInput}".`);
          } else {
            setCharacters(matchingCharacter);
          }
        } else {
          setError(`No characters found matching"${searchInput}".`);
        }
      })
      .catch((err) => {
        console.error("Error fetching characters:", err);
        setError("Failed to fetch characters.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRandomQuote = () => {
    setLoading(true);
    setRandomQuote("");
    setHideHome(true);

    fetch("/quote")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.docs && data.docs.length > 0) {
          const quotes = data.docs;
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

          fetch(`/character?id=${randomQuote.character}`)
            .then((response) => response.json())
            .then((charData) => {
              if (charData && charData.docs && charData.docs.length > 0) {
                const characterName = charData.docs[0].name;
                setRandomQuote(`${randomQuote.dialog} - ${characterName}`);
              } else {
                setRandomQuote(`${randomQuote.dialog} - Unknown Character`);
              }
            })
            .catch((err) => {
              console.error("Error fetching character:", err);
              setRandomQuote("Failed to fetch character.");
            });
        } else {
          setRandomQuote("No quote found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching random quote:", err);
        setRandomQuote("Failed to fetch quote.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      {!hideHome && (
        <div className="homeLayout">
          <div className="quote">
            <blockquote>
              "There is some good in this world, Mr. Frodo, and it's worth
              fighting for." - Samwise Gamgee
            </blockquote>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Explore the Beings of Middle Earth..."
              id="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleCharacterSearch}>Search</button>
          </div>

          <nav>
            <ul>
              <li>
                <button onClick={handleRandomQuote} className="quote-button">
                  Generate a Random Quote!
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      {characters.length > 0 && !loading && (
        //Map characters in array and filter through), conditonally render
        <div className="results">
          <div className="character-results">
            {characters.map((char, index) => (
              <div key={index} className="character-card">
                <h2>{char.name}</h2>
                {char.race && (
                  <p>
                    <strong>Race:</strong> {char.race}
                  </p>
                )}
                {char.height && (
                  <p>
                    <strong>Height:</strong> {char.height}
                  </p>
                )}
                {char.birth && (
                  <p>
                    <strong>Birth:</strong> {char.birth}
                  </p>
                )}
                {char.death && (
                  <p>
                    <strong>Death:</strong> {char.death}
                  </p>
                )}
                {char.realm && (
                  <p>
                    <strong>Realm:</strong> {char.realm}
                  </p>
                )}
                {char.hair && (
                  <p>
                    <strong>Hair:</strong> {char.hair}
                  </p>
                )}
                {char.spouse && (
                  <p>
                    <strong>Spouse:</strong> {char.spouse}
                  </p>
                )}
                {char.wikiUrl && (
                  <p>
                    <a
                      href={char.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      More Info
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="no-results">
          <p>{error}</p>
        </div>
      )}

      {randomQuote && !loading && (
        <div className="random-quote">
          <blockquote>"{randomQuote}"</blockquote>
        </div>
      )}
    </div>
  );
}

//Want a button that will return you to home page to search again once you are on results or no results page
//Connect enter button with clicking search button
export default App;
