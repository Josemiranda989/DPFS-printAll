import { useState, useEffect } from "react";

export const Counter = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    // setProducts(fetching("http://localhost:3000/api/products"));
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      {products && categories ? (
        <>
          <div>
            <h4>Items totales</h4>
            <ul>
              <li>Productos: {products.count}</li>
              <li>Usuarios: {users.count}</li>
              <li>Categorias: {categories.count}</li>
            </ul>
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};
