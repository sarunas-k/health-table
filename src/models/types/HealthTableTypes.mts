export interface IUser {
  firstName: string;
  lastName: string;
  department: string;
  status: UserStatus;
  jobTitle: string;
  healthChecks: IHealthRecord[];
}

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum HealthCheckStatus {
  Active = "valid",
  Expired = "expired",
  Cancelled = "cancelled",
}

export interface IHealthRecord {
  title: HealthCheckTitle;
  code: string;
  dateFrom: string;
  status: HealthCheckStatus;
}

export interface IHealthRecordData {
  code: string;
  status: string;
  'issue-date': string
}

export enum HealthCheckTitle {
  Emotional = "Psichinės sveikatos patikra",
  Physical = "Fizinės sveikatos patikra",
  PC = "Darbo prie kompiuterio pažyma",
}

export enum BadgeType {
  UserStatus = 'user',
  CheckStatus = 'check'
}
