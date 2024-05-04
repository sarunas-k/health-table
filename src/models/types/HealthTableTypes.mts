import type { Store } from "pinia";

export interface IUser {
  firstName: string;
  lastName: string;
  department: string;
  status: UserStatus;
  jobTitle: string;
  healthChecks: IHealthRecord[];
  isRowChecked: boolean;
  id: string;
}

export type IUserRawData = {
  [id: string]: string;
  firstName: string;
  lastName: string;
  status: string;
  jobTitle: string;
  department: string;
  checkCode_1: string;
  expiration_1: string;
  checkStatus_1: string;
  checkCode_2: string;
  expiration_2: string;
  checkStatus_2: string;
  checkCode_3: string;
  expiration_3: string;
  checkStatus_3: string;
};

export interface ILoader {
  store: IUserStore;
}

export interface IUserStore {
  createUser: Function,
  addUser: Function,
  getUsers: (limit?: number, page?: number) => IUser[],
  setUsersPerPage: Function,
  setChecked: Function,
  isHeadChecked: boolean,
  setCheckedChildren: Function,
  setCheckedAll: Function
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
  dateTo: string;
  status: HealthCheckStatus;
  isRowChecked: boolean;
}

export enum HealthCheckTitle {
  Emotional = "Psichinės sveikatos patikra",
  Physical = "Fizinės sveikatos patikra",
  PC = "Darbo prie kompiuterio pažyma",
}

export enum BadgeType {
  UserStatus = "user",
  CheckStatus = "check",
}