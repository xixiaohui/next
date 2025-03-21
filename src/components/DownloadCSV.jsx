import React from "react";
import Papa from "papaparse";

const generateCSVTemplate = () => {
  const header = [
    "产品名称", "品牌", "价格", "单位", "纤维类型", "密度 (g/cm³)", "抗拉强度 (MPa)",
    "弯曲强度 (MPa)", "吸水率 (%)", "断裂伸长率 (%)", "化学耐性", "环保认证",
    "生产日期", "过期日期"
  ];

  const rows = [
    ["示例产品1", "品牌A", "100", "kg", "E-glass", "2.55", "2400", "350", "0.15", "4.0", "耐酸耐碱", "ISO 14001", "2023-01-01", "2025-01-01"],
    ["示例产品2", "品牌B", "150", "kg", "S-glass", "2.62", "2600", "380", "0.10", "5.0", "耐高温", "ISO 9001", "2023-02-01", "2025-02-01"]
  ];

  return Papa.unparse({ fields: header, data: rows });
};

const downloadCSV = () => {
  const csvData = generateCSVTemplate();
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fiberglass_product_template.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const DownloadCSV = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">下载玻璃纤维产品模板</h1>
      <p>点击下面的按钮下载玻璃纤维产品的 CSV 模板。</p>
      <button onClick={downloadCSV} className="mt-4 p-2 bg-blue-500 text-white rounded">
        下载 CSV 模板
      </button>
    </div>
  );
};

export default DownloadCSV;
