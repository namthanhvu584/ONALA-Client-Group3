import './style.css';
import FormatCost from '../FormatCost';
import { Checkbox } from "antd";
import { useState, useEffect } from 'react';

function CartItem(props) {
    const [checked, setChecked] = useState(props.isChecked);
    const [count, setCount] = useState(props.quantity || 1);
    const [isNote, setIsNote] = useState(false);
    const [note, setNote] = useState("");
    const [totalCost, setTotalCost] = useState((props.cost || 0) * (props.quantity || 1));

    useEffect(() => {
        setChecked(props.isChecked);
    }, [props.isChecked]);

    useEffect(() => {
        const newTotal = (props.cost || 0) * count;
        setTotalCost(isNaN(newTotal) ? 0 : newTotal);
        props.onUpdateQuantity(count); // Cập nhật số lượng đúng vào giỏ hàng
    }, [count, props.cost]);

    const handleIncrease = () => {
        setCount(prev => prev + 1);
    };

    const handleDecrease = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        }
    };

    const handleNote = () => {
        setIsNote(!isNote);
    };

    return ( 
        <div style={{ marginBottom: '14px', backgroundColor: 'white', width: '90%', paddingBottom: '8px' }}>
            <div className="cartItem">
                <div className="item1"> 
                    <Checkbox 
                        style={{ marginRight: '40px' }}
                        checked={checked} 
                        onChange={() => setChecked(!checked)}
                    />
                    <img width='150px' height='150px' src={props.imageURL} alt="product"/>
                    <div className="itemNote">
                        <p>{props.name}</p>
                        {
                            isNote 
                            ? <button className='btnOK' onClick={handleNote}>OK</button>
                            : <button className='btnNote' onClick={handleNote}>Ghi chú</button>
                        }
                    </div>
                </div>
                
                <div className="item2">
                    <FormatCost value={props.cost || 0}/>
                </div>
                <div className="item3">
                    <button className='btn_count' onClick={handleDecrease}>-</button>
                    <p className='text_count'>{count}</p>
                    <button className='btn_count' onClick={handleIncrease}>+</button>
                </div>
                <div className="item4">
                    <FormatCost value={totalCost}/>
                </div>
                <div className="item5">
                    <p style={{ cursor: 'pointer', color: 'red' }} onClick={() => props.onDelete()}>Xóa</p>
                    <p>Sản phẩm tương tự</p>
                </div>
            </div>
            {
                isNote && <textarea rows="3" 
                                    className='inputNote'
                                    onChange={e => setNote(e.target.value)}
                                    value={note}
                        />
            }
            {
                !isNote && note && <div className='textNote'> {note} </div>
            }
        </div>
    );
}

export default CartItem;
