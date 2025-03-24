"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from "lucide-react";
import { Warehouse } from "@/lib/types";

interface WarehouseManagerProps {
  warehouses: Warehouse[];
  setWarehouses: (warehouses: Warehouse[]) => void;
}

const WarehouseManager: React.FC<WarehouseManagerProps> = ({
  warehouses,
  setWarehouses,
}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [inventory, setInventory] = useState([
    { name: "", quantity: 0, category: "", status: "Available" },
  ]);

  // Add a new inventory item
  const addInventoryItem = () => {
    setInventory([
      ...inventory,
      { name: "", quantity: 0, category: "", status: "Available" },
    ]);
  };

  // Remove an inventory item
  const removeInventoryItem = (index: number) => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    setInventory(updatedInventory);
  };

  // Handle inventory field changes
  const handleInventoryChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedInventory = [...inventory];
    updatedInventory[index] = { ...updatedInventory[index], [field]: value };
    setInventory(updatedInventory);
  };

  // Submit the warehouse with inventory
  const addWarehouse = async () => {
    if (!name.trim() || !location.trim()) return;

    const response = await fetch("/api/warehouse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location, inventory }),
    });

    if (!response.ok) {
      console.error("Error adding warehouse");
      return;
    }

    const newWarehouse = await response.json();
    setWarehouses([...warehouses, newWarehouse]);
    setName("");
    setLocation("");
    setInventory([
      { name: "", quantity: 0, category: "", status: "Available" },
    ]);
    setOpen(false);
  };

  return (
    <div className="p-4 pb-0">
      <div className="flex justify-between items-center mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Warehouse</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Enter warehouse name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Enter warehouse location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-2"
            />

            {/* Inventory Fields */}
            <div className="mt-4 space-y-2">
              <p className="font-semibold">Add Inventory Items:</p>
              {inventory.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Item Name"
                    value={item.name}
                    onChange={(e) =>
                      handleInventoryChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleInventoryChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                  <Input
                    placeholder="Category"
                    value={item.category}
                    onChange={(e) =>
                      handleInventoryChange(index, "category", e.target.value)
                    }
                  />
                  <Button
                    variant="outline"
                    onClick={() => removeInventoryItem(index)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={addInventoryItem} className="w-full mt-2">
              + Add Inventory Item
            </Button>

            <Button onClick={addWarehouse} className="w-full mt-4">
              Save
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WarehouseManager;
