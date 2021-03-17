import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getReactForksStarsIssuesThunk,
  getAngularForksStarsIssuesThunk,
  getEmberForksStarsIssuesThunk,
  getVueForksStarsIssuesThunk,
} from './store/index.js';

const Home = (props) => {
  const {
    react,
    angular,
    ember,
    vue,
    getReactForksStarsIssues,
    getAngularForksStarsIssues,
    getEmberForksStarsIssues,
    getVueForksStarsIssues,
  } = props;

  const codeText = '< coding challenge />';

  const [toggles, setToggles] = useState({
    score: true,
    forks: true,
    stars: true,
    issues: true,
  });

  // const [frameworks, setFrameworks] = useState([
  //   { name: 'react', forks: 33184, stars: 100, issues: 741, score: 45 },
  //   { name: 'angular', forks: 22586, stars: 2000, issues: 439, score: 33 },
  //   { name: 'ember', forks: 25456, stars: 50, issues: 3000, score: 11 },
  //   { name: 'vue', forks: 30000, stars: 180000, issues: 550, score: 40 },
  // ]);

  const [frameworks, setFrameworks] = useState([react, angular, ember, vue]);

  useEffect(() => {
    //initial API call
    getReactForksStarsIssues();
    getAngularForksStarsIssues();
    getEmberForksStarsIssues();
    getVueForksStarsIssues();

    //initial sorting based on score
    setTimeout(() => {
      sortByCondition(true, 'score');
    }, 3000);
  }, []);

  useEffect(() => {}, [frameworks]);

  function sortByCondition(toggle, condition) {
    const sortedFrameworks = frameworks.sort((a, b) => {
      return toggle ? b[condition] - a[condition] : a[condition] - b[condition];
    });

    console.log(frameworks);
    setFrameworks([...sortedFrameworks]);
  }

  function handleClick(category) {
    const prevToggle = toggles[category];
    setToggles({
      ...toggles,
      [category]: !prevToggle,
    });

    sortByCondition(toggles[category], category);
  }

  return (
    <div>
      <header>
        <div id="home-page-header">
          <p>
            <b>LaunchPad Lab</b>
          </p>
          <p id="code-text">{codeText}</p>
        </div>
      </header>
      <br />
      <main>
        <div>
          <table id="table-container">
            <thead>
              <tr>
                <th>Framework</th>
                <th className="category" onClick={() => handleClick('score')}>
                  Score
                </th>
                <th className="category" onClick={() => handleClick('forks')}>
                  Forks
                </th>
                <th className="category" onClick={() => handleClick('stars')}>
                  Stars
                </th>
                <th className="category" onClick={() => handleClick('issues')}>
                  Issues (open)
                </th>
              </tr>
            </thead>
            <tbody>
              {frameworks &&
                frameworks.map((framework, index) => (
                  <tr key={index}>
                    <td>
                      {framework.name[0].toUpperCase() +
                        framework.name.slice(1)}
                    </td>
                    <td>
                      {Math.round(framework.forks / 1000) +
                        Math.round(framework.stars / 10000) +
                        Math.round(framework.issues / 1000)}
                    </td>
                    <td>{framework.forks}</td>
                    <td>{framework.stars}</td>
                    <td>{framework.issues}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
      <br />
      <footer>
        <p>made with React by Jonathan Arreola</p>
      </footer>
      <script type="module" src="js/main.js"></script>
    </div>
  );
};
const mapState = (state) => {
  return {
    react: state.react,
    angular: state.angular,
    ember: state.ember,
    vue: state.vue,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getReactForksStarsIssues: () => dispatch(getReactForksStarsIssuesThunk()),
    getAngularForksStarsIssues: () =>
      dispatch(getAngularForksStarsIssuesThunk()),
    getEmberForksStarsIssues: () => dispatch(getEmberForksStarsIssuesThunk()),
    getVueForksStarsIssues: () => dispatch(getVueForksStarsIssuesThunk()),
  };
};

export default connect(mapState, mapDispatch)(Home);

/**
 * PROP TYPES
 */
Home.propTypes = {
  react: PropTypes.object.isRequired,
  angular: PropTypes.object.isRequired,
  ember: PropTypes.object.isRequired,
  vue: PropTypes.object.isRequired,
};
