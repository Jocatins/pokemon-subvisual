import { Link } from "react-router-dom";
import React from "react";

function Dashboard() {
	return (
		<>
			<div>Dashboard</div>
			<Link to="/about">About</Link>
		</>
	);
}

export default Dashboard;
