import { Config } from "./config";

export type Command = { type: string; payload?: any; actorRole: "adult" | "child"; timestamp: number };

export class Firewall {
  private blockedPatterns = [/inject/i, /override-root/i, /weapon/i];

  validateNetwork(_packet: unknown) {
    if (!Config.firewall.enableNetworkLayer) return { allowed: true, reason: "network disabled" };
    // Placeholder: add allowlist/denylist logic
    return { allowed: true, reason: "allowlist" };
  }

  validateCommand(cmd: Command) {
    if (!Config.firewall.commandValidation) return { allowed: true, reason: "validation disabled" };
    const serialized = JSON.stringify(cmd).toLowerCase();
    if (this.blockedPatterns.some((p) => p.test(serialized))) {
      return { allowed: false, reason: "blocked pattern detected" };
    }
    if (cmd.type.startsWith("device.") && cmd.actorRole === "child") {
      // Example: kids can ask to play, but guardian-only actions are limited
      return { allowed: true, reason: "child device request allowed" };
    }
    return { allowed: true, reason: "validated" };
  }

  emotionalFilter(inputText: string) {
    if (!Config.firewall.emotionalFilter) return { allowed: true, reason: "filter disabled" };
    const toxicMarkers = [/threat/i, /coerce/i, /shame/i, /violence/i];
    const flagged = toxicMarkers.some((m) => m.test(inputText.toLowerCase()));
    return flagged ? { allowed: false, reason: "emotional filter: harmful input" } : { allowed: true, reason: "clear" };
  }
}


---
