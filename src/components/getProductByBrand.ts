// utils/getProductByBrand.ts
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getProductByBrand(brandName: string) {

//   const q2 = query(collection(db, "products"));
//   const querySnapshot2 = await getDocs(q2);
//   querySnapshot2.forEach((doc) => {
//     console.log("品牌：", doc.data().brand);
//   });

  const q = query(collection(db, "products"), where("brand", "==", brandName));
  const querySnapshot = await getDocs(q);

  const products: any[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}
