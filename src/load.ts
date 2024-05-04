import type {
  IUserRawData,
  ILoader,
  IUserStore,
} from "@/models/types/HealthTableTypes.mjs";
import User from "./models/User";

/* Class for downloading data from storage
 *  and initializing table content
 *
 * @param store : IUserStore
 *
 */

export default class Loader implements ILoader {
  store: IUserStore;

  constructor(store: IUserStore) {
    this.store = store;
  }

  // Get user data from specified file. Format of 15 columns, each row describes one entry
  load(path: string) {
    const request = new Request(path);
    try {
    fetch(request)
      .then((response) => response.text())
      .then((value) => {
        const lines = value.split("\n");

        lines
          .slice(0, lines.length - 2)
          .forEach((line, index) => this.parseUser(line, index));
      })
    } catch {
      throw new Error('Couldn\'t get the data with user information.');
    }
  }

  // Create user object by using data from single line
  parseUser(line: string, index: number) {
    if (index === 0) return;
    const fields = line.split(",");
    if (fields.length !== 15)
      throw Error(
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
