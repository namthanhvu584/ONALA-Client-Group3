import { Link } from 'react-router-dom';
import cartEmpty from '../../image/cartEmpty.png'
import './style.css'
function CartEmpty() {
    return ( 
        <>
            <div className='cartEmptyBody' style={{margin:'20px 121px'}}>
                <img src= {cartEmpty} alt='cartEmpty' style={{width:'80%'}}/>
                <div className='cartEmptyContent'>
                    <p>
                        GIỎ HÀNG CỦA BẠN 
                    </p>
                    <p>
                        ĐANG TRỐNG
                    </p>
                    
                    HÃY ĐẶT MÓN NGAY!
                    
                    <Link to="/">
                        <button>
                            ĐẶT MÓN TẠI ĐÂY
                        </button>
                    </Link>
                    </div>

            </div>
        </>
    );
}

export default CartEmpty;