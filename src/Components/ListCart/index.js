import { useReducer, useEffect, useRef } from "react";
import axios from "axios";
import CartItem from "../CartItem";
import "./style.css";

const initialState = {
    cartItems: [],
    selectedItems: {},
    isScrolled: false,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                cartItems: action.payload,
                selectedItems: action.payload.reduce((acc, item) => {
                    acc[item.food_id] = false;
                    return acc;
                }, {}),
            };
        case "TOGGLE_SELECT":
            return {
                ...state,
                selectedItems: {
                    ...state.selectedItems,
                    [action.payload]: !state.selectedItems[action.payload],
                },
            };
        case "UPDATE_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.food_id === action.payload.food_id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.food_id !== action.payload),
                selectedItems: Object.fromEntries(
                    Object.entries(state.selectedItems).filter(([key]) => key !== action.payload)
                ),
            };
        case "SET_SCROLLED":
            return { ...state, isScrolled: action.payload };
        default:
            return state;
    }
};

function ListCart() {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const user_id = Number(localStorage.getItem("user_id"));
    const listCartRef = useRef(null);

    useEffect(() => {
        fetchCart();
    }, [user_id]);

    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/cart/${user_id}`);
            dispatch({ type: "SET_CART", payload: response.data.item || [] });
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error);
        }
    };

    return (
        <div className="listCart">
            <div className="listCartHead">
                <p className="text1">Sản phẩm</p>
                <p>Đơn giá</p>
                <p>Số lượng</p>
                <p>Số tiền</p>
                <p>Thao tác</p>
            </div>
            <div className="listCartBody">
                {state.cartItems.length > 0 ? (
                    state.cartItems.map((item) => (
                        <CartItem
                            key={item.food_id}
                            isChecked={state.selectedItems[item.food_id] || false}
                            id={item.food_id}
                            name={item.name}
                            cost={item.price}
                            imageURL={item.image_url}
                        />
                    ))
                ) : (
                    <p>Giỏ hàng trống.</p>
                )}
            </div>
        </div>
    );
}

export default ListCart;
