import type {
  IUserRawData,
  IHealthTableLoader,
  IUserStore,
} from "@/models/types/HealthTableTypes.mjs";
import User from "./models/User";

/* Class for downloading data from storage
 *  and initializing table content
 *
 * @param store : IUserStore
 *
 */

export default class HealthTableLoader implements IHealthTableLoader {
  store: IUserStore;
  public static count: number;

  constructor(store: IUserStore) {
    this.store = store;
    HealthTableLoader.count = 0;
  }

  // Get user data from specified file. Format of 15 columns, each row describes one entry
  async load(path: string) {
    try {
      const response = await fetch(new Request(path));
      const text = await response.text();
      const lines = text.split("\n");
      HealthTableLoader.count = lines.length - 3;
      this.parseUsers(lines);
    } catch (error) {
      this.store.error.value = <TypeError>error;
    }
  }

  async parseUsers(lines: string[]) {
    const parse = (data: string[]) => {
      return new Promise((resolve) => {
        data.slice(0, data.length - 2).forEach((line, index) => {
          this.parseUser(line, index);
          if (data[index+1] === '') {
            resolve(true);
          }
        });
      });
    }
    await parse(lines).catch(() => new Error("Error while loading all users data."));
  }

  // Create user object by using data from single line
  parseUser(line: string, index: number) {
    if (index === 0) return;
    const fields = line.split(",");
    if (fields.length !== 15)
      throw new Error(
        "Unreadable data format found on line " + index + ". 15 words required."
      );

    const fieldNames: string[] = [
      "id",
      "firstName",
      "lastName",
      "status",
      "jobTitle",
      "department",
      "checkCode_1",
      "expiration_1",
      "checkStatus_1",
      "checkCode_2",
      "expiration_2",
      "checkStatus_2",
      "checkCode_3",
      "expiration_3",
      "checkStatus_3",
    ];

    const userData: IUserRawData = <IUserRawData>{};
    fields.map(function (field, index) {
      const key = fieldNames[index];
      userData[key] = field;
    });
    this.store.addUser(new User(userData));
  }
}
