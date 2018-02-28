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
      return res;
    });
  }

  search(term) {
    const query = Api.buildQuery({
      q: term
    });

    return fetch(`/player/search?${query}`).then(res => {
      return res.json();
    });
  }

  static buildQuery(params) {
    return Object.keys(params)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
  }
}
