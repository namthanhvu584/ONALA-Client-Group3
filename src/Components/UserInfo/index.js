import { Form, Input, Button, Select, message } from 'antd';
import { AiFillEdit } from "react-icons/ai";
import styles from './UserInfo.module.css';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Option } = Select;

function UserInfo() {
    const user_id = localStorage.getItem("user_id") || null;
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user_id) return;
            try {
                const response = await axios.get(`http://localhost:8000/user/${user_id}`);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error("Lỗi khi lấy thông tin người dùng!");
            }
        };
        fetchUserInfo();
    }, [user_id, form]);

    const handleEdit = () => setEdit(!edit);

    const onFinish = async (values) => {
        try {
            await axios.put(`http://localhost:8000/user/update/${user_id}`, 
                { ...values, role: 1 }, 
                { headers: { "Content-Type": "application/json" } }
            );
            message.success("Cập nhật thông tin thành công!");
            handleEdit();
        } catch (error) {
            message.error("Lỗi khi cập nhật thông tin!");
        }
    };

    return (
        <div className='userInfo'>
            <h2 className='titleUserContent'>THÔNG TIN CÁ NHÂN</h2>
            <div className="userInfoContainer">
                <AiFillEdit className='iconEdit' size={24} color="black" onClick={handleEdit} />
                <div className={styles.formContainer}>
                    <div className='formContainerText'>
                        <p>HỌ VÀ TÊN</p>
                        <p>SỐ ĐIỆN THOẠI</p>
                        <p>EMAIL</p>
                        <p>GIỚI TÍNH</p>
                        <p>ĐỊA CHỈ</p>
                    </div>
                    <Form
                        form={form}
                        name="info"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        disabled={!edit}
                        onFinish={onFinish}
                        autoComplete="off"
                        onValuesChange={(changedValues, allValues) => form.setFieldsValue(allValues)}
                    >
                        <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                            <Input className={styles.inputUserInfo} />
                        </Form.Item>

                        <Form.Item name="phone" label="Số điện thoại" rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10}$/, message: 'Số điện thoại phải có đúng 10 chữ số!' }
                        ]}>
                            <Input className={styles.inputUserInfo} maxLength={10} />
                        </Form.Item>

                        <Form.Item name="email" label="Email" rules={[
                            { type: 'email', message: 'Email không hợp lệ!' },
                            { required: true, message: 'Vui lòng nhập email!' }
                        ]}>
                            <Input className={styles.inputUserInfo} />
                        </Form.Item>

                        <Form.Item name="gender" label="Giới tính">
                            <Select className={styles.inputUserInfo}>
                                <Option value="0">Nam</Option>
                                <Option value="1">Nữ</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="address">
                            <Input className={styles.inputUserInfo} />
                        </Form.Item>

                        {edit && (
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className={styles.btnComfirmEdit}>XÁC NHẬN</Button>
                            </Form.Item>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
