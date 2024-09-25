import React from "react";
import { SignalCardProps } from "../types/signal";

export default function SignalCard({ signal }: SignalCardProps) {
  return (
    <div
      className="flex flex-col gap-1 shadow p-5 border rounded"
    >
      <p>Prediction: {signal.prediction}</p>
      <p>prediction_reference_price: {signal.prediction_reference_price}</p>
      <p>signal_birth_time: {signal.signal_birth_time}</p>
      <p>signal_publication_time: {signal.signal_publication_time}</p>
      <p>stop_loss: {signal.stop_loss}</p>
      <p>stop_loss_price: {signal.stop_loss_price}</p>
      <p>take_profit: {signal.take_profit}</p>
      <p>take_profit_price: {signal.take_profit_price}</p>
      <p>threshold: {signal.threshold}</p>
      <p>vola_50: {signal.vola_50}</p>
    </div>
  );
}
