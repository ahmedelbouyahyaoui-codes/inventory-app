import { useEffect, useState } from "react";

import api from "./services/api";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {

  const [products, setProducts] = useState([]);

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleEdit = (product) => {

    setEditingProduct(product);

  };

  const clearEdit = () => {

    setEditingProduct(null);

  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 shadow">

        <h1 className="text-3xl font-bold">
          Inventory Dashboard
        </h1>

      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <ProductForm
            refreshProducts={fetchProducts}
            editingProduct={editingProduct}
            clearEdit={clearEdit}
          />

        </div>

        {/* Product List Card */}
        <div className="bg-white rounded-xl shadow p-6">

          <ProductList
            products={products}
            refreshProducts={fetchProducts}
            onEdit={handleEdit}
          />

        </div>

      </div>

    </div>
  );
}

export default App;