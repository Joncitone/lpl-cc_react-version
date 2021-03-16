import './App.css';

function App() {
  let codeText = '< coding challenge />';
  return (
    <div className="App">
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
              <tr id="row-0">
                <td>React</td>
                <td id="react-score">score</td>
                <td id="react-forks">forks</td>
                <td id="react-stars">stars</td>
                <td id="react-issues">issues</td>
              </tr>
              <tr id="row-1">
                <td>Angular</td>
                <td id="angular-score">score</td>
                <td id="angular-forks">forks</td>
                <td id="angular-stars">stars</td>
                <td id="angular-issues">issues</td>
              </tr>
              <tr id="row-2">
                <td>Ember</td>
                <td id="ember-score">score</td>
                <td id="ember-forks">forks</td>
                <td id="ember-stars">stars</td>
                <td id="ember-issues">issues</td>
              </tr>
              <tr id="row-3">
                <td>Vue</td>
                <td id="vue-score">score</td>
                <td id="vue-forks">forks</td>
                <td id="vue-stars">stars</td>
                <td id="vue-issues">issues</td>
              </tr>
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
}

export default App;
