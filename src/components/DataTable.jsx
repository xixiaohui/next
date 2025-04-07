import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase"; // 请确保 firebase 配置正确
import { collection, getDocs } from "firebase/firestore";

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const DataTable = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["products"], queryFn: fetchData });
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    { accessorKey: "name", header: "Name", cell: (info) => info.getValue() },
    { accessorKey: "brand", header: "Brand", cell: (info) => info.getValue() },
    { accessorKey: "price", header: "Price", cell: (info) => info.getValue() },
    { accessorKey: "elongation", header: "Elongation", cell: (info) => info.getValue() },
    { accessorKey: "fiberType", header: "FiberType", cell: (info) => info.getValue() },
    { accessorKey: "chemicalResistance", header: "ChemicalResistance", cell: (info) => info.getValue() },
    { accessorKey: "ecoCertification", header: "EcoCertification", cell: (info) => info.getValue() },
    { accessorKey: "waterAbsorption", header: "WaterAbsorption", cell: (info) => info.getValue() },
    { accessorKey: "flexuralStrength", header: "FlexuralStrength", cell: (info) => info.getValue() },
    { accessorKey: "manufactureDate", header: "ManufactureDate", cell: (info) => info.getValue() },

  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <Input placeholder="Search..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} className="mb-4" />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-2 mt-4">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
    </div>
  );
};

export default DataTable;
