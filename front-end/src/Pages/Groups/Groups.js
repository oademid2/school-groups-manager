import './Groups.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import ManageGroups from './ManageGroups';
import FindGroup from './FindGroup';




function Groups() {
  return (

    <div className="groups mobile-root">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div>
        <Router>

          <div class="groups-topnav">
            <Link to="/groups/manage" > <i class="fa my-nav-icon" >&#xf0a2;</i></Link>
            <Link to="/groups/manage" > <i class="fa fa-group my-nav-icon" ></i></Link>
            <Link to="/groups/find" > <i class="fa my-nav-icon">&#xf002;</i></Link>
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