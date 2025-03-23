import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, InputNumber, message, Input } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import "./productdetail.css";

function ChiTietSanPham() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        axios.get(`http://localhost:8000/food/${id}`)
            .then(response => {
                if (response.data) {
                    setProduct(response.data);
                } else {
                    console.error("Dữ liệu API không hợp lệ:", response.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Lỗi khi tải dữ liệu:", error);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const response = await axios.post("http://localhost:8000/cart", {
                user_id,
                food_id: id,
                quantity,
            });

            if (response.status === 200) {
                message.success("Đã thêm sản phẩm vào giỏ hàng!");
                window.location.href = '/Cart';
            } else {
                message.error(response.data.error || "Lỗi khi thêm sản phẩm vào giỏ hàng.");
            }
        } catch (error) {
            message.error("Lỗi kết nối server!");
            console.error(error);
        }
    };

    const handleBuyNow = () => {
        navigate("/orderinfo", {
            state: {
                user_id,
                product,
                quantity,
                

            }
        });
    };

    if (loading) return <p>Đang tải...</p>;
    if (!product) return <p>Không tìm thấy sản phẩm!</p>;

    return (
        <div className="chi-tiet-san-pham">
            <div className="chi-tiet-san-pham-1" style={{ margin: "40px 121px" }}>
                <div className="hover-container">
                    <img src={product.food.image_url} alt={product.food.name} style={{ height: "500px", width: "500px" }} />
                </div>
                <div className="thong-tin-san-pham">
                    <h3 className="productName" style={{ marginLeft: "70px", fontSize: "30px" }}>{product.food.name}</h3>
                    <h3 className="price" style={{ color: "#1648CE", paddingBottom: "20px", marginLeft: "70px", fontSize: "30px" }}>
                        {Number(product.food.price).toLocaleString("vi-VN")} đ
                    </h3>

                    <div className="GioHang" style={{ marginLeft: "60px" }}>
                        <div style={{ textAlign: "left", padding: "20px" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <span style={{ marginRight: "10px", fontWeight: "bold" }}>Chọn số lượng:</span>
                                <InputNumber
                                    min={1}
                                    value={quantity}
                                    onChange={setQuantity}
                                    style={{ width: "60px", marginRight: "10px" }}
                                />
                                <span style={{ color: "blue" }}>Còn hàng</span>
                            </div>

                            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                <Button type="primary" icon={<ShoppingCartOutlined />} size="large"
                                    style={{ backgroundColor: "#2196F3", borderColor: "#2196F3" }}
                                    onClick={handleAddToCart}>
                                    Thêm vào giỏ hàng
                                </Button>
                                <Button type="primary" size="large"
                                    style={{ backgroundColor: "#0D47A1", borderColor: "#0D47A1" }}
                                    onClick={handleBuyNow}>
                                    🛍 Mua ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="description_food" style={{ margin: "40px 121px" }}>
                <h3 style={{ fontWeight: "bold", fontSize: "40px" }}>Chi tiết món ăn</h3>
                <p style={{ fontSize: "25px" }}>{product.food.description}</p>
            </div>
        </div>
    );
}

export default ChiTietSanPham;
