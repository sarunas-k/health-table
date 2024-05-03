import { type IHealthRecord, type IHealthRecordData, HealthCheckTitle, HealthCheckStatus } from "./types/HealthTableTypes.mjs";


class HealthRecord implements IHealthRecord {
  code!: string;
  dateFrom!: string;
  status!: HealthCheckStatus;
  title!: HealthCheckTitle;
  isRowChecked: boolean = false;

  constructor(recordJson: IHealthRecordData) {
    if (!recordJson) return;
    this.parseRecord(recordJson);
  }

  private parseRecord(data: IHealthRecordData) {
    switch (data.code) {
      case "0000":
        this.title = HealthCheckTitle.Emotional;
        break;
      case "0001":
        this.title = HealthCheckTitle.Physical;
        break;
      case "0002":
        this.title = HealthCheckTitle.PC;
        break;
    }
    this.code = data.code;

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

    this.dateFrom = data['issue-date'].slice(0, 10);
  }
}

export default HealthRecord;
