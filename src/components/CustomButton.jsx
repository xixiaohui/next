// components/CustomButton.jsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CustomButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/dashboard");
  };

  const handleClick2 = () => {
    router.push("/mychart");
  };

  return (
    <div>
      <div>
        <Button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          点击跳转
        </Button>
      </div>

      <div>
        <Button
          onClick={handleClick2}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          价格图表
        </Button>
      </div>
    </div>
  );
}
