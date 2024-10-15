import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Layout from "./components/shared/Layout";
import Products from "./pages/Products";
import React from "react";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Dashboard />} />
					<Route path="/products" element={<Products />} />
					<Route />
					<Route path="/login" element={<div>This is login page</div>} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
