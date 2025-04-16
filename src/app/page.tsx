"use client"; // 由于使用客户端动画，添加此指令

import { motion } from "framer-motion";

import  CustomButton  from "@/components/CustomButton";



import DataTable from "@/components/DataTable";

import MyCard from "@/components/MyCard";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold tracking-tight text-gray-900"
        >
          Build Your SaaS with Radiant
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          A modern, customizable template built with Next.js and Tailwind CSS.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <CustomButton />
        </motion.div>
      </section>

   

      <div className="grid grid-cols-10 gap-4">
        
        <div>
          <MyCard />
        </div>
        

        <div className="bg-sky-50 col-span-8 col-start-2 mb-8">

          <QueryClientProvider client={queryClient}>
            <DataTable />  {/* 你的 DataTable 组件会在这个上下文中使用 React Query */}
          </QueryClientProvider>

        </div>

        {/* <div className="bg-sky-200 col-span-8 col-start-2 ...">
          <ProductLists />
        </div> */}

      </div>
      
    
    </div>
  );
}