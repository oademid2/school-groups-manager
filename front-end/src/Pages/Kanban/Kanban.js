import './Kanban.css';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


function Kanban() {
  return (
    <div className="kanban mobile-root">
        kanban page
        - view to-do
        - view doing
        - view done
        - view task
        - update task
    </div>
  );
}

export default Kanban;