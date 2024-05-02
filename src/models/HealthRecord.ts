import { type IHealthRecord, HealthCheckCode, HealthCheckStatus } from "./types/HealthTableTypes.mjs";


class HealthRecord implements IHealthRecord {
  code!: HealthCheckCode;
  dateFrom!: Date;
  status!: HealthCheckStatus;

  constructor(recordJson: string) {
    if (typeof recordJson.length === "undefined") return;
  }

  private parseRecord(recordJson: string) {
    const data = JSON.parse(recordJson);
    switch (data.code) {
      case "0":
        this.code = HealthCheckCode.Emotional;
        break;
      case "1":
        this.code = HealthCheckCode.Physical;
        break;
      case "2":
        this.code = HealthCheckCode.PC;
        break;
    }

    switch (data.status) {
      case "0":
        this.status = HealthCheckStatus.Expired;
        break;
      case "1":
        this.status = HealthCheckStatus.Active;
        break;
      case "-1":
        this.status = HealthCheckStatus.Cancelled;
        break;
    }

    this.dateFrom = new Date(data.dateFrom);
  }
}

export default HealthRecord;
