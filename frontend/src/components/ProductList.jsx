import api from "../services/api";

function ProductList({
  products,
  refreshProducts,
  onEdit
}) {

  const handleDelete = async (id) => {

    try {

      await api.delete(`/products/${id}`);

      refreshProducts();

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Products
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-200">

              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {products.map((p) => (

              <tr
                key={p.id}
                className="border-b"
              >

                <td className="p-3">{p.name}</td>

                <td className="p-3">{p.quantity}</td>

                <td className="p-3">${p.price}</td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => onEdit(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductList;