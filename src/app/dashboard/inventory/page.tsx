"use client";

import { useState } from "react";
import WarehouseManager from "../_components/warehouseManager";
import InventoryTable from "../_components/inventoryTable";

const InventoryPage = () => {
  const [warehouses, setWarehouses] = useState([
    { id: "1", name: "Warehouse A" },
    { id: "2", name: "Warehouse B" },
  ]);

  return (
    <div className="flex flex-col p-6 mt-3">
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
