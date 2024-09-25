interface Signal {
  prediction: string;
  prediction_reference_price: string;
  signal_birth_time: string;
  signal_publication_time: string;
  stop_loss: string;
  stop_loss_price: string;
  take_profit: string;
  take_profit_price: string;
  threshold: string;
  vola_50: string;
}

export interface SignalCardProps {
  signal: Signal;
}

export interface SignalApiResponse {
  signals: [string, Signal][];
}

export interface SignalApiResponseTest {
  signals: Signal[];
}