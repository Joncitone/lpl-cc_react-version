import axios from 'axios';

//ACTION TYPES
const GET_REACT_FORKS = 'GET_REACT_FORKS';
const GET_REACT_STARS = 'GET_REACT_STARS';
const GET_REACT_ISSUES = 'GET_REACT_ISSUES';

//ACTION CREATORS
const getReactForks = (forks) => ({ type: GET_REACT_FORKS, forks });
const getReactStars = (stars) => ({ type: GET_REACT_STARS, stars });
const getReactIssues = (issues) => ({ type: GET_REACT_ISSUES, issues });

//THUNKS
export function getReactForksStarsIssuesThunk() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=user%3Afacebook+repo%3Areact+react`
      );
      dispatch(getReactForks(data.items[0].forks));
      dispatch(getReactStars(data.items[0].watchers));
      dispatch(getReactIssues(data.items[0].open_issues));
    } catch (err) {
      console.error(err.message);
    }
  };
}

//INITIAL STATE
const initialState = {
  name: 'react',
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function react(state = initialState, action) {
  switch (action.type) {
    case GET_REACT_FORKS:
      return { ...state, forks: action.forks };
    case GET_REACT_STARS:
      return { ...state, stars: action.stars };
    case GET_REACT_ISSUES:
      return { ...state, issues: action.issues };

    default:
      return state;
  }
}
