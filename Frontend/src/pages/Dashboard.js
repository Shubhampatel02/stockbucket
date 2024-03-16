import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";

function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [storesCount, setStoresCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const saleResponse = await fetch(`http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`);
      const saleData = await saleResponse.json();
      setSaleAmount(saleData.totalSaleAmount);

      const purchaseResponse = await fetch(`http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`);
      const purchaseData = await purchaseResponse.json();
      setPurchaseAmount(purchaseData.totalPurchaseAmount);

      const storesResponse = await fetch(`http://localhost:4000/api/store/get/${authContext.user}`);
      const storesData = await storesResponse.json();
      setStoresCount(storesData.length);

      const productsResponse = await fetch(`http://localhost:4000/api/product/get/${authContext.user}`);
      const productsData = await productsResponse.json();
      setProductsCount(productsData.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-2 lg:grid-cols-4 p-4">
      <DashboardCard title="Sales" value={`${saleAmount} Rs`} color="bg-green-500" />
      <DashboardCard title="Purchase" value={`${purchaseAmount} Rs`} color="bg-blue-500" />
      <DashboardCard title="Total Products" value={productsCount} color="bg-yellow-500" />
      <DashboardCard title="Total Stores" value={storesCount} color="bg-purple-500" />

      {/* Static design elements */}
      <div className="col-span-4 lg:col-span-2 bg-white rounded-lg border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory</h2>
        <p className="text-gray-700"></p>
      </div>
    </div>
  );
}

const DashboardCard = ({ title, value, color }) => (
  <article className={`flex flex-col gap-4 rounded-lg border border-gray-100 ${color} p-6`}>
    <strong className="block text-sm font-medium text-white">{title}</strong>
    <p><span className="text-2xl font-medium text-white">{value}</span></p>
  </article>
);

export default Dashboard;
