// components/ProductComparisonSection.js
"use client"

// components/ProductComparisonChart.js

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // 确保 Firebase 配置正确
import { collection, getDocs } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

// 注册 Chart.js 所需模块
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProductComparisonChart = () => {
  const [products, setProducts] = useState([]);
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (event, productNumber) => {
    const selectedProduct = products.find((product) => product.id === event.target.value);
    if (productNumber === 1) {
      setProduct1(selectedProduct);
    } else {
      setProduct2(selectedProduct);
    }
  };

  const generatePerformanceChartData = () => {
    if (!product1 || !product2) return {};

    const labels = ["Density", "Tensile Strength", "Thickness", "Width", "Length"];
    const product1Data = [
      product1.density,
      product1.tensileStrength,
      product1.thickness,
      product1.width,
      product1.length,
    ];
    const product2Data = [
      product2.density,
      product2.tensileStrength,
      product2.thickness,
      product2.width,
      product2.length,
    ];

    return {
      labels: labels,
      datasets: [
        {
          label: product1.name,
          data: product1Data,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: product2.name,
          data: product2Data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const generatePriceChartData = () => {
    if (!product1 || !product2) return {};

    const labels = ["Price"];
    const product1Price = [product1.price];
    const product2Price = [product2.price];

    return {
      labels: labels,
      datasets: [
        {
          label: product1.name,
          data: product1Price,
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: product2.name,
          data: product2Price,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">选择两个玻纤产品进行对比</h1>

      <div className="mb-4">
        <label>选择产品 1：</label>
        <select onChange={(e) => handleProductSelect(e, 1)} className="mt-1 p-1 border border-gray-300 rounded w-full">
          <option value="">选择产品</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label>选择产品 2：</label>
        <select onChange={(e) => handleProductSelect(e, 2)} className="mt-1 p-1 border border-gray-300 rounded w-full">
          <option value="">选择产品</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* 性能对比图表 */}
      {product1 && product2 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">产品性能对比</h2>
          <div className="bg-white p-4 shadow rounded">
            <Bar
              data={generatePerformanceChartData()}
              options={{
                responsive: true,
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                  y: {
                    beginAtZero: true,
                    max: Math.max(
                      product1.density,
                      product2.density,
                      product1.tensileStrength,
                      product2.tensileStrength,
                      product1.thickness,
                      product2.thickness,
                      product1.width,
                      product2.width,
                      product1.length,
                      product2.length
                    ),
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "玻纤产品性能对比",
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* 价格对比图表 */}
      {product1 && product2 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">产品价格对比</h2>
          <div className="bg-white p-4 shadow rounded">
            <Bar
              data={generatePriceChartData()}
              options={{
                responsive: true,
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                  y: {
                    beginAtZero: true,
                    max: Math.max(product1.price, product2.price) * 1.1, // 给价格加点空间
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "玻纤产品价格对比",
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComparisonChart;
