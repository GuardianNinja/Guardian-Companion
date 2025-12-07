import { Auth, Actor } from "./auth";
import { Alerts } from "./alerts";
import { Config } from "./config";

type GuardianState = "IDLE" | "OBSERVING" | "GUARDIAN_ACTIVE";

export class Guardian {
  private state: GuardianState = "IDLE";
  constructor(private auth: Auth, private alerts: Alerts) {}

  activateGuardianMode(requestor: Actor, context: { alone: boolean }) {
    if (requestor.role === "adult" && Config.auth.requireAdultForGuardianMode) {
      this.state = "GUARDIAN_ACTIVE";
      return { ok: true, message: "Guardian Mode active for adult." };
    }
    if (requestor.role === "child" && Config.auth.allowChildGuardianIfAlone && context.alone) {
      this.state = "GUARDIAN_ACTIVE";
      const alert = {
        childId: requestor.id,
        message: "Your child feels unsafe. Would you like to check in?",
        timestamp: Date.now(),
      };
      this.alerts.sendParentalAlert(alert);
      return { ok: true, message: "Guardian Mode active for child; parental alert sent." };
    }
    return { ok: false, message: "Guardian Mode not permitted in current context." };
  }

  observe() {
    this.state = "OBSERVING";
    return { ok: true, message: "Guardian observing calmly." };
  }

  currentState() {
    return this.state;
  }
}


---
