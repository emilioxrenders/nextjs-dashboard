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

  const [birthTime, setBirthTime] = useState<string>('');
  const [publicationTime, setPublicationTime] = useState<string>('');
  const [signalAge, setSignalAge] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setBirthTime(new Date(signal.signal_birth_time).toUTCString());
    setPublicationTime(new Date(signal.signal_publication_time).toUTCString());
  }, [signal.signal_birth_time, signal.signal_publication_time]);

  useEffect(() => {
    setIsMounted(true)
    const intervalId = setInterval(() => {
      if (isMounted) {
        const now = new Date();
        const publicationDate = new Date(signal.signal_publication_time);
        const timeDifference = now.getTime() - publicationDate.getTime();

        const totalSeconds = Math.floor(timeDifference / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const days = Math.floor(totalHours / 24);
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        const formattedAge = `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds} second${seconds !== 1 ? 's' : ''}`;

        setSignalAge(formattedAge);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isMounted, signal.signal_publication_time]);

  if (!isMounted) {
    return null;
  }

  return (
    // Section
    <div className="w-full bg-white rounded shadow p-5 gap-5 flex flex-col">
      {/* Section */}
      <div className="flex flex-col">
        <span className={`text-2xl font-bold ${predictionColor}`}>
          {signal.prediction}
        </span>
          <div className="flex flex-col">
            <span className="text-gray-400">Threshold:</span>
            <span>{signal.threshold}</span>
          </div>
      </div>

      {/* Section */}
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

      {/* Section */}
      <div className="grid grid-cols-2 gap-5 text-gray-500 text-sm">
        <div className="flex flex-col">
          <span>Birth (UTC):</span>
          <span>{birthTime}</span>
        </div>
        <div className="flex flex-col">
          <span>Published (UTC):</span>
          <span>{publicationTime}</span>
        </div>
      </div>

      {/* Section */}
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">Signal age:</span>
        <span>{signalAge ? signalAge : "Loading..."}</span>
      </div>
    </div>
  );
}
