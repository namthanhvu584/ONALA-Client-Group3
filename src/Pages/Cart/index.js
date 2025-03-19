import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, InputNumber, Table, Checkbox, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./style.css";

function Cart() {
 
  const navigate = useNavigate();
  const [cart, setCart] = useState({ cart: {}, item: [] });
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); 
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/cart/${user_id}`)
      .then(({ data }) => {
        console.log("Dữ liệu API:", data);
        setCart({ cart: data.cart, item: data.item });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải giỏ hàng:", error);
        setLoading(false);
      });
  }, [user_id]);

  const updateQuantity = (food_id, quantity) => {
    axios.put(`http://localhost:8000/cart`, { user_id, food_id, quantity }).then(() => {
      setCart((prev) => ({
        ...prev,
        item: prev.item.map((i) => (i.food_id === food_id ? { ...i, quantity } : i)),
      }));
    });
  };

  const deleteItem = (food_id) => {
    axios.delete(`http://localhost:8000/cart`, { data: { user_id, food_id } }).then(() => {
      setCart((prev) => ({
        ...prev,
        item: prev.item.filter((i) => i.food_id !== food_id),
      }));
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");
    });
  };

  // 🌟 Xử lý chọn/bỏ chọn sản phẩm
  const toggleSelect = (food_id) => {
    setSelectedItems((prev) =>
      prev.includes(food_id) ? prev.filter((id) => id !== food_id) : [...prev, food_id]
    );
  };

  // 🌟 Mua sản phẩm đã chọn
  const handleBuyNow = () => {
    if (selectedItems.length === 0) {
      message.warning("Vui lòng chọn ít nhất một sản phẩm để mua!");
      return;
    }

    const selectedProducts = cart.item.filter((item) => selectedItems.includes(item.food_id));
    const orderData = { user_id, cart_item: selectedProducts };

    axios
      .post("http://localhost:8000/order", orderData)
      .then(({ data }) => {
        message.success("Đặt hàng thành công!");
        console.log("Đơn hàng:", data);
       
      })
      .catch((error) => {
        console.error("Lỗi đặt hàng:", error);
        message.error("Đặt hàng thất bại!");
      });
  };

  if (loading) return <p>Đang tải...</p>;
  if (cart.item.length === 0) return <p>Giỏ hàng trống!</p>;

  const columns = [
    {
      title: "",
      dataIndex: "food_id",
      render: (food_id) => (
        <Checkbox checked={selectedItems.includes(food_id)} onChange={() => toggleSelect(food_id)} />
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image_url",
      render: (image) => (
        <img src={image} alt="Sản phẩm" style={{ width: 100, height: 100, objectFit: "cover" }} />
      ),
    },
    { title: "Sản phẩm", dataIndex: "name" },
    { title: "Giá", dataIndex: "price", render: (price) => `${Number(price).toLocaleString('vi-VN')} đ` }, 
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity, record) => (
        <InputNumber min={1} value={quantity} onChange={(value) => updateQuantity(record.food_id, value)} />
      ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Button icon={<DeleteOutlined />} onClick={() => deleteItem(record.food_id)} danger />
      ),
    },
  ];

  return (
    <div className="gio-hang">
      <h2 style={{fontSize:'30px'}}>Giỏ hàng của bạn</h2>
      <Table dataSource={cart.item} columns={columns} rowKey="cart_detail_id" pagination={false} />
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Button type="primary" onClick={handleBuyNow} disabled={selectedItems.length === 0} style={{color: 'white'}}>
          Mua ngay
        </Button>
      </div>
    </div>
  );
}

export default Cart;
