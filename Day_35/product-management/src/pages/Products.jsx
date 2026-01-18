import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const LIMIT = 12;
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const skip = (page - 1) * LIMIT;
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
        );
        if (!response.ok) {
          throw new Error("Lỗi khi tải dữ liệu sản phẩm");
        }
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / LIMIT);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
      window.scrollTo(0, 0);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  return (
    <div>
      <h1 className="products-title">Sản phẩm</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-thumbnail-wrapper">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-thumbnail"
              />
            </div>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price}</p>
            <Link to={`/products/${product.id}`} className="product-link">
              Chi tiết
            </Link>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`pagination-btn ${p === page ? "active" : ""}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="pagination-btn-next"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
