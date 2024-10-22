import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function ProductsData() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchProducts = async () => {
		try {
			const response = await fetch("https://fakestoreapi.com/products");
			const data = await response.json();
			console.log(data);
			setProducts(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-500"></div>
			</div>
		);
	}
	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-gray-700 font-medium">Products List</strong>
			{products.length === 0 ? (
				<div className="text-center text-gray-500 py-4">
					No products available.
				</div>
			) : (
				<div className="border-x border-gray-200 rounded-sm mt-3">
					<table className="w-full text-gray-700">
						<thead>
							<tr>
								<th>ID</th>
								<th>Category</th>
								<th>Price</th>
								<th>Description</th>
								<th>Rate</th>
								<th>Rate Count</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>
										<Link to={`/product/${product.id}`}>#{product.id}</Link>
									</td>

									<td>{product.category}</td>

									<td>{product.price}</td>
									<td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
										{product.description}
									</td>
									<td>{product.rating?.rate}</td>
									<td>{product.rating?.count}</td>
									<td className="whitespace-nowrap overflow-hidden text-ellipsis max-w-xs">
										{product.title}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
