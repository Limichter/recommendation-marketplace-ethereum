import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {

	render() {
		return (
			<div id="content" className="col-md-12 d-flex justify-content-center text-center align-items-center">
				<div className="col-md-4 d-flex flex-column">
					<h2>What do you want?</h2>
					<Link to="/rating"><button className="btn btn-light btn-lg mt-4" style={{minWidth: '100px'}}>Rating</button></Link>
					<span>or</span>
					<Link to="/all"><button className="btn btn-info btn-lg" style={{minWidth: '100px'}}>All</button></Link>
					<span>or</span>
					<Link to="/list"><button className="btn btn-light btn-lg" style={{minWidth: '100px'}}>List</button></Link>
					<span>or</span>
					<Link to="/recommend"><button className="btn btn-info btn-lg" style={{minWidth: '100px'}}>Recommend</button></Link>
				</div>
			</div>
		);
	}
}

export default Main;
