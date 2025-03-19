import { Button, Form, Input, Checkbox, message } from 'antd';
import '../Login/style.css';
import logo from "../../image/logo.png";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './RegisterForm.module.css';
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/user";

function Register() {
    const [loading, setLoading] = useState(false);

    const handleApiError = (error) => {
        message.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/register`, {
                ...values,
                role: values.role || 1,
                gender: values.gender || "0",
            });
            message.success("Đăng ký thành công");
        } catch (error) {
            handleApiError(error);
        }
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="contentForm">
            <img src={logo} alt="logo" style={{ height: '530px', width: '500px', marginTop: '63px' }} />
            <div className="formContainer">
                <h2 style={{ fontSize: '40px' }}>TẠO TÀI KHOẢN</h2>
                <Form
                    name="register"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    

                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                    >
                        <Input className='underlineInput' placeholder='Tên của bạn *' />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có đúng 10 chữ số!' }
                        ]}
                    >
                        <Input
                            className='underlineInput'
                            placeholder='Số điện thoại'
                            maxLength={10}
                            onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { type: 'email', message: 'Email không hợp lệ!' },
                            { required: true, message: 'Vui lòng nhập email!' },
                        ]}
                    >
                        <Input className='underlineInput' placeholder='Địa chỉ email' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password className='underlineInput' placeholder='Mật khẩu *' />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>
                            <p style={{ fontSize: '18px', fontWeight: '400' }}>
                                Tôi đã đọc và đồng ý với 
                                <Link> Chính Sách Hoạt Động</Link> và 
                                <Link> Chính Sách Bảo Mật Thông Tin</Link> của ONALA FASTFOOT
                            </p>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className={clsx(styles.button, styles.btnCreate)}>
                            Tạo tài khoản
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;
