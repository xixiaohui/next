"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // 请确保 firebase 配置正确
import { collection, getDocs } from "firebase/firestore";

const getCollectionFields = async (collectionName: string): Promise<string[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    if (!querySnapshot.empty) {
      return Object.keys(querySnapshot.docs[0].data()); // 获取字段名
    }
    return [];
  } catch (error) {
    console.error("Error fetching collection fields:", error);
    return [];
  }
};

export default function FirestoreFieldsPage() {
  const [fields, setFields] = useState<string[]>([]);
  const collectionName = "products"; // 你的 Firestore 集合名称

  useEffect(() => {
    getCollectionFields(collectionName).then(setFields);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Firestore Collection Fields</h1>
      {fields.length > 0 ? (
        <ul className="mt-4 list-disc pl-5">
          {fields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">No fields found or collection is empty.</p>
      )}
    </div>
  );
}


// name
// elongation
// density
// tensileStrength
// fiberType
// brand
// price
// chemicalResistance
// expiryDate
// ecoCertification
// timestamp
// waterAbsorption
// flexuralStrength
// manufactureDate
// unit