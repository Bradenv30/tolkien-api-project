import React, { useEffect } from "react";
import "./App.css";
import "./styles.css";

function App() {
  useEffect(() => {
    // This fetch call will hit the /test endpoint on the backend
    fetch("/book")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("Error accessing backend:", error);
      });
  }, []);
  return (
    <div className="App">
      <div className="quote">
        <blockquote>
          "There is some good in this world, Mr. Frodo, and it's worth fighting
          for." - Samwise Gamgee
        </blockquote>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Explore Middle Earth"
          id="search-input"
        />
      </div>
      <nav>
        <ul>
          <li>
            <a href="#books">Books</a>
          </li>
          <li>
            <a href="#characters">Characters</a>
          </li>
          <li>
            <a href="#movies">Movies</a>
          </li>
          <li>
            <a href="#quotes">Quotes</a>
          </li>
          <li>
            <a href="#chapters">Chapters</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
