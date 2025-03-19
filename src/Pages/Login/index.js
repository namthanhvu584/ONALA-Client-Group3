import { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import clsx from 'clsx';
import './style.css';
import logo from '../../image/logo.png';
import styles from './LoginForm.module.css';
import UserManagement from "../UserManagement";



const API_URL = 'http://localhost:8000/user';

function Login() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
   
   
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleOtpCancel = () => setIsOtpModalOpen(false);

    const handleSubmitEmail = async ({ email }) => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/forgot-password`, { email });
            message.success('OTP đã được gửi vào email của bạn!');
            setIsModalOpen(false);
            setIsOtpModalOpen(true);
        } catch (error) {
            message.error('Gửi email thất bại! Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitOtp = async ({ otp, newPassword }) => {
        setLoading(true);
        console.log(otp)
        try {
            await axios.post(`${API_URL}/reset-password`, { otp_code: otp , newPassword: newPassword});
            message.success('Mật khẩu đã được đặt lại thành công!');
            setIsOtpModalOpen(false);
        } catch (error) {
            message.error('OTP không hợp lệ hoặc đã hết hạn!');
        } finally {
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/login`, values);
            message.success("login suscessfully");
           
            localStorage.setItem('token', data.token);
            console.log("Email gửi đi:", values.email);
            
            const userIdResponse = await axios.post(`${API_URL}/get-id?email=${values.email}`);
            
            const userId = userIdResponse.data.data.id;
            console.log(userId);
            
            if (userId) {
                localStorage.setItem("user_id", userId);
            }
             window.location.href = '/userManagement'
           
            
           
        } catch (error) {
            message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contentForm">
            <img src={logo} alt="logo" className="logo" style={{height: "500px"}}/>
            <div className="formContainer">
                <h2 className="title">ĐĂNG NHẬP</h2>
                <Form form={form} onFinish={onFinish} autoComplete="off">
                    <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
                        <Input className='underlineInput' placeholder='Địa chỉ email của bạn *' />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                        <Input.Password className='underlineInput' placeholder='Mật khẩu *' />
                    </Form.Item>
                    <p onClick={showModal} className="right-align">Quên Mật Khẩu?</p>
                </Form>
                
                <Modal title="Quên mật khẩu?" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <p>Chúng tôi sẽ gửi một mã OTP đến email của bạn để đặt lại mật khẩu!</p>
                    <Form form={form} onFinish={handleSubmitEmail}>
                        <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}>
                            <Input placeholder="Nhập email của bạn" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className={clsx(styles.button, styles.btnSendEmail)}>
                                Gửi OTP
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal title="Nhập OTP để đặt lại mật khẩu" open={isOtpModalOpen} onCancel={handleOtpCancel} footer={null}>
                    <Form form={form} onFinish={handleSubmitOtp}>
                        <Form.Item name="otp" rules={[{ required: true, message: 'Vui lòng nhập OTP!' }]}>
                            <Input placeholder="Nhập mã OTP" />
                        </Form.Item>
                        <Form.Item name="newPassword" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}>
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className={clsx(styles.button, styles.btnSendEmail)}>
                                Đặt lại mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                
                <Form.Item>
                    <Button type="primary" onClick={() => form.submit()} loading={loading} className={clsx(styles.button, styles.btnLogin)}>
                        Đăng Nhập
                    </Button>
                </Form.Item>
                
                <p className="separator">Hoặc Tiếp Tục Với</p>
                <Button type="primary" className={clsx(styles.button, styles.btnGG)} icon={<FaGoogle />}>Đăng nhập với Google</Button>
                
                <p className="register-link">Bạn chưa có tài khoản? <Link to='/register'><b>Đăng ký</b></Link></p>
            </div>
        </div>
    );
}

export default Login;
