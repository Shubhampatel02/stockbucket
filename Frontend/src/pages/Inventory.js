import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchProductsData();
    fetchSalesData();
  }, [updatePage]);

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of Search Products
  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching all stores data
  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  // Modal for Product UPDATE
  const updateProductModalSetting = (selectedProductData) => {
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  // Delete item
  const deleteItem = (id) => {
    fetch(`http://localhost:4000/api/product/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      })
      .catch((err) => console.log(err));
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center">
      <div className="flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-4 shadow-md">
          <span className="font-semibold text-gray-800">Overall Inventory</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-blue-100 rounded p-4">
              <span className="font-semibold text-blue-600">Total Products</span>
              <span className="font-semibold text-gray-600">{products.length}</span>
            </div>
            <div className="bg-yellow-100 rounded p-4">
              <span className="font-semibold text-yellow-600">Stores</span>
              <div className="flex justify-between mt-2">
                <span className="font-semibold text-gray-600">{stores.length}</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600">2000 Rs</span>
                  <span className="text-xs text-gray-500">Revenue</span>
                </div>
              </div>
            </div>
            <div className="bg-purple-100 rounded p-4">
              <span className="font-semibold text-purple-600">Top Selling</span>
              <div className="flex justify-between mt-2">
                <span className="font-semibold text-gray-600">5</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600">1500 Rs</span>
                  <span className="text-xs text-gray-500">Cost</span>
                </div>
              </div>
            </div>
            <div className="bg-red-100 rounded p-4">
              <span className="font-semibold text-red-600">Low Stocks</span>
              <div className="flex justify-between mt-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600">12</span>
                  <span className="text-xs text-gray-500">Ordered</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600">2</span>
                  <span className="text-xs text-gray-500">Not in Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
          <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
          />
        )}

        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 shadow-md">
          <div className="flex justify-between items-center p-4">
            <span className="font-semibold text-gray-800">Products</span>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  className="border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 rounded-md p-2 outline-none"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
                <img
                  alt="search-icon"
                  className="absolute right-3 top-2 w-4 h-4"
                  src={require("../assets/search-icon.png")}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={addProductModalSetting}
              >
                Add Product
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Products</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Manufacturer</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Stock</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Description</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Availability</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((element) => (
                <tr key={element._id}>
                  <td className="px-4 py-2 text-gray-900">{element.name}</td>
                  <td className="px-4 py-2 text-gray-700">{element.manufacturer}</td>
                  <td className="px-4 py-2 text-gray-700">{element.stock}</td>
                  <td className="px-4 py-2 text-gray-700">{element.description}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {element.stock > 0 ? "In Stock" : "Not in Stock"}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    <span className="text-green-700 cursor-pointer" onClick={() => updateProductModalSetting(element)}>
                      Edit
                    </span>{" "}
                    /{" "}
                    <span className="text-red-600 cursor-pointer" onClick={() => deleteItem(element._id)}>
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
