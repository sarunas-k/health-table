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
  code: HealthCheckCode;
  dateFrom: Date;
  status: HealthCheckStatus;
}

export enum HealthCheckCode {
  Emotional = "Psichinės sveikatos patikra",
  Physical = "Fizinės sveikatos patikra",
  PC = "Darbo prie kompiuterio pažyma",
}

export enum BadgeType {
  UserStatus = 'user',
  CheckStatus = 'check'
}
