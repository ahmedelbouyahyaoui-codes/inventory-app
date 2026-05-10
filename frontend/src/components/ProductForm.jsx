import { useEffect, useState } from "react";
import api from "../services/api";

function ProductForm({
  refreshProducts,
  editingProduct,
  clearEdit
}) {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {

    if (editingProduct) {

      setName(editingProduct.name);
      setQuantity(editingProduct.quantity);
      setPrice(editingProduct.price);

    }

  }, [editingProduct]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingProduct) {

        await api.put(`/products/${editingProduct.id}`, {
          name,
          quantity: Number(quantity),
          price: Number(price),
        });

        clearEdit();

      } else {

        await api.post("/products", {
          name,
          quantity: Number(quantity),
          price: Number(price),
        });

      }

      setName("");
      setQuantity("");
      setPrice("");

      refreshProducts();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">

        {editingProduct ? "Edit Product" : "Add Product"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >

          {editingProduct ? "Update Product" : "Add Product"}

        </button>

      </form>

    </div>
  );
}

export default ProductForm;