export default function List({ prediction }) {
  return (
    <div
      key={prediction.id}
      className="flex flex-col gap-1 shadow p-5 border rounded"
    >
      <p>Prediction: {prediction.prediction}</p>
      <p>prediction_reference_price: {prediction.prediction_reference_price}</p>
      <p>signal_birth_time: {prediction.signal_birth_time}</p>
      <p>signal_publication_time: {prediction.signal_publication_time}</p>
      <p>stop_loss: {prediction.stop_loss}</p>
      <p>stop_loss_price: {prediction.stop_loss_price}</p>
      <p>take_profit: {prediction.take_profit}</p>
      <p>take_profit_price: {prediction.take_profit_price}</p>
      <p>threshold: {prediction.threshold}</p>
      <p>vola_50: {prediction.vola_50}</p>
    </div>
  );
}
