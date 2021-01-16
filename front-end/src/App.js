
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home.js'
import Kanban from './Pages/Kanban.js'
import Groups from './Pages/Groups.js'


function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css"></link>
      <header className="App-header">
        
        <div class="mobile-root" >
       
          <Router>

            <ul className="app-nav-bar">
              <li className="app-nav-bar"><Link to="/kanban">kanban</Link></li>
              <li className="app-nav-bar"><Link to="/groups">groups</Link></li>
              <li className="app-nav-bar"><Link to="/">home</Link></li>
            </ul>

            <Switch>
              <Route path='/kanban' component={Kanban}/>
              <Route path='/groups' component={Groups}/>
              <Route path='/' component={HomePage}/>
            </Switch>

        </Router>

        </div>

      </header>
    </div>
  );
}

export default App;

/* Temporary commented out 
      <Route path='/kanban' component={}/>
          <Route path='/groups' component={}/>


*/
