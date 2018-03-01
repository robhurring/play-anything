import { element } from "deku";
import styles from "../main.css";

import Stats from "./Stats";
import Player from "./player/Player";
import Search from "./search/Search";

const TITLE = "Play Anything";

function render({ props, context }) {
  const { system } = context;

  console.log('system', system);

  let content = "";
  if (system.online) {
    content = (
      <div>
        <Player />
        <Search />
      </div>
    );
  } else {
    content = <div>Offline</div>;
  }

  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div class="navbar-brand">{TITLE}</div>
        </nav>
      </header>

      <main class="container">{content}</main>

      <footer class="footer">
        <Stats />
      </footer>
    </div>
  );
}

export default {
  render
};
