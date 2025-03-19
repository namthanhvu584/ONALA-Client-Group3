import { Link, useNavigate } from 'react-router-dom';
import FormatCost from '../FormatCost';
import axios from 'axios';
import './style.css';

function OrderItem(props) {
    const navigate = useNavigate();
    

    const handleToOrderDetail = (order_id) => {
        navigate(`/orderdetail/${props.order_id}`);
    };
    

    const handleBuyAgain = () => {
        axios.post(`http://localhost:8000/order/reorder/${props.order_id}`, {
            user_id: props.user_id,
            
        }).then(response => {
            console.log("Mua lại thành công", response.data);
        }).catch(error => {
            console.error("Lỗi khi mua lại đơn hàng:", error);
        });
    };

    return (
        <div className="orderItem">
            <div className="orderContent">
                <div className="item_left">
                    <img width="150px" height="150px" src={props.imageURL} alt={props.name} />
                    <div className="orderText">
                        <p>{props.name}</p>
                    </div>
                </div>
                <div className="item_right">
                    <div className="item_rightTop">
                        <p>Mã Đơn hàng: {props.orderCode}</p>
                        <div className="costText">
                            <p>Thành tiền</p>
                            <p><FormatCost value={props.totalCost} /></p>
                        </div>
                    </div>
                    <div className="item_rightBot">
                        <button id="buyAgain" onClick={handleBuyAgain}>MUA LẠI</button>
                        <button id="showOrderDetail" ><Link to={`/order/${props.order_id}`} >Xem chi tiết đơn hàng </Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
