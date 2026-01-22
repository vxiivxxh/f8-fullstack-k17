import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <h1>ProductDetail: {id}</h1>
      <button onClick={() => navigate(`/users/order/${id}`)}>Đặt hàng</button>
    </div>
  );
}
