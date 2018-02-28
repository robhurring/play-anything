import { element } from "deku";
import { searchTracks } from "../../actions/search";

import SearchForm from "./SearchForm";
import SearchResult from "./SearchResult";

function render({ props, dispatch, context }) {
  const { search } = context;

  const results = search.results.map(track => {
    return (
      <li class="list-group-item">
        <SearchResult track={track} />
      </li>
    );
  });

  return (
    <div class="card">
      <div class="card-header">
        <SearchForm onSubmit={searchTracks(dispatch)} />
      </div>
      <ul class="list-group list-group-flush">
        {results}
      </ul>
    </div>
  );
}

export default {
  render
};
