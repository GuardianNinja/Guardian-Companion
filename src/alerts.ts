import { Config } from "./config";

export type ParentalAlert = { childId: string; message: string; timestamp: number };

export class Alerts {
  sendParentalAlert(alert: ParentalAlert) {
    if (!Config.alerts.parentalRelayEnabled) return { sent: false, reason: "relay disabled" };
    // Local-only relay (e.g., on-prem message bus)
    console.log(`[PARENTAL ALERT][LOCAL]:`, alert);
    return { sent: true, reason: "local relay" };
  }
}


---
