import BuyerProfilePieChart from "../components/dashboard/BuyerProfilePieChart";
import DashboardStatsGrid from "../components/dashboard/DashboardStatsGrid";
import PopularProducts from "../components/dashboard/PopularProducts";
import React from "react";
import RecentOrders from "../components/dashboard/RecentOrders";
import TransactionChart from "../components/dashboard/TransactionChart";

function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div>
		</div>
	);
}

export default Dashboard;
