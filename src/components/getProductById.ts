import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function getProductById(productId: string) {

  
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    console.log("docSnap.data()===",docSnap.data())

    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Product not found");
  }
}