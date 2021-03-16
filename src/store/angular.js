import axios from 'axios';

//ACTION TYPES
const GET_ANGULAR_FORKS = 'GET_ANGULAR_FORKS';
const GET_ANGULAR_STARS = 'GET_ANGULAR_STARS';
const GET_ANGULAR_ISSUES = 'GET_ANGULAR_ISSUES';

//ACTION CREATORS
const getAngularForks = (forks) => ({ type: GET_ANGULAR_FORKS, forks });
const getAngularStars = (stars) => ({ type: GET_ANGULAR_STARS, stars });
const getAngularIssues = (issues) => ({ type: GET_ANGULAR_ISSUES, issues });

//THUNKS
export function getAngularForksStarsIssuesThunk() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=user%3Aangular+repo%3Aangular.js+angular.js`
      );
      dispatch(getAngularForks(data.items[0].forks));
      dispatch(getAngularStars(data.items[0].watchers));
      dispatch(getAngularIssues(data.items[0].open_issues));
    } catch (err) {
      console.error(err.message);
    }
  };
}

//INITIAL STATE
const initialState = {
  name: 'angular',
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function angular(state = initialState, action) {
  switch (action.type) {
    case GET_ANGULAR_FORKS:
      return { ...state, forks: action.forks };
    case GET_ANGULAR_STARS:
      return { ...state, stars: action.stars };
    case GET_ANGULAR_ISSUES:
      return { ...state, issues: action.issues };
    default:
      return state;
  }
}
