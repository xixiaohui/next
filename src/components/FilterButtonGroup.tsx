"use client";

import { Button } from "@/components/ui/button";

interface Props {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterButtonGroup({ options, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {options.map((item) => (
        <Button
          key={item}
          variant={active === item ? "default" : "outline"}
          onClick={() => onChange(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
