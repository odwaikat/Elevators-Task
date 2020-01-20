import React, {Component} from 'react';
import './App.css';
import Home from './containers/home/container'

class App extends Component {
	render() {
		return (
			<div className="App container-sm">
        <header>
          <h1> Elevators Task</h1>
        </header>
				<main className="main-content">
					<Home/>
				</main>
			</div>
		);
  }
}

export default App;
