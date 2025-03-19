import { Link } from "react-router-dom";

// Component tái sử dụng cho món ăn
const FoodItem = ({ img, name, src }) => (
    <Link to={src} className="food-item">
        
        <img src={img} alt={name} />
        <p>{name}</p>
    </Link>
);

export default FoodItem ;
