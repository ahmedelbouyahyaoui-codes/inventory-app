import { useState } from "react";
import api from "../services/api";

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", {
        name,
        quantity: Number(quantity),
        price: Number(price),
      });

      setName("");
      setQuantity("");
      setPrice("");

      onProductAdded();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Add Product
        </button>

      </form>
    </div>
  );
}

export default ProductForm;