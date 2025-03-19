import { Button, Form, Input, message } from 'antd';
import FormatCost from '../../Components/FormatCost';
import SelectDistrict from '../../Components/SelectDistrict';
import './style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function OrderInfo() {
    const [formOrder] = Form.useForm();
    const [paymentType, setPaymentType] = useState('');
    const [userData, setUserData] = useState({}); // Lưu dữ liệu cũ của user
    const user_id = 1; // Giả sử lấy user_id từ context hoặc state

    const payment = [
        { type: 'delivery', name: 'THANH TOÁN KHI NHẬN HÀNG' },
        { type: 'e-wallet', name: 'THANH TOÁN BẰNG VÍ MOMO/VNPAY' }
    ];

    useEffect(() => {
        axios.get(`http://localhost:8000/user/${user_id}`)
            .then(response => {
                const user = response.data;
                const addressParts = user.address?.split(', ') || [];
                const updatedData = {
                    ...user,
                    houseNumber: addressParts[0] || '',
                    street: addressParts[1] || '',
                    ward: addressParts[2] || '',
                    district: addressParts[3] || ''
                };
                setUserData(updatedData);
                formOrder.setFieldsValue(updatedData);
            })
            .catch(error => {
                console.error('Lỗi khi tải thông tin người dùng:', error);
            });
    }, [formOrder]);

    const handleUpdateUserInfo = async (values) => {
        try {
            const { houseNumber, street, ward, district, ...restValues } = values;
            const updatedAddress = `${houseNumber}, ${street}, ${ward}, ${district}`;
            const updatedData = { ...userData, ...restValues, address: updatedAddress };

            await axios.put(`http://localhost:8000/user/update/${user_id}`, updatedData);
            setUserData(updatedData);
            message.success('Cập nhật thông tin khách hàng thành công!');
            return true;
        } catch (error) {
            message.error('Lỗi khi cập nhật thông tin khách hàng!');
            return false;
        }
    };

    const onFinish = async (values) => {
        const updateSuccess = await handleUpdateUserInfo(values);
        if (updateSuccess) {
            try {
                await axios.post('http://localhost:8000/order', values);
                message.success('Đơn hàng đã được đặt thành công!');
            } catch (error) {
                message.error('Lỗi khi đặt hàng, vui lòng thử lại!');
            }
        }
    };

    const handleSetPaymentType = (type) => {
        setPaymentType(type);
        formOrder.setFieldsValue({ paymentType: type });
    };

    return (
        <div className="orderInfo">
            <div id="orderInfoDetail">
                <h2 style={{ textAlign: 'center' }}>THÔNG TIN ĐƠN HÀNG</h2>
                <div className='containerGeneral'>
                    <p>THỜI GIAN GIAO HÀNG : GIAO NGAY</p>
                    <p>ĐƯỢC GIAO TỪ: ONALA FASTFOOD HÀ ĐÔNG</p>
                </div>
                <div>
                    <Form
                        form={formOrder}
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <div id='orderInfoFrom' className='containerGeneral'>
                            <p>THÔNG TIN KHÁCH HÀNG</p>
                            <p>HỌ VÀ TÊN:</p>
                            <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                                <Input className='underlineInput inputOrder' />
                            </Form.Item>
                            <p>SỐ ĐIỆN THOẠI:</p>
                            <Form.Item name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                                <Input className='underlineInput inputOrder' maxLength={10} />
                            </Form.Item>
                            <SelectDistrict onChange={(value) => formOrder.setFieldsValue(value)} />
                            <p>SỐ NHÀ:</p>
                            <Form.Item name="houseNumber">
                                <Input className='underlineInput inputOrder' />
                            </Form.Item>
                            <p>TÊN ĐƯỜNG:</p>
                            <Form.Item name="street">
                                <Input className='underlineInput inputOrder' />
                            </Form.Item>
                            <p>GHI CHÚ CỤ THỂ:</p>
                            <Form.Item name="note">
                                <Input className='underlineInput inputOrder' />
                            </Form.Item>
                        </div>
                        <div className='containerGeneral'>
                            <Form.Item name="paymentType" rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán!" }]}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p>PHƯƠNG THỨC THANH TOÁN</p>
                                    {payment.map((pay, index) => (
                                        <Button
                                            key={index}
                                            className='btnPaymentType'
                                            type={paymentType === pay.type ? "primary" : "default"}
                                            onClick={() => handleSetPaymentType(pay.type)}
                                        >
                                            {pay.name}
                                        </Button>
                                    ))}
                                </div>
                            </Form.Item>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" id="orderBtn">ĐẶT HÀNG</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
            <div id='orderSummary' className='containerGeneral'>
                <p>TÓM TẮT ĐƠN HÀNG</p>
                <p>Tên món</p>
                <div className='generalCost'>
                    <p>TỔNG ĐƠN HÀNG :</p>
                    <FormatCost value='000' />
                </div>
                <div className='generalCost'>
                    <p>PHÍ VẬN CHUYỂN :</p>
                    <FormatCost value='000' />
                </div>
                <div className='generalCost'>
                    <p>THÀNH TIỀN :</p>
                    <FormatCost value='000' />
                </div>
            </div>
        </div>
    );
}

export default OrderInfo;
