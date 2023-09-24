import React, { useState } from "react";

import { Button, Card } from "@radix-ui/themes";

export const LendAssetCard: React.FC = () => {
  const assets = ["BTC", "USDC", "ETH"];
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [inputAmount, setInputAmount] = useState("");

  return (
    <div className="max-w-xl flex flex-col justify-center m-auto">
      <h1 className="text-lg pb-4">Lend Assets</h1>

      <Card className=" p-4 flex">
        <div className="flex-1  border-b border-[#2e3037]">
          <div className="mb-">
            <label className="block text-sm font-bold mb-2">Select Asset</label>
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="w-full px-2 py-1 rounded border"
            >
              {assets.map((asset) => (
                <option key={asset} value={asset}>
                  {asset}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 pt-2">
            <label className="block text-sm font-bold mb-2">Enter Amount</label>
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="0.0"
              className="w-full px-2 py-1 rounded border"
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col justify-between">
          <Button variant="outline" className="mb-2  py-2 px-4">
            Approve
          </Button>
          <Button>Deposit</Button>
        </div>
      </Card>
    </div>
  );
};
