import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailItem from "./DetailItem";
import FormatCost from "../FormatCost";
import "./style.css";

function OrderDetail() {
    const { orderCode } = useParams();
    const [typeParam] = useSearchParams();
    const currentType = parseInt(typeParam.get("type"));

    const statusMap = {
        1: "Đã hoàn thành",
        2: "Đang chờ xác nhận",
        3: "Đang giao",
        4: "Đã hủy",
    };
    const currentStatus = statusMap[currentType] || "";

    const [userInfo, setUserInfo] = useState({
        name: "",
        phone: "",
        address: "",
        note: "",
    });
    const [orderList, setOrderList] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/order/${orderCode}`)
            .then((response) => {
                setOrderList(response.data.items);
                setTotalCost(response.data.items.reduce((acc, item) => acc + item.cost * item.quantity, 0));
                setUserInfo({
                    name: response.data.username,
                    phone: response.data.phone,
                    address: response.data.address,
                    note: response.data.note,
                });
            })
            .catch((error) => console.error("Lỗi khi lấy thông tin đơn hàng:", error));
    }, [orderCode]);

    return (
        <div className="order-detail-container">
            <h3 className="order-status">Trạng thái: {currentStatus}</h3>
            {orderList.map((item, index) => (
                <DetailItem 
                    key={index}
                    name={item.name}
                    imageURL={item.imageURL}
                    quantity={item.quantity}
                    cost={item.cost}
                />
            ))}
            
            <div className="total-detail">
                <h3>THÀNH TIỀN:</h3>
                <h3 className="total-cost"> <FormatCost value={totalCost} /></h3>
            </div>
            
            <div className="user-info-box">
                <p><strong>HỌ VÀ TÊN:</strong> {userInfo.name}</p>
                <p><strong>SỐ ĐIỆN THOẠI:</strong> {userInfo.phone}</p>
                <p><strong>ĐỊA CHỈ:</strong> {userInfo.address}</p>
                <p><strong>GHI CHÚ:</strong> {userInfo.note}</p>
            </div>
        </div>
    );
}

export default OrderDetail;
