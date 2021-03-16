import axios from 'axios';

//ACTION TYPES
const GET_VUE_FORKS = 'GET_VUE_FORKS';
const GET_VUE_STARS = 'GET_VUE_STARS';
const GET_VUE_ISSUES = 'GET_VUE_ISSUES';

//ACTION CREATORS
const getVueForks = (forks) => ({ type: GET_VUE_FORKS, forks });
const getVueStars = (stars) => ({ type: GET_VUE_STARS, stars });
const getVueIssues = (issues) => ({ type: GET_VUE_ISSUES, issues });

//THUNKS
export function getVueForksStarsIssuesThunk() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=user%3Avuejs+repo%3Avue+vue`
      );
      dispatch(getVueForks(data.items[0].forks));
      dispatch(getVueStars(data.items[0].watchers));
      dispatch(getVueIssues(data.items[0].open_issues));
    } catch (err) {
      console.error(err.message);
    }
  };
}

//INITIAL STATE
const initialState = {
  name: 'vue',
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function vue(state = initialState, action) {
  switch (action.type) {
    case GET_VUE_FORKS:
      return { ...state, forks: action.forks };
    case GET_VUE_STARS:
      return { ...state, stars: action.stars };
    case GET_VUE_ISSUES:
      return { ...state, issues: action.issues };

    default:
      return state;
  }
}
