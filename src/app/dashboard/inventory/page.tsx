"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

const InventoryPage = () => {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Medical Kit",
      quantity: 50,
      category: "Medical",
      status: "Available",
    },
    {
      id: 2,
      name: "Tents",
      quantity: 20,
      category: "Shelter",
      status: "Low Stock",
    },
  ]);

  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <div className="container mx-auto mt-7 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
        {isAdmin && (
          <Button className="flex items-center">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Item
          </Button>
        )}
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search inventory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            {isAdmin && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.category}</TableCell>
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
  );
};

export default InventoryPage;
