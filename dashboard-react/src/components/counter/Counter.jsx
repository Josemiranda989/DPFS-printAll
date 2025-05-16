import { useState, useEffect } from "react";

export const Counter = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState(null);

  const fetchData = async (endpoint, setData) => {
    let res = await fetch(endpoint);
    let data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData("http://localhost:3000/api/products", setProducts);
    fetchData("http://localhost:3000/api/users", setUsers);
    fetchData("http://localhost:3000/api/categories", setCategories);
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
