"use client"; // 由于使用客户端动画，添加此指令
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import  CustomButton  from "@/components/CustomButton";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      {/* Bento Grid Features */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-2 md:row-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Powerful Features</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Unlock a suite of tools designed to scale your business effortlessly.
              </p>
              <Button variant="link" className="mt-4 p-0">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }}>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Fast Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Optimized with Next.js for blazing-fast load times.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Scalable</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Grow without limits.</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Secure</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Built with security in mind.</p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}