import axios from 'axios';

//ACTION TYPES
const GET_EMBER_FORKS = 'GET_EMBER_FORKS';
const GET_EMBER_STARS = 'GET_EMBER_STARS';
const GET_EMBER_ISSUES = 'GET_EMBER_ISSUES';

//ACTION CREATORS
const getEmberForks = (forks) => ({ type: GET_EMBER_FORKS, forks });
const getEmberStars = (stars) => ({ type: GET_EMBER_STARS, stars });
const getEmberIssues = (issues) => ({ type: GET_EMBER_ISSUES, issues });

//THUNKS
export function getEmberForksStarsIssuesThunk() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=user%3Aemberjs+repo%3Aember.js+ember.js`
      );
      dispatch(getEmberForks(data.items[0].forks));
      dispatch(getEmberStars(data.items[0].watchers));
      dispatch(getEmberIssues(data.items[0].open_issues));
    } catch (err) {
      console.error(err.message);
    }
  };
}

//INITIAL STATE
const initialState = {
  name: 'ember',
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function ember(state = initialState, action) {
  switch (action.type) {
    case GET_EMBER_FORKS:
      return { ...state, forks: action.forks };
    case GET_EMBER_STARS:
      return { ...state, stars: action.stars };
    case GET_EMBER_ISSUES:
      return { ...state, issues: action.issues };

    default:
      return state;
  }
}
