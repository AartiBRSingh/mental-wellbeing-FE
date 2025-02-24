import React from "react";
import { Wallet } from "lucide-react";

const WalletBalance = ({ balance }) => {
  const maxBalance = 6000;
  const segments = 4;
  const segmentSize = maxBalance / segments;

  // Determine color based on balance range
  const getColorClass = () => {
    if (balance <= segmentSize) {
      // 0-1500
      return "text-red-600 bg-red-100";
    } else if (balance <= segmentSize * 2) {
      // 1501-3000
      return "text-orange-600 bg-orange-100";
    } else if (balance <= segmentSize * 3) {
      // 3001-4500
      return "text-yellow-600 bg-yellow-100";
    } else {
      // 4501-6000
      return "text-green-600 bg-green-100";
    }
  };

  // Calculate percentage for progress bar
  const percentage = Math.min((balance / maxBalance) * 100, 100);

  return (
    <div className="p-4 rounded-lg border shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <Wallet className={getColorClass()} />
        <span className="font-semibold text-gray-700">Wallet Balance</span>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className={`text-2xl font-bold ${getColorClass()}`}>
          ${balance.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">
          / ${maxBalance.toLocaleString()}
        </span>
      </div>

      {/* Progress bar background */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        {/* Progress bar fill */}
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            percentage <= 25
              ? "bg-red-500"
              : percentage <= 50
              ? "bg-orange-500"
              : percentage <= 75
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Segment markers */}
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>$0</span>
        <span>${segmentSize.toLocaleString()}</span>
        <span>${(segmentSize * 2).toLocaleString()}</span>
        <span>${(segmentSize * 3).toLocaleString()}</span>
        <span>${maxBalance.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default WalletBalance;
