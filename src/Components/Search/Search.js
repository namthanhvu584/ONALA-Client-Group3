import React, { useState, useEffect } from "react";
import { Input, message } from "antd";
import axios from "axios";
import "./Search.css";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce"; // Import debounce để tối ưu API call

const { Search } = Input;

const SearchBar = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); // Lưu kết quả tìm kiếm
  const [query, setQuery] = useState(""); // Lưu từ khóa tìm kiếm

  // Gọi API mỗi khi query thay đổi (debounce 300ms để tối ưu)
  const fetchResults = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/food?q=${searchTerm}`);
      setResults(response.data.food);
    } catch (error) {
      message.error("Lỗi khi tìm kiếm. Vui lòng thử lại!");
    }
    setLoading(false);
  };

  // Debounce function để giảm số lần gọi API
  const debouncedSearch = debounce(fetchResults, 300);

  // Khi người dùng nhập, cập nhật query và gọi API
  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div style={{ position: "relative", width: "350px" }}>
      <Search
        placeholder="Nhập từ khóa tìm kiếm..."
        allowClear
        size="large"
        value={query}
        onChange={handleChange} // Gọi khi nhập chữ
        loading={loading}
      />
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <div key={item.food_id} onClick={() => window.location.href = `/food/${item.food_id}`} style={{marginTop:'10px'}}>
              <div className="result" style={{ display: "flex", cursor: "pointer" }}>
                <img src={item.image_url} style={{ height: "90px", width: '90px' }} alt={item.name} />
                <p style={{ fontWeight: "bold" }}>
                  {item.name} - {Number(item.price).toLocaleString("vi-VN")} đ
                </p>
              </div>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
};

export default SearchBar;
