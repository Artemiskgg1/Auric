import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

interface Warehouse {
  id: string;
  name: string;
}

export type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
  status: string;
  warehouseId: string;
  warehouse?: Warehouse; // ✅ Add this
};

interface InventoryTableProps {
  warehouses: Warehouse[];
}

const InventoryTable = ({ warehouses }: InventoryTableProps) => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventory");
        const data = await response.json();

        if (Array.isArray(data)) {
          const mappedItems = data.map((item) => ({
            ...item,
            warehouse:
              item.warehouse ||
              warehouses.find((wh) => wh.id === item.warehouseId),
          }));
          setItems(mappedItems);
        } else {
          console.error("Fetched data is not an array:", data);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, [warehouses]); // Include warehouses in the dependency array
  // Include warehouses in the dependency array

  useEffect(() => {
    console.log("Warehouses:", warehouses);
    console.log("Inventory Items:", items);
  }, [warehouses, items]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Select onValueChange={setSelectedWarehouse} value={selectedWarehouse}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {Array.from(
              new Set(items.map((item) => item.warehouse?.name).filter(Boolean))
            ) // Ensure no undefined values
              .map((warehouseName) => (
                <SelectItem key={warehouseName} value={warehouseName as string}>
                  {warehouseName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table className="table-fixed min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Warehouse</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) &&
                  (selectedWarehouse === "all" ||
                    item.warehouse?.name === selectedWarehouse) // ✅ Match with warehouse?.name
              )
              .map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.warehouse?.name || "Unknown"}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
