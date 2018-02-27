import fetch from "cross-fetch";

export default class Api {
  getStats() {
    return fetch("/stats").then(res => {
      return res.json();
    });
  }

  getPlayerStatus() {
    return fetch("/player/status").then(res => {
      return res.json();
    });
  }

  play(uri) {
    const payload = {
      context_uri: uri
    };

    const opts = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      credentials: "same-origin"
    };

    return fetch("/player/play", opts).then(res => {
      return res
    });
  }
}
