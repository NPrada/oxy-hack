import React, { useState } from "react";
import { Button } from "./button";

export const LendAssetCard: React.FC = () => {
  const assets = ["BTC", "USDC", "ETH"];
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [inputAmount, setInputAmount] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex max-w-xl m-auto">
      <div className="flex-1 pr-4 border-r border-gray-200">
        <div className="mb-">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Asset
          </label>
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enter Amount
          </label>
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="0.0"
            className="w-full px-2 py-1 rounded border"
          />
        </div>
      </div>

      <div className="pl-4 flex flex-col justify-between">
        <button className="mb-2 bg-green-500 text-white py-2 px-4 rounded">
          Approve
        </button>
        <Button>Deposit</Button>
      </div>
    </div>
  );
};
