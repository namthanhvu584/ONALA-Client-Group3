// OrderList.js
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import OrderItem from "../OrderItem";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import logo from '../../image/logo.png'
function OrderList() {
    const statusOrder = [
        { type: 1, content: 'Hoàn thành' },
        { type: 2, content: 'Chờ duyệt' },
        { type: 3, content: 'Đang giao' },
        { type: 4, content: 'Hủy/ Hoàn Tiền' },
    ];
    
    const [searchParam, setSearchParam] = useSearchParams();
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const currentType = parseInt(searchParam.get("type"));
    const user_id = Number(localStorage.getItem("user_id"));
    
    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === "/account/purchase" && !searchParam.get("type")) {
            navigate("?type=1", { replace: true });
        }
    }, [searchParam, navigate]);
    
    useEffect(() => {
        const currentStatus = statusOrder.find(status => status.type === currentType)?.content;
    
        axios.get(`http://localhost:8000/order/${user_id}`)
            .then((response) => {
                const filteredOrders = response.data.filter(order => order.status === currentStatus);
                setOrderList(filteredOrders);
                console.log(orderList);
                
            })
            .catch(error => console.error("Error fetching orders:", error));
    }, [currentType, user_id]);
    
    
    return (
        <div>
            <h2 className="titleUserContent">ĐƠN HÀNG CỦA BẠN</h2>
            <div className="navOrderStatus">
                {statusOrder.map((status) => (
                    <Link
                        key={status.type}
                        to={`?type=${status.type}`}
                        className={currentType === status.type ? "activeStatus" : ""}
                        style={{ height: '100%', lineHeight: '54px' }}
                    >
                        {status.content}
                    </Link>
                ))}
            </div>
            <div className="OrderListContainer">
                {orderList.length > 0 ? (
                    orderList.map((order) => (
                        <OrderItem
                            key={order.order_id}
                            imageURL= {logo}
                            user_id = {order.user_id}
                            order_id = {order.order_id}
                            orderCode={order.order_id}
                            totalCost={order.total_price}
                            type={currentType}
                        />
                    ))
                ) : (
                    <p>Không có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
}

export default OrderList;
