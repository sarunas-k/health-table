import { defineStore } from 'pinia';
import { computed, ref, watch, type Ref } from 'vue';
import type { IRecordCheckboxes, IUser } from '@/models/types/HealthTableTypes.mjs';
import HealthTableLoader from '@/load';

export const useTableStore = defineStore('users', () => {
    const allUsers: Ref<Array<IUser>> = ref(new Array<IUser>());
    const checkboxStates: Ref<Array<IRecordCheckboxes>> = ref(new Array<IRecordCheckboxes>());
    const perPage = ref(25);
    const page = ref(1);
    const isHeadChecked: Ref<boolean> = ref(false);
    const isLoaded: Ref<boolean> = ref(false);
    const atLeastOneChecked = computed(() => isLoaded.value && checkboxStates.value.find((group) => group.parent === true) ? true : false);
    const allChecked = computed(() => isLoaded.value && checkboxStates.value.find((group) => group.parent === false) ? false : true);
    watch(isHeadChecked, (value) => {
        for (let i = 0; i < allUsers.value.length; i++)
            checkboxStates.value[allUsers.value[i].id] = { parent: value, checks: [ value, value, value ] };
    });
    function addUser(user: IUser) {
            user.id = parseInt(allUsers.value.length.toString());

            checkboxStates.value[user.id] = { parent: false, checks: [false, false, false] };
            allUsers.value.push(user);

            if (allUsers.value.length === HealthTableLoader.count)
                isLoaded.value = true;
    }

    function updateHeadCheckbox() {
        // Table header checkbox is checked when any other checkbox is checked
        isHeadChecked.value = atLeastOneChecked.value;
    }

    function setUsersPerPage(k: number) {
        if (!k)
            return;
        perPage.value = k;
    }

    return {
        addUser,
        setUsersPerPage,
        isHeadChecked,
        allUsers,
        checkboxStates,
        atLeastOneChecked,
        allChecked,
        updateHeadCheckbox,
        perPage,
        page,
        isLoaded
    }
});