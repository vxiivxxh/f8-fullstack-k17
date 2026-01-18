import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const LIMIT = 10;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const skip = (page - 1) * LIMIT;
  const totalPages = Math.ceil(total / LIMIT);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      });
  }, [page]);

  const handleChangePage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      <h1>Products</h1>

      {products.map((item) => (
        <div
          key={item.id}
          style={{ borderBottom: "1px solid #ccc", padding: 10 }}
        >
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <Link to={`/products/${item.id}`}>Detail</Link>
        </div>
      ))}

      {/* Pagination */}
      <div style={{ marginTop: 20 }}>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handleChangePage(pageNumber)}
              style={{
                marginRight: 5,
                fontWeight: page === pageNumber ? "bold" : "normal",
              }}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Products;
