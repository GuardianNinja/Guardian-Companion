export const Config = {
  environment: "local",
  firewall: {
    enableNetworkLayer: false, // local-only by default
    commandValidation: true,
    emotionalFilter: true,
  },
  auth: {
    requireAdultForGuardianMode: true,
    allowChildGuardianIfAlone: true,
    tokenSaltRounds: 12,
  },
  alerts: {
    parentalRelayEnabled: true,
    localRelayOnly: true, // no external servers by default
  },
  telemetry: {
    enableLocalLogs: true,
    redactSensitive: true,
    networkTelemetry: false,
  },
  simulation: {
    years: 10,
    stressLevels: ["normal", "backward-forward", "reverse-barrel-roll", "forward-replay"],
  },
};


---
