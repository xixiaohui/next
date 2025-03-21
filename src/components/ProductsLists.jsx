"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // 请确保 firebase 配置正确
import { collection, getDocs } from "firebase/firestore";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 引入样式

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    priceMin: "",
    priceMax: "",
    unit: "",
    fiberType: "",
    densityMin: "",
    densityMax: "",
    tensileStrengthMin: "",
    tensileStrengthMax: "",
    ecoCertification: "",
    startDate: null, // 开始日期
    endDate: null,   // 结束日期
  });

  // 从 Firebase 获取产品数据
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
      setFilteredProducts(productsList); // 初始时展示所有产品
    };
    fetchProducts();
  }, []);

  // 处理单列过滤
  const handleFilterChange = (e, column) => {
    const value = e.target.value;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [column]: value };
      applyFilters(newFilters);
      return newFilters;
    });
  };

  // 处理日期选择变化
  const handleDateChange = (date, type) => {
    const newFilters = { ...filters, [type]: date };
    setFilters(newFilters);
    applyFilters(newFilters); // 更新筛选
  };

  // 过滤函数
  const applyFilters = (filters) => {
    let filtered = products;

    // 过滤产品名称
    if (filters.name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // 过滤品牌
    if (filters.brand) {
      filtered = filtered.filter((product) =>
        product.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    // 价格范围过滤
    if (filters.priceMin || filters.priceMax) {
      const priceMin = parseFloat(filters.priceMin) || 0;
      const priceMax = parseFloat(filters.priceMax) || Infinity;
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price);
        return price >= priceMin && price <= priceMax;
      });
    }

    // 单位过滤
    if (filters.unit) {
      filtered = filtered.filter((product) =>
        product.unit.toLowerCase().includes(filters.unit.toLowerCase())
      );
    }

    // 纤维类型过滤
    if (filters.fiberType) {
      filtered = filtered.filter((product) =>
        product.fiberType.toLowerCase().includes(filters.fiberType.toLowerCase())
      );
    }

    // 密度范围过滤
    if (filters.densityMin || filters.densityMax) {
      const densityMin = parseFloat(filters.densityMin) || 0;
      const densityMax = parseFloat(filters.densityMax) || Infinity;
      filtered = filtered.filter((product) => {
        const density = parseFloat(product.density);
        return density >= densityMin && density <= densityMax;
      });
    }

    // 拉伸强度范围过滤
    if (filters.tensileStrengthMin || filters.tensileStrengthMax) {
      const tensileStrengthMin = parseFloat(filters.tensileStrengthMin) || 0;
      const tensileStrengthMax = parseFloat(filters.tensileStrengthMax) || Infinity;
      filtered = filtered.filter((product) => {
        const tensileStrength = parseFloat(product.tensileStrength);
        return tensileStrength >= tensileStrengthMin && tensileStrength <= tensileStrengthMax;
      });
    }

    // 生态认证过滤
    if (filters.ecoCertification) {
      filtered = filtered.filter((product) =>
        product.ecoCertification.toLowerCase().includes(filters.ecoCertification.toLowerCase())
      );
    }

    // 时间戳过滤
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter((product) => {
        const productTimestamp = product.timestamp.seconds * 1000; // Firebase timestamp 是秒级时间戳
        const startDateValid = filters.startDate ? new Date(filters.startDate).getTime() <= productTimestamp : true;
        const endDateValid = filters.endDate ? new Date(filters.endDate).getTime() >= productTimestamp : true;
        return startDateValid && endDateValid;
      });
    }

    setFilteredProducts(filtered);
  };

  // 用于从产品数据中提取唯一的筛选项
  const getUniqueValues = (key) => {
    const uniqueValues = [...new Set(products.map((product) => product[key]))];
    return uniqueValues;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">玻璃纤维产品列表</h1>

      {/* 日期选择器 */}
      <div className="mb-4">
        <label>开始日期</label>
        <DatePicker
          selected={filters.startDate}
          onChange={(date) => handleDateChange(date, "startDate")}
          dateFormat="yyyy/MM/dd"
          placeholderText="选择开始日期"
          className="mt-1 p-1 border border-gray-300 rounded"
        />
        <label>结束日期</label>
        <DatePicker
          selected={filters.endDate}
          onChange={(date) => handleDateChange(date, "endDate")}
          dateFormat="yyyy/MM/dd"
          placeholderText="选择结束日期"
          className="mt-1 p-1 border border-gray-300 rounded"
        />
      </div>

      <Table className="table-fixed w-full">
      <TableHeader>
          <TableRow>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                产品名称
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => handleFilterChange(e, "name")}
                  placeholder="搜索产品名称"
                  className="mt-1 p-1 border border-gray-300 rounded w-full"
                />
              </div>
            </TableHead>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                品牌
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange(e, "brand")}
                  className="mt-1 p-1 border border-gray-300 rounded w-full"
                >
                  <option value="">选择品牌</option>
                  {getUniqueValues("brand").map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </TableHead>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                价格
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange(e, "priceMin")}
                    placeholder="最小价格"
                    className="mt-1 p-1 border border-gray-300 rounded w-full"
                  />
                  <input
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange(e, "priceMax")}
                    placeholder="最大价格"
                    className="mt-1 p-1 border border-gray-300 rounded w-full"
                  />
                </div>
              </div>
            </TableHead>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                单位
                <input
                  type="text"
                  value={filters.unit}
                  onChange={(e) => handleFilterChange(e, "unit")}
                  placeholder="搜索单位"
                  className="mt-1 p-1 border border-gray-300 rounded w-full"
                />
              </div>
            </TableHead>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                纤维类型
                <select
                  value={filters.fiberType}
                  onChange={(e) => handleFilterChange(e, "fiberType")}
                  className="mt-1 p-1 border border-gray-300 rounded w-full"
                >
                  <option value="">选择纤维类型</option>
                  {getUniqueValues("fiberType").map((fiberType) => (
                    <option key={fiberType} value={fiberType}>
                      {fiberType}
                    </option>
                  ))}
                </select>
              </div>
            </TableHead>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                密度
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    value={filters.densityMin}
                    onChange={(e) => handleFilterChange(e, "densityMin")}
                    placeholder="最小密度"
                    className="mt-1 p-1 border border-gray-300 rounded w-full"
                  />
                  <input
                    type="number"
                    value={filters.densityMax}
                    onChange={(e) => handleFilterChange(e, "densityMax")}
                    placeholder="最大密度"
                    className="mt-1 p-1 border border-gray-300 rounded w-full"
                  />
                </div>
              </div>
            </TableHead>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                抗拉强度
                <div className="flex flex-col items-start">
                  <input
                    type="number"
                    value={filters.tensileStrengthMin}
                    onChange={(e) => handleFilterChange(e, "tensileStrengthMin")}
                    placeholder="最小抗拉强度"
                    className="mt-1 p-1 border border-gray-300 rounded w-full"
                  />
                  <input
                    type="number"
                    value={filters.tensileStrengthMax}
                    onChange={(e) => handleFilterChange(e, "tensileStrengthMax")}
                    placeholder="最大抗拉强度"
                    className="mt-1 p-1 border border-gray-300 rounded w-full"
                  />
                </div>
              </div>
            </TableHead>
            <TableHead className="w-1/8 py-3">
              <div className="flex flex-col items-start">
                环保认证
                <select
                  value={filters.ecoCertification}
                  onChange={(e) => handleFilterChange(e, "ecoCertification")}
                  className="mt-1 p-1 border border-gray-300 rounded w-full"
                >
                  <option value="">选择环保认证</option>
                  {getUniqueValues("ecoCertification").map((certification) => (
                    <option key={certification} value={certification}>
                      {certification}
                    </option>
                  ))}
                </select>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.unit}</TableCell>
              <TableCell>{product.fiberType}</TableCell>
              <TableCell>{product.density}</TableCell>
              <TableCell>{product.tensileStrength}</TableCell>
              <TableCell>{product.ecoCertification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
