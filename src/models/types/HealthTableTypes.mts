import type { StoreDefinition } from "pinia";
import type { Ref } from "vue";

export interface IUser {
  firstName: string;
  lastName: string;
  department: string;
  status: UserStatus;
  jobTitle: string;
  healthChecks: IHealthRecord[];
  id: number;
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

export interface IHealthTableLoader {
  load: (from?: number, length?: number) => void;
  parseUser: (line: string, index: number) => void;
  parseUsers: (lines: string[]) => void;
}

export interface IUserStore extends StoreDefinition<'users'> {
  addUser: (user: IUser) => void,
  getUsers: (limit?: number, page?: number) => Ref<IUser[]>,
  setUsersPerPage: (k: number) => void,
  isHeadChecked: Ref<boolean>,
  isLoaded: Ref<boolean>,
  allUsers: Ref<Array<IUser>>,
  checkboxStates: Ref<Array<IRecordCheckboxes>>,
  atLeastOneChecked: Ref<boolean>,
  allChecked: Ref<boolean>,
  updateHeadCheckbox: () => void,
  error: Ref<null|TypeError>,
  fetchedRows: Ref<number>,
  setLoaded: (value: boolean) => void;
  setLength: (value: number) => void;
  setError: (error: string) => void;
  getUser: (id: number) => IUser;
  length: Ref<number>
}

export enum UserStatus {
  Active = "aktyvi",
  Inactive = "neaktyvi",
}

export enum HealthCheckStatus {
  Active = "galioja",
  Expired = "baigėsi",
  Cancelled = "negalioja",
}

export interface IHealthRecord {
  title: HealthCheckTitle;
  code: string;
  dateTo: string;
  status: HealthCheckStatus;
}

export interface IRecordCheckboxes {
  parent: boolean,
  checks: [
    boolean,
    boolean,
    boolean
  ]
}

export enum HealthCheckTitle {
  Emotional = "Patikra 1",
  Physical = "Patikra 2",
  PC = "Patikra 3",
}

export enum BadgeType {
  UserStatus = "user",
  CheckStatus = "check",
}

export enum CheckboxType {
  Main,
  Parent,
  Child
}