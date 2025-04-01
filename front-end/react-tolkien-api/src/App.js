import React, { useEffect, useState } from "react";
import "./App.css";
import "./styles.css";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [characters, setCharacters] = useState("");
  const [error, setError] = useState(null);
  const [hideHome, setHideHome] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCharacterSearch = () => {
    if (!searchInput.trim()) return;

    setCharacters([]);
    setHideHome(true);
    setLoading(true);

    fetch(`/character?name=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.docs && data.docs.length > 0) {
          const matchingCharacter = data.docs.filter((char) =>
            char.name.toLowerCase().includes(searchInput.toLowerCase())
          );
          setCharacters(matchingCharacter);
        } else {
          setCharacters([]);
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
                <a href="#quote-generator">Generate a Random Quote!</a>
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
    </div>
  );
}

export default App;
