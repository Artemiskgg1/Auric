import { useState } from "react";
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
import { useUser } from "@clerk/nextjs";
import { Pencil, Trash2 } from "lucide-react";

interface Warehouse {
  id: string;
  name: string;
}

interface InventoryTableProps {
  warehouses: Warehouse[];
}

const InventoryTable = ({ warehouses }: InventoryTableProps) => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Medical Kit",
      quantity: 50,
      category: "Medical",
      status: "Available",
      warehouseId: "1",
    },
    {
      id: 2,
      name: "Tents",
      quantity: 20,
      category: "Shelter",
      status: "Low Stock",
      warehouseId: "2",
    },
  ]);

  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <div className="container mx-auto p-6 pt-0">
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
              <TableHead className="w-1/5">Name</TableHead>
              <TableHead className="w-1/6">Quantity</TableHead>
              <TableHead className="w-1/6">Category</TableHead>
              <TableHead className="w-1/5">Warehouse</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              {isAdmin && <TableHead className="w-1/6">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()) &&
                  (selectedWarehouse === "all" ||
                    item.warehouseId === selectedWarehouse)
              )
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {warehouses.find((wh) => wh.id === item.warehouseId)
                      ?.name || "Unknown"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs font-semibold ${
                        item.status === "Available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Button variant="ghost">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
