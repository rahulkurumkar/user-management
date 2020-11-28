import './App.css';
import { User } from './components/User/User';
import UserDetails from './components/User/UserDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
	return (
		<div>
			<h1 className="app-header">User Management</h1>
			<Router>
				<Route exact path="/" component={User} />
				<Route exact path="/user/:id" component={UserDetails} />
			</Router>
		</div>
	);
}

export default App;
