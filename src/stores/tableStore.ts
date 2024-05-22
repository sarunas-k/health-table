import { defineStore } from 'pinia';
import { computed, ref, type Ref } from 'vue';
import type {
	IRecordCheckboxes,
	IUser,
} from '@/models/types/HealthTableTypes.mjs';

export const useTableStore = defineStore('users', () => {
	const allUsers: Ref<Array<IUser>> = ref(new Array<IUser>());
	const checkboxStates: Ref<Array<IRecordCheckboxes>> = ref(new Array<IRecordCheckboxes>());
	const perPage = ref(25);
	const page = ref(1);
	const isHeadChecked: Ref<boolean> = ref(false);
	const isLoaded: Ref<boolean> = ref(false);
	const error = ref('');
	const fetchedRows = ref(0);
	const length = ref(0);
	const atLeastOneChecked = computed(() => {
		if (!isLoaded.value)
			return false;

		// True, when one or more parent checkboxes is checked
		// False, when all are not checked
		if (checkboxStates.value
				.filter(function(group) { return typeof group !== 'undefined' })
				.find((function(group) { return group.parent === true }))
			) return true
		else
			return false;

	});
	const allChecked = computed(() => {
		if (!isLoaded.value)
			return false;

		// True, when every parent checkbox is checked
		// False, when one or more parent checkboxes aren't checked
		return !(checkboxStates.value
				.filter(function(group) { return typeof group !== 'undefined' })
				.find((function(group) { return (group.parent === false || group.checks.includes(false))  })));

	});

	function setLoaded(value: boolean) {
		isLoaded.value = value;
		console.log('Loaded:', value);
	}

	function setLength(value: number) {
		length.value = value;
		console.log('Length:', value);
	}

	function setError(value: string) {
		error.value = value;
		console.log('Error:', value);
	}

	function getUser(id: number) {
		return allUsers.value[id];
	}

	function addUser(user: IUser) {
		checkboxStates.value[user.id] = {
			parent: false,
			checks: [false, false, false],
		};
		allUsers.value.push(user);
		fetchedRows.value++;
	}

	function updateHeadCheckbox() {
		// Table header checkbox is checked when any other checkbox is checked
		isHeadChecked.value = atLeastOneChecked.value;
	}

	function setUsersPerPage(k: number) {
		if (!k) return;
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
		isLoaded,
		error,
		fetchedRows,
		setLoaded,
		setLength,
		setError,
		length,
		getUser
	};
});
