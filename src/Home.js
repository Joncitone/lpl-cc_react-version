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

  const [scores, setScores] = useState([
    { name: 'react', score: 0 },
    { name: 'angular', score: 0 },
    { name: 'ember', score: 0 },
    { name: 'vue', score: 0 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');

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

  useEffect(() => {
    const scoreVals = frameworks.map((frmwrk) => {
      return {
        name: frmwrk.name,
        score:
          Math.round(frmwrk.forks / 1000) +
          Math.round(frmwrk.stars / 10000) +
          Math.round(frmwrk.issues / 1000),
      };
    });
    setScores([...scoreVals]);
  }, [frameworks]);

  function sortByCondition(toggle, condition) {
    let sortedFrameworks;

    if (condition === 'score') {
      const sortedScores = scores.sort((a, b) => {
        return toggle
          ? b[condition] - a[condition]
          : a[condition] - b[condition];
      });
      // sort frameworks in same order as sorted array
      sortedFrameworks = [
        frameworks.find((f) => f.name === sortedScores[0].name),
        frameworks.find((f) => f.name === sortedScores[1].name),
        frameworks.find((f) => f.name === sortedScores[2].name),
        frameworks.find((f) => f.name === sortedScores[3].name),
      ];
    } else {
      sortedFrameworks = frameworks.sort((a, b) => {
        return toggle
          ? b[condition] - a[condition]
          : a[condition] - b[condition];
      });
    }
    setFrameworks([...sortedFrameworks]);
  }

  function handleClick(category) {
    const prevToggle = toggles[category];
    setToggles({
      ...toggles,
      [category]: !prevToggle,
    });

    setSelectedCategory(category);

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
                <th
                  className={
                    selectedCategory === 'score'
                      ? 'selected category'
                      : 'category'
                  }
                  onClick={() => handleClick('score')}
                >
                  {' '}
                  Score
                  {selectedCategory === 'score' && !toggles.score ? (
                    <> &#9660;</>
                  ) : (
                    ''
                  )}
                  {selectedCategory === 'score' && toggles.score ? (
                    <> &#9650;</>
                  ) : (
                    ''
                  )}
                </th>
                <th
                  className={
                    selectedCategory === 'forks'
                      ? 'selected category'
                      : 'category'
                  }
                  onClick={() => handleClick('forks')}
                >
                  Forks
                  {selectedCategory === 'forks' && !toggles.forks ? (
                    <> &#9660;</>
                  ) : (
                    ''
                  )}
                  {selectedCategory === 'forks' && toggles.forks ? (
                    <> &#9650;</>
                  ) : (
                    ''
                  )}
                </th>
                <th
                  className={
                    selectedCategory === 'stars'
                      ? 'selected category'
                      : 'category'
                  }
                  onClick={() => handleClick('stars')}
                >
                  Stars
                  {selectedCategory === 'stars' && !toggles.stars ? (
                    <> &#9660;</>
                  ) : (
                    ''
                  )}
                  {selectedCategory === 'stars' && toggles.stars ? (
                    <> &#9650;</>
                  ) : (
                    ''
                  )}
                </th>
                <th
                  className={
                    selectedCategory === 'issues'
                      ? 'selected category'
                      : 'category'
                  }
                  onClick={() => handleClick('issues')}
                >
                  Issues (open)
                  {selectedCategory === 'issues' && !toggles.issues ? (
                    <> &#9660;</>
                  ) : (
                    ''
                  )}
                  {selectedCategory === 'issues' && toggles.issues ? (
                    <> &#9650;</>
                  ) : (
                    ''
                  )}
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
