import './Groups.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import ManageGroups from './ManageGroups';
import FindGroup from './FindGroup';




function Groups() {
  return (
    <div className="groups mobile-root">
      
  
      <div>
      <Router>
      <div class="groups-topnav">


      <div class="groups-topnav-centered">
        <a href="" class="active">notifs</a>
        <Link to="/groups/manage" class="active"> manage</Link>
        <Link to="/groups/find" class="active"> find</Link>
      </div>
      </div>
        <Switch>
          <Route path='/groups/manage' component={ManageGroups}/>
          <Route path='/groups/find' component={FindGroup}/>
        </Switch>

    </Router>
        
      </div>
   
    </div>
  );
}

export default Groups;