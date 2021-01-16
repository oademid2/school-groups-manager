import './Home.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

function Home() {
  return (
    <div className="home mobile-root">
        home page
        - view prioritized tasks
        - view task
        - update task
    </div>
  );
}

export default Home;