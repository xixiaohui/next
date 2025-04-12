"use client";

import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";

interface Props {
  min: number;
  max: number;
  onChange: (range: [number, number]) => void;
}

export default function PriceRangeSelector({ min, max, onChange }: Props) {
  const [range, setRange] = useState<[number, number]>([min, max]);

  useEffect(() => {
    onChange(range);
  }, [range]);

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold mb-6">
        当前价格范围：{range[0]} - {range[1]}
      </h1>
      <Slider
        defaultValue={range}
        min={min}
        max={max}
        step={10}
        onValueChange={(val) => setRange([val[0], val[1]])}
      />
    </div>
  );
}
