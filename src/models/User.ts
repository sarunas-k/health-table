import { type IUser, type IHealthRecord, UserStatus } from './types/HealthTableTypes.mjs';
import HealthRecord from './HealthRecord';

class User implements IUser {
    firstName!: string;
    lastName!: string;
    department!: string;
    status!: UserStatus;
    jobTitle!: string;
    healthChecks!: IHealthRecord[];
    isRowChecked: boolean = false;
    id!: string;

    constructor(userData: string | JSON) {
        if (!userData)
            return;

        this.parseUserData(userData);
    }

    private parseUserData(data: string | JSON): void {
        let user;
        if (data instanceof Object) {
            user = data;
        } else {
            user = JSON.parse(data);
        }
        this.firstName = user['first-name'];
        this.lastName = user['last-name'];
        this.department = user['department'];
        const userStatus = user['status'];
        if (userStatus === '1')
            this.status = UserStatus.Active;
        else if (userStatus === '0')
            this.status = UserStatus.Inactive;
        else if (userStatus === '-1')
            this.status = UserStatus.Inactive;
        this.jobTitle = user['job-title'];
        this.healthChecks = new Array<HealthRecord>;
        for (let i = 0; i < user['health-checks'].length; i++) {
            this.healthChecks.push(new HealthRecord(user['health-checks'][i]));
        }
    }
}

export default User;