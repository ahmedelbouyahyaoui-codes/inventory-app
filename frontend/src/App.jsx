import { useEffect, useState } from "react";

import api from "./services/api";

import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {

  const [products, setProducts] = useState([]);

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

  return (
    <div>

      <h1>Inventory System</h1>

      <ProductForm onProductAdded={fetchProducts} />

      <hr />

      <ProductList products={products} />

    </div>
  );
}

export default App;