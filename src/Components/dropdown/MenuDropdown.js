import { Menu, Dropdown, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const menu = (
  <Menu>
    <Menu.Item key="1">
        <h2>Danh mục sản phẩm</h2>
        <ul>
            <li><Link to='/fingerfood'>Đồ Ăn Vặt</Link></li>
            <li><Link to='/cake'>Bánh Ngọt</Link></li>
            <li><Link to='/bestseller'>Bestseller</Link></li>
            <li><Link to='/sale'>Sale</Link></li>
            <li><Link to='/combo'>Combo món ăn </Link></li>
            <li><Link to='/hamburger'>Hamburger</Link></li>
            <li><Link to='/chicken'>Gà </Link></li>

            <li><Link to='/drink'>Đồ Uống</Link></li>
        </ul>
    </Menu.Item>
    <Menu.Item key="2">
        <h2>ONALA </h2>
        <ul>
            <li><Link to='/recommend'>Giới thiệu</Link></li>
            <li><Link to='/'>Tin tức</Link> </li>
            <li><Link to='/'>Tuyển dụng </Link></li>
            <li><Link to='/'>Đặt tiệc sinh nhật</Link> </li>
        </ul>
    </Menu.Item>
    <Menu.Item key="3">
        <h2>Liên Hệ & Chính Sách </h2>
        <ul>
            <li><Link to='/'>Theo Dõi Đơn Hàng</Link> </li>
            <li><Link to='/'>Liên Hệ ONALA</Link> </li>
            <li><Link to='/'>Hệ Thống </Link></li>
            <li><Link to='/'>Khiếu nại </Link> </li>
            <li><Link to='/'>Chính sách và Quy Định</Link></li>
            <li><Link to='/'>Chính sách hoạt động</Link> </li>
        </ul>
    </Menu.Item>
  </Menu>
);

function MenuDropdown() {
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button icon={<MenuOutlined />}></Button>
    </Dropdown>
  );
}

export default MenuDropdown; 
