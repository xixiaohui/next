import ProductComparisonChart from "@/components/ProductComparisonChart";

import ProductComparePage from "@/components/ProductComparePage";

export default function Pricing() {
  return (
    <div>
      

      <div className="grid grid-cols-12 gap-4 max-w-[1200px] mx-auto px-4">
        <aside className="col-span-2 bg-white rounded-xl shadow p-4">
          <p className="font-bold">简介/导航</p>
        </aside>

        <main className="col-span-6 bg-white rounded-xl shadow p-4">

          {/* 图表对比 */}
          <ProductComparisonChart />

          {/* 对比参数 */}
          <ProductComparePage />
        </main>

        <aside className="col-span-4 bg-white rounded-xl shadow p-4">
          <p className="font-bold">推荐/广告</p>
        </aside>
      </div>
    </div>
  );
}
