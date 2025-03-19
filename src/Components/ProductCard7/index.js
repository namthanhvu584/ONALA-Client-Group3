import { useState, useEffect} from "react";
import axios from "axios";
import { message, Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { FilterOutlined } from "@ant-design/icons";
import "./style.css";
import fork from "../../image/fork.svg";
import addToCart from "../../image/addToCart.svg";
import FormatCost from "../FormatCost";

const { Option } = Select;

function ProductCard7({ imageURL, name, description, cost, foodId }) {
  const [addingToCart, setAddingToCart] = useState(false);
  const [buying, setBuying] = useState(false);
  const user_id = Number(localStorage.getItem("user_id"));
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!foodId || !user_id) {
      message.error("Lỗi: Thiếu dữ liệu food_id hoặc user_id");
      return;
    }
    setAddingToCart(true);
    try {
      await axios.post("http://localhost:8000/cart", {
        user_id: user_id,
        food_id: foodId,
        quantity: 1,
      });
      message.success("Thêm vào giỏ hàng thành công!");
      alert('Thêm vào giỏ hàng thành công');
    } catch (error) {
      message.error("Thêm vào giỏ hàng thất bại!");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!foodId || !user_id) {
      message.error("Lỗi: Thiếu dữ liệu food_id hoặc user_id");
      return;
    }
    setBuying(true);
    try {
      await axios.post("http://localhost:8000/order", {
        user_id,
        cart_item: [{ food_id: foodId, quantity: 1 }],
      });
      message.success("Đặt hàng thành công!");
     
    } catch (error) {
      message.error("Đặt hàng thất bại!");
    } finally {
      setBuying(false);
    }
  };

  return (
    <Link className="productCard" to={`/food/${foodId}`}>
      <img src={imageURL} alt={name} style={{ width: "300px", height:'300px' }} />
      <div className="productCardContainer">
        <p className="nameCard">{name}</p>
        <p className="descriptionCard">{description}</p>
        <div className="productCardBuy">
          <div>
            <button className="buy" onClick={handleBuyNow} disabled={buying}>
              {buying ? "Đang xử lý..." : "MUA NGAY"}
            </button>
            <p className="costCard">
              <img src={fork} alt="fork" /> <FormatCost value={cost} />
            </p>
          </div>
          <img 
            className={`addToCart ${addingToCart ? "disabled" : ""}`} 
            src={addToCart} 
            alt="addToCart" 
            onClick={handleAddToCart} 
          />
        </div>
      </div>
    </Link>
  );
}

function ProductList() {
  const [foods, setFoods] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const API_URL = "http://localhost:8000/food/foodCategory_id/7";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setFoods(data.food_list || []))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  const sortedFoods = [...foods].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16, marginRight: '121px'  }}>
        <Select
          defaultValue="default"
          onChange={handleSortChange}
          suffixIcon={<FilterOutlined />}
          style={{width: '150px'}}
        >
          <Option value="default">Mặc định</Option>
          <Option value="lowToHigh">Giá thấp đến cao</Option>
          <Option value="highToLow">Giá cao đến thấp</Option>
        </Select>
      </div>
      <div className="productList">
        {sortedFoods.length > 0 ? (
          sortedFoods.map((food) => (
            <ProductCard7
              key={food.id}
              imageURL={food.image_url}
              name={food.name}
              
              cost={food.price}
              foodId={food.food_id} 
            />
          ))
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
