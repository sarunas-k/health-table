import { type IUser, type IHealthRecord, UserStatus, type IUserRawData } from './types/HealthTableTypes.mjs';
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

    constructor(userData: IUserRawData) {
        if (!userData)
            return;

        this.parseUserData(userData);
    }

    // Init user data fields
    private parseUserData(user: IUserRawData): void {
        this.firstName = user['firstName'];
        this.lastName = user['lastName'];
        this.department = user['department'];
        const userStatus = user['status'];
        if (userStatus === '1')
            this.status = UserStatus.Active;
        else if (userStatus === '0')
            this.status = UserStatus.Inactive;
        else if (userStatus === '-1')
            this.status = UserStatus.Inactive;
        this.jobTitle = user['jobTitle'];

        // Fill user health check array with 3 common checks
        this.healthChecks = new Array<HealthRecord>;
        this.healthChecks.push(new HealthRecord(user.checkCode_1, user.checkStatus_1, user.expiration_1));
        this.healthChecks.push(new HealthRecord(user.checkCode_2, user.checkStatus_2, user.expiration_2));
        this.healthChecks.push(new HealthRecord(user.checkCode_3, user.checkStatus_3, user.expiration_3));
    }
}

export default User;