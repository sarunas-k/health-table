import { expect, beforeEach, describe, it } from 'vitest';
import {
	HealthCheckStatus,
	HealthCheckTitle,
	UserStatus
} from '@/models/types/HealthTableTypes.mjs';
import { useTableStore } from '@/stores/tableStore';
import { createPinia, setActivePinia } from 'pinia';
const defaultProps = {
	user: {
		firstName: 'Vardas',
		lastName: 'Pavardė',
		department: 'Sandelys',
		status: UserStatus.Active,
		jobTitle: 'Specialistas',
		healthChecks: [
			{
				title: HealthCheckTitle.Physical,
				code: '0000',
				dateTo: '2024-01-01',
				status: HealthCheckStatus.Expired
			},
			{
				title: HealthCheckTitle.PC,
				code: '0001',
				dateTo: '2024-01-01',
				status: HealthCheckStatus.Expired
			},
			{
				title: HealthCheckTitle.Emotional,
				code: '0002',
				dateTo: '2024-09-09',
				status: HealthCheckStatus.Active
			}
		],
		id: 0
	}
};
describe('Table Store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('can add users', () => {
		const store = useTableStore();
		expect(store.allUsers).toHaveLength(0);
		store.addUser(defaultProps.user);
		store.addUser(defaultProps.user);
		expect(store.allUsers).toHaveLength(2);
		expect(store.allUsers[0].healthChecks).toHaveLength(3);
		expect(store.checkboxStates[0].checks).toHaveLength(3);
	});

	it('checkbox states are counted correctly', () => {
		const store = useTableStore();
		store.addUser(defaultProps.user);
		store.addUser(defaultProps.user);
		store.isLoaded = true;
		expect(store.atLeastOneChecked).toBeFalsy();
		expect(store.allChecked).toBeFalsy();
		expect(store.isHeadChecked).toBeFalsy();

		store.checkboxStates[0].parent = true;
		store.updateHeadCheckbox();
		expect(store.atLeastOneChecked).toBeTruthy();
		expect(store.allChecked).toBeFalsy();
		expect(store.isHeadChecked).toBeTruthy();

		store.checkboxStates[0] = { parent: true, checks: [true, true, true] };
		store.checkboxStates[1] = { parent: true, checks: [true, true, true] };
		expect(store.allChecked).toBeTruthy();
	});

	it('set user rows per page', () => {
		const store = useTableStore();
		expect(store.perPage).toEqual(25);

		store.setUsersPerPage(50);
		expect(store.perPage).toEqual(50);
	});
});
