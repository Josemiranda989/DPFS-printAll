export const Product = ({ product }) => {
  return (
    <div key={product.id}>
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      {/*  <img src={product.urlAvatar} alt="imagenDelProducto" /> */}
    </div>
  );
};
