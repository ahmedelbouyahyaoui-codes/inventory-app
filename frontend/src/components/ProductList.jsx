function ProductList({ products }) {

  return (
    <div>
      <h2>Products</h2>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - Quantity: {p.quantity} - Price: {p.price}$
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;