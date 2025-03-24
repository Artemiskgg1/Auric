"use client";

import { useEffect, useState } from "react";
import WarehouseManager from "../_components/warehouseManager";
import InventoryTable from "../_components/inventoryTable";
import { Warehouse } from "@/lib/types";

const InventoryPage = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch("/api/inventory");
      const data = await response.json();
      setWarehouses(data);
    };

    fetchInventory();
  }, [warehouses]); // Re-fetch inventory when warehouses change

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-end">
        <WarehouseManager
          warehouses={warehouses}
          setWarehouses={setWarehouses}
        />
      </div>
      <InventoryTable warehouses={warehouses} />
    </div>
  );
};

export default InventoryPage;
