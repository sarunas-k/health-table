import { type IHealthRecord, HealthCheckTitle, HealthCheckStatus } from "./types/HealthTableTypes.mjs";


class HealthRecord implements IHealthRecord {
  code!: string;
  dateTo!: string;
  status!: HealthCheckStatus;
  title!: HealthCheckTitle;

  constructor(code: string, status: string, expiration: string) {
    if (!code || !status || !expiration) return;
    this.formatRecord(code, status, expiration);
  }

  private formatRecord(code: string, status: string, expiration: string) {
    switch (code) {
      case "0000":
        this.title = HealthCheckTitle.Emotional;
        break;
      case "0001":
        this.title = HealthCheckTitle.Physical;
        break;
      case "0002":
        this.title = HealthCheckTitle.PC;
        break;
      default:
        this.title = <HealthCheckTitle>'Unknown';
        break;
    }
    this.code = code;

    if (status.indexOf('0') !== -1) {
      this.status = HealthCheckStatus.Expired;
    } else if (status.indexOf('-1') !== -1) {
      this.status = HealthCheckStatus.Cancelled;
    } else if (status.indexOf('1') !== -1) {
      this.status = HealthCheckStatus.Active;
    } else {
      this.status = <HealthCheckStatus>'Unknown';
    }

    this.dateTo = expiration ? expiration : 'Unknown';
  }
}

export default HealthRecord;
