import React from "react";
import { Wallet, TrendingUp, ArrowUpCircle, AlertCircle } from "lucide-react";

const WalletBalance = ({ balance }) => {
  const maxBalance = 6000;
  const segments = 4;
  const segmentSize = maxBalance / segments;
  const percentage = Math.min((balance / maxBalance) * 100, 100);

  const getStatusInfo = () => {
    if (balance <= segmentSize) {
      return {
        color: "text-red-500",
        bgColor: "bg-red-500",
        lightBg: "bg-red-50",
        icon: AlertCircle,
        text: "Low Balance",
        description: "Consider adding funds",
      };
    } else if (balance <= segmentSize * 2) {
      return {
        color: "text-orange-500",
        bgColor: "bg-orange-500",
        lightBg: "bg-orange-50",
        icon: TrendingUp,
        text: "Building Up",
        description: "Making progress",
      };
    } else if (balance <= segmentSize * 3) {
      return {
        color: "text-yellow-500",
        bgColor: "bg-yellow-500",
        lightBg: "bg-yellow-50",
        icon: TrendingUp,
        text: "Good Standing",
        description: "Well maintained",
      };
    } else {
      return {
        color: "text-green-500",
        bgColor: "bg-green-500",
        lightBg: "bg-green-50",
        icon: ArrowUpCircle,
        text: "Excellent",
        description: "Maximum efficiency",
      };
    }
  };

  const status = getStatusInfo();
  const StatusIcon = status.icon;

  return (
    <div className="p-6 rounded-2xl bg-white border shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${status.lightBg}`}>
              <Wallet className={`w-6 h-6 ${status.color}`} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Available Balance</h2>
              <p className="text-sm text-gray-500">
                Maximum limit: ${maxBalance.toLocaleString()}
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.lightBg} ${status.color}`}
          >
            <StatusIcon size={16} />
            <span className="text-sm font-medium">{status.text}</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${status.color}`}>
              ₹{balance.toLocaleString()}
            </span>
            <span className="text-gray-400 font-medium">
              / ₹{maxBalance.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{status.description}</p>
        </div>
        <div className="relative">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${status.bgColor} transition-all duration-700 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="absolute top-0 w-full flex justify-between px-[2px]">
            {[0, 1, 2, 3, 4].map((segment) => (
              <div
                key={segment}
                className={`w-0.5 h-3 ${
                  segment === 0 || segment === 4 ? "bg-transparent" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs font-medium">
          {[0, 1, 2, 3, 4].map((segment) => (
            <div
              key={segment}
              className={`text-gray-500 ${
                segment === 0
                  ? "text-left"
                  : segment === 4
                  ? "text-right"
                  : "text-center"
              }`}
            >
              ₹{(segment * segmentSize).toLocaleString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
