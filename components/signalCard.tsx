import React from "react";
import { SignalCardProps } from "../types/signal";
import { useEffect, useState } from "react";

export default function SignalCard({ signal }: SignalCardProps) {
  const predictionValue = parseFloat(signal.prediction);
  const thresholdValue = parseFloat(signal.threshold);

  let predictionColor = 'text-gray-800';

  if (!isNaN(predictionValue) && !isNaN(thresholdValue)) {
    if (predictionValue >= thresholdValue) {
      predictionColor = 'text-green-600';
    } else {
      predictionColor = 'text-red-600';
    }
  }

  // State to hold formatted dates for client-side rendering
  const [birthTime, setBirthTime] = useState<string>('');
  const [publicationTime, setPublicationTime] = useState<string>('');

  useEffect(() => {
    // Convert dates on the client side to avoid hydration errors
    setBirthTime(new Date(signal.signal_birth_time).toLocaleString());
    setPublicationTime(new Date(signal.signal_publication_time).toLocaleString());
  }, [signal.signal_birth_time, signal.signal_publication_time]);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-5 gap-5 flex flex-col">
      {/* Header */}
      <div className="flex flex-col">
        {/* <span className="text-sm text-gray-500 truncate" title={signalId}>
          {signalId}
        </span> */}
        <span className={`text-2xl font-bold ${predictionColor}`}>
          {signal.prediction}
        </span>
          <div className="flex flex-col">
            <span className="text-gray-400">Threshold:</span>
            <span>{signal.threshold}</span>
          </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col">
          <span className="text-gray-400">Reference Price:</span>
          <span>${parseFloat(signal.prediction_reference_price).toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400">Volatility (50):</span>
          <span>{signal.vola_50}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400">Stop Loss:</span>
          <span className="text-red-600">
            {Number((parseFloat(signal.stop_loss) * 100).toFixed(2)).toLocaleString()}%
          </span>
          <span>
            ${Number(parseFloat(signal.stop_loss_price).toFixed(2)).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400">Take Profit:</span>
          <span className="text-green-600">
            {Number((parseFloat(signal.take_profit) * 100).toFixed(2)).toLocaleString()}%
          </span>
          <span>
            ${Number(parseFloat(signal.take_profit_price).toFixed(2)).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-5 text-gray-500 text-sm">
        {/* <ClockIcon className="h-5 w-5 mr-1" /> */}
        <div className="flex flex-col">
          <span>Birth:</span>
          <span>{birthTime}</span>
        </div>
        {/* <ClockIcon className="h-5 w-5 mr-1" /> */}
        <div className="flex flex-col">
          <span>Published:</span>
          <span>{publicationTime}</span>
        </div>

      </div>
    </div>

  );
}
