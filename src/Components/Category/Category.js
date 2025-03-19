import { Link } from "react-router-dom";
import ga from "../../image/ga.png";
import combo2 from "../../image/combo2.png"
import combo1 from "../../image/combo1.png"
import humberger from "../../image/humberger.png"
import douong from "../../image/douong.png"
import banh from "../../image/banh.png"
import doanvat from "../../image/doanvat.png"
import './style.css'
function Category(){
    return(
        <div className="category">
            <Link to = '/bestseller'>
                <img src={ga} className="img_1"></img>
                <h2>BESTSELLER</h2>
            </Link>
            <Link to = '/sale'>
                <img src={combo2} className="img_1"></img>
                <h2>SALE</h2>
            </Link>
            <Link to = '/combo'>
                <img src={combo1} className="img_1" ></img>
                <h2>COMBO</h2>
            </Link>
            <Link to = '/hamburger'>
                <img src={humberger} className="img_1"></img>
                <h2>HAMBERGER</h2>
            </Link>
            
            <Link to = '/chicken'>
                <img src="https://beptruong.edu.vn/wp-content/uploads/2013/04/ga-nuong-chao-nguyen-con.jpg" className="img_1"></img>
                <h2>GÀ </h2>
            </Link>
            <Link to = '/drink'>
                <img src={douong} className="img_1"></img>
                <h2>ĐỒ UỐNG </h2>
            </Link>
            <Link to = '/cake'>
                <img src={banh} className="img_1" ></img>
                <h2>BÁNH </h2>
            </Link>
            <Link to = '/fingerfood'>
                <img src={doanvat } className="img_1" ></img>
                <h2>ĐỒ ĂN VẶT  </h2>
            </Link>
        </div>
    )
}
export default Category;