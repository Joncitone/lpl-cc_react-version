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
  const frameworks = [react, angular, ember, vue];

  // const toggles = {
  //   category: {
  //     score: false,
  //     forks: false,
  //     stars: false,
  //     issues: false,
  //   },
  //   switch(target) {
  //     const prevVal = this.category[target];

  //     this.category = {
  //       score: false,
  //       forks: false,
  //       stars: false,
  //       issues: false,
  //     };

  //     this.category[target] = !prevVal;
  //   },
  // };

  function sortByCondition(toggle, condition) {
    frameworks.sort((a, b) => {
      return toggle ? b[condition] - a[condition] : a[condition] - b[condition];
    });
  }

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
                <th id="framework-header">Framework</th>
                <th id="score-header">Score</th>
                <th id="forks-header">Forks</th>
                <th id="stars-header">Stars</th>
                <th id="issues-header">Issues (open)</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((framework, index) => (
                <tr key={index}>
                  <td>{framework.name}</td>
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
