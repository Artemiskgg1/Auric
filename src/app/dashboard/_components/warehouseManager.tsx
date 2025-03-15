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
import { PlusCircle } from "lucide-react";

interface Warehouse {
  id: string;
  name: string;
}

interface WarehouseManagerProps {
  warehouses: Warehouse[];
  setWarehouses: (warehouses: Warehouse[]) => void;
}

const WarehouseManager: React.FC<WarehouseManagerProps> = ({
  warehouses,
  setWarehouses,
}) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const addWarehouse = () => {
    if (!name.trim()) return;
    setWarehouses([...warehouses, { id: String(warehouses.length + 1), name }]);
    setName("");
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
