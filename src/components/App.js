import { element } from "deku";
import Stats from "./Stats.js";
import Player from "./player/Player.js";
import styles from "../main.css";

const TITLE = "Play Anything";

function render({ props }) {
  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div class="navbar-brand">
            {TITLE}
          </div>
        </nav>
      </header>

      <main class="container">
        <Player />
      </main>

      <footer class="footer">
        <Stats />
      </footer>
    </div>
  );
}

export default {
  render
};
