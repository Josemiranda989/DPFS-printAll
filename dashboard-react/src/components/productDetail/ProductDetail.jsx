import { useEffect, useState } from "react";
import { Product } from "../product/Product";
import { useParams } from "react-router-dom";

export const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/detail/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      <h3>Catalogo de productos</h3>
      {product ? <Product product={product} /> : <p>Cargando...</p>}
    </div>
  );
};
