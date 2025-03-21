import React, { useState } from "react";
import Papa from "papaparse";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert("请选择 CSV 文件");
    setUploading(true);

    Papa.parse(file, {
      complete: async (result) => {
        const [headers, ...rows] = result.data;
        
        const formattedData = rows.map((row) => ({
          name: row[0],
          brand: row[1],
          price: parseFloat(row[2]),
          unit: row[3],
          fiberType: row[4],
          density: parseFloat(row[5]),
          tensileStrength: parseFloat(row[6]),
          flexuralStrength: parseFloat(row[7]),
          waterAbsorption: parseFloat(row[8]),
          elongation: parseFloat(row[9]),
          chemicalResistance: row[10],
          ecoCertification: row[11],
          manufactureDate: row[12],
          expiryDate: row[13]
        }));

        try {
          const batch = formattedData.map((product) => addDoc(collection(db, "products"), product));
          await Promise.all(batch);
          alert("CSV 数据上传成功");
        } catch (error) {
          console.error("上传失败", error);
          alert("上传失败");
        } finally {
          setUploading(false);
        }
      },
      header: false,
      skipEmptyLines: true
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">上传玻璃纤维产品 CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="p-2 bg-green-500 text-white rounded" disabled={uploading}>
        {uploading ? "上传中..." : "上传 CSV"}
      </button>
    </div>
  );
};

export default UploadCSV;
