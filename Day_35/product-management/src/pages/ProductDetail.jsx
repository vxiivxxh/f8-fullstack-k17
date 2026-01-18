import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("KHông tìm thấy sản phẩm");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return null;
  return (
    <div className="product-detail-container">
      <h3 className="detail-title">{product.title}</h3>
      <p className="detail-description">{product.description}</p>
      <div className="detail-main-image-wrapper">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="detail-main-image"
        />
      </div>
      <div className="detail-thumbnails-container">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Thumbnail"
            onClick={() => setCurrentImageIndex(index)}
            className={`detail-thumbnail ${
              currentImageIndex === index ? "active" : ""
            }`}
          />
        ))}
      </div>
      <h4 className="detail-product-name">{product.title}</h4>
      <p className="detail-price">{product.price} $</p>
    </div>
  );
};
export default ProductDetail;
