import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);
  const authContext = useContext(AuthContext);



  // Fetching all stores data
  const fetchData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      })
      .catch((err) => console.log(err));
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  const handleStoreAddition = (newStore) => {
    setAllStores([...stores, newStore]);
  };

  return (      
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className=" flex flex-col gap-5 w-11/12 border-2">
        <div className="flex justify-between">
          <span className="font-bold">Manage Store</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
            onClick={modalSetting}
          >
            Add Store
          </button>
        </div>
        {showModal && <AddStore handleStoreAddition={handleStoreAddition} />}
        <table>
          <thead>

        <tr>
          <th>Store name</th>
          <th>city</th>
          <th>Store Type</th>
        </tr>
        <tr>
        
        </tr>
          </thead>
          <tbody>
              {stores.map((element) => (
                <tr key={element}>
                  <td>
                    {element.name}
                  </td>
                  <td>
                    {element.city}
                  </td>
                  <td>
                    {element.category}
                  </td>
                </tr>
              ))}
            </tbody>
      </table>
      </div>  
    </div> 
    
  );           
}

export default Store;
