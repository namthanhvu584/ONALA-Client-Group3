import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import './style.css';

const OrderDetail = () => {
  const { order_id } = useParams(); // Lấy order_id từ URL
  const [order, setOrder] = useState(null);
  console.log("Order ID từ URL:", order_id);

  // Gọi API lấy thông tin đơn hàng
  useEffect(() => {
    axios
      .get(`http://localhost:8000/order/orderid/${order_id}`)
      .then((response) => {
        console.log("API Response:", response.data); // Kiểm tra JSON
        setOrder(response.data);
      })
      .catch((error) => console.error("Lỗi API:", error));
  }, [order_id]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div className="order-container">
      <h2 className="order-title">MÃ ĐƠN HÀNG: {order.order_id}</h2>

      <p className="status">Trạng thái: <span>{order.status}</span></p>

      <div className="order-items">
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.image_url} alt={item.food_name} className="order-image" />
            <div className="order-info">
              <p className="item-name">{item.food_name}</p>
              <p className="item-quantity">x {item.quantity}</p>
            </div>
            <p className="item-price">{Number(item.price).toLocaleString('vi-VN')}Đ</p>
          </div>
        ))}
      </div>

      <h3 className="total-price">THÀNH TIỀN: {Number(order.total_price).toLocaleString('vi-VN')}Đ</h3>  

      <div className="customer-info">
        <h2 style={{fontSize:'25px '}}>Thông tin cá nhân </h2>
        <h4>HỌ VÀ TÊN: {order.user_info.username}</h4>
        <p>SỐ ĐIỆN THOẠI: {order.user_info.phone}</p>
        <p>ĐỊA CHỈ: {order.user_info.address}</p>
        
        
      </div>
    </div>
  );
};

export default OrderDetail;
