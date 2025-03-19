import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$10/mo</p>
            <Button className="mt-4 w-full">Choose Plan</Button>
          </CardContent>
        </Card>
        {/* 更多定价卡片 */}
      </div>
    </div>
  );
}