// utils/getAllBrands.ts
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getAllBrands(): Promise<string[]> {
  const snapshot = await getDocs(collection(db, "products"));

  const brands = new Set<string>();
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.brand) {
      brands.add(data.brand);
    }
  });

  return Array.from(brands);
}
