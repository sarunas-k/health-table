import { defineStore } from 'pinia';
import User from '@/models/User';
import { ref } from 'vue';
import type { IHealthRecord, IUser } from '@/models/types/HealthTableTypes.mjs';

export const useTableStore = defineStore('users', () => {
    const allUsers: any = ref([]);
    const perPage = ref(5);
    const isHeadChecked = ref(false);

    function createUser(data: string | JSON) {
        if (!data)
            return;
        allUsers.value.push(new User(data));
    }

    function getUsers(limit: number = perPage.value, page: number = 1): Array<User> {
        if (allUsers.value.length <= limit || allUsers.value.length <= page * limit)
            return allUsers.value;

        if (page === 1)
            return allUsers.value.slice(0, limit);

        return allUsers.value.slice((page-1) * limit, limit);
    }

    function setChecked(userId: string, checked: boolean) {
        allUsers.value.filter((user: User) => user.id !== userId).isRowChecked = checked;
    }

    function setCheckedAll(checked: boolean) {
        allUsers.value.forEach((user: IUser) => {
            user.healthChecks.forEach((c: IHealthRecord) => c.isRowChecked = checked);
            user.isRowChecked = checked;
        });
    }

    function setCheckedChildren(user: User, checked: boolean) {
        user.isRowChecked = checked;
        user.healthChecks.forEach((check: any) => check.isRowChecked = checked);
    }

    function setUsersPerPage(k: number) {
        if (!k)
            return;
        perPage.value = k;
    }

    return {
        createUser,
        getUsers,
        setUsersPerPage,
        setChecked,
        isHeadChecked,
        setCheckedChildren,
        setCheckedAll
    }
});