import type { IUser } from "@/models/types/HealthTableTypes.mjs";
import type { Store } from "pinia";
import { useTableStore } from "@/stores/tableStore";

/* Class for downloading data from storage
 *  and initializing table content
 *
 * @param store : Store<"users">
 *
 */

export default class Loader {
  store: Store<"users"> = useTableStore();

  constructor(store: Store<"users">) {
    this.store = store;
  }

  async load(path: string) {
    console.log(path);
    try {
      const request: Request = new Request(path);
      fetch(request)
        .then((response: Response) => {
          return response.json();
        })
        .then((data) => this.setUsersData(data.records))
        .finally(() => console.log('Done'));
    } catch {
      throw new Error("Couldn't load the file. Check if URL is correct.");
    }
  }

  setUsersData(usersJson: any): void {
    if (!usersJson) return;

    for (let i = 0; i < usersJson.length; i++) {
        this.store.createUser(usersJson[i]);
    }
    usersJson.forEach( (element: IUser) => {
      this.store.createUser(element);
    });
  }
}
