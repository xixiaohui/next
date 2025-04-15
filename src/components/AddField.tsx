// app/components/AddField.tsx
'use client';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from "@/components/ui";

export default function AddFieldButton() {
  const handleAddField = async () => {
    const docRef = doc(db, 'products', '0c8DJmS7foPJikzwXpUv'); // 集合名 + 文档 ID

    try {
      await updateDoc(docRef, {
        category: 'E-glass Fabric',     // 添加新字段
        process: 'BMC',                 // 可多个字段
      });

      alert('字段已添加！');
    } catch (error) {
      console.error('添加字段失败:', error);
    }
  };

  return (
    <Button onClick={handleAddField} className="px-4 py-2 bg-blue-500 text-white">
      添加字段
    </Button>
  );
}
