"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Filters {
  category: string;
  brand: string;
  priceRange: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function ProductFilterControls({ filters, onChange }: Props) {
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Category */}
      <div>
        <Label className="text-amber-400">Category</Label>
        <Select
          value={filters.category}
          onValueChange={(v) => update("category", v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Yarn">Yarn</SelectItem>
            <SelectItem value="Direct Roving">Direct Roving</SelectItem>
            <SelectItem value="E-glass Fabric">E-glass Fabric</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Brand */}
      <div>
        <Label className="text-amber-400">Brand</Label>
        <Select value={filters.brand} onValueChange={(v) => update("brand", v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="China Jushi">China Jushi</SelectItem>
            <SelectItem value="AGY">AGY</SelectItem>
            <SelectItem value="CPIC">CPIC</SelectItem>
            <SelectItem value="Shangwei">Shangwei</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-amber-400">Price</Label>
        <Select
          value={filters.priceRange}
          onValueChange={(v) => update("priceRange", v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0-50">Under $50</SelectItem>
            <SelectItem value="50-100">$50 – $100</SelectItem>
            <SelectItem value="100-1000">Above $100</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
