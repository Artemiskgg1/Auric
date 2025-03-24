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
          setItems(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setItems([]);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

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
            {warehouses.map((wh) => (
              <SelectItem key={wh.id} value={wh.id}>
                {wh.name}
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
                    (item.warehouse && item.warehouse.id === selectedWarehouse)) // Fix here
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
