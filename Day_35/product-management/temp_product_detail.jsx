import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setCurrentIndex(0);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const images = product.images;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <h1>{product.title}</h1>
      <p>${product.price}</p>

      {/* Ảnh chính */}
      <img src={images[currentIndex]} alt="" width={300} />

      <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>

      {/* Ảnh con */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            width={60}
            style={{
              cursor: "pointer",
              border:
                currentIndex === index ? "2px solid red" : "1px solid #ccc",
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      <p>{product.description}</p>
    </>
  );
};

export default ProductDetail;
