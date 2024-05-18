import { config, mount, shallowMount } from '@vue/test-utils';
import HealthCheck from '@/components/HealthCheck.vue';
import { test, expect, describe, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import {
	HealthCheckStatus,
	HealthCheckTitle,
	UserStatus,
} from '@/models/types/HealthTableTypes.mjs';
import type { ComponentOptions } from 'vue';
import { useTableStore } from '@/stores/tableStore';

describe('HealthCheck tests', () => {
	let wrapper: ComponentOptions = {};
	beforeEach(() => {
		wrapper = shallowMount(HealthCheck, {
			attachTo: document.body,
			props: {
				user: mockUser,
			},
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							users: {
								isLoaded: true,
								checkboxStates: [
									{
										parent: false,
										checks: [false, false, false],
									},
								],
							},
						},
					}),
				],
			},
		});
	});

	test('component renders correctly', () => {
		expect(wrapper.findAll('.row-head')).toHaveLength(1);
		expect(wrapper.findAll('.row-head div')).toHaveLength(9);
		expect(wrapper.findAll('.row-head .col')).toHaveLength(6);
		expect(wrapper.findAll('.button-component')).toHaveLength(5);
		expect(wrapper.findAll('.checks')).toHaveLength(1);
		expect(wrapper.findAll('.checks div.row')).toHaveLength(3);
		expect(
			wrapper.findAll('.checks div.row:first-child div.col')
		).toHaveLength(6);
		expect(wrapper.findAll('.checks div.row:first-child div')).toHaveLength(
			9
		);
		expect(wrapper.findAll('.checkbox-component')).toHaveLength(4);
		expect(wrapper.findAll('.status-badge')).toHaveLength(4);
		expect(wrapper.findAll('.more')).toHaveLength(4);
	});

	test('rows data from props is set correctly', () => {
		expect(wrapper.find('.row-head').classes()).toContain('userid-0');
		expect(wrapper.find('.row-head .col-2').text()).toMatch(
			'Vardas Pavardė (1/3)'
		);
		expect(wrapper.findAll('.row-head .col').at(2)?.text()).toMatch(
			'Sandelys'
		);
		expect(wrapper.findAll('.row-head .col').at(4)?.text()).toMatch(
			'Specialistas'
		);
		expect(wrapper.findAll('.checks .row.userid-0')).toHaveLength(3);
		expect(
			wrapper.findAll('.checks .row:nth-child(1) .col').at(1)?.text()
		).toMatch('Fizinės sveikatos patikra');
		expect(
			wrapper.findAll('.checks .row:nth-child(1) .col').at(2)?.text()
		).toMatch('0000');
		expect(
			wrapper.findAll('.checks .row:nth-child(1) .col').at(3)?.text()
		).toMatch('2024-01-01');
		expect(
			wrapper.findAll('.checks .row:nth-child(2) .col').at(1)?.text()
		).toMatch('Darbo prie kompiuterio pažyma');
		expect(
			wrapper.findAll('.checks .row:nth-child(2) .col').at(2)?.text()
		).toMatch('0001');
		expect(
			wrapper.findAll('.checks .row:nth-child(2) .col').at(3)?.text()
		).toMatch('2024-01-01');
		expect(
			wrapper.findAll('.checks .row:nth-child(3) .col').at(1)?.text()
		).toMatch('Psichinės sveikatos patikra');
		expect(
			wrapper.findAll('.checks .row:nth-child(3) .col').at(2)?.text()
		).toMatch('0002');
		expect(
			wrapper.findAll('.checks .row:nth-child(3) .col').at(3)?.text()
		).toMatch('2024-09-09');
	});

	test('dropdown works corectly', async () => {
		expect(wrapper.find('.checks.userid-0').classes()).not.toContain(
			'opened'
		);
		await wrapper.find('.row-head').trigger('click');
		expect(wrapper.find('.checks.userid-0').classes()).toContain('opened');
		expect(wrapper.vm.isClosed).toBeFalsy();
	});

	test('parent checkbox works corectly', async () => {
		wrapper = mount(HealthCheck, {
			attachTo: document.body,
			props: { user: mockUser },
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							users: {
								isLoaded: true,
								checkboxStates: [
									{
										parent: false,
										checks: [false, false, false],
									},
								],
								allUsers: [mockUser],
							},
						},
					}),
				],
			},
		});
		expect(
			wrapper.get('.row-head .checkbox-component input').element.checked
		).toBeFalsy();
		expect(
			wrapper.findAll('.checks .checkbox-component input').at(0).element
				.checked
		).toBeFalsy();
		expect(
			wrapper.findAll('.checks .checkbox-component input').at(1).element
				.checked
		).toBeFalsy();
		expect(
			wrapper.findAll('.checks .checkbox-component input').at(2).element
				.checked
		).toBeFalsy();
		expect(useTableStore().checkboxStates[0].parent).toBeFalsy();
		expect(useTableStore().checkboxStates[0].checks).toStrictEqual([
			false,
			false,
			false,
		]);

		await wrapper
			.get('.row-head .checkbox-component label')
			.trigger('click');

		expect(
			wrapper.get('.row-head .checkbox-component input').element.checked
		).toBeTruthy();
		expect(
			wrapper.findAll('.checks .checkbox-component input').at(0).element
				.checked
		).toBeTruthy();
		expect(
			wrapper.findAll('.checks .checkbox-component input').at(1).element
				.checked
		).toBeTruthy();
		expect(
			wrapper.findAll('.checks .checkbox-component input').at(2).element
				.checked
		).toBeTruthy();
		expect(useTableStore().checkboxStates[0].parent).toBeTruthy();
		expect(useTableStore().checkboxStates[0].checks).toStrictEqual([
			true,
			true,
			true,
		]);
	});
});

config.global.stubs = { HealthCheck };
config.global.mocks = { iconsPath: '' };

const mockUser = {
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
			status: HealthCheckStatus.Expired,
		},
		{
			title: HealthCheckTitle.PC,
			code: '0001',
			dateTo: '2024-01-01',
			status: HealthCheckStatus.Expired,
		},
		{
			title: HealthCheckTitle.Emotional,
			code: '0002',
			dateTo: '2024-09-09',
			status: HealthCheckStatus.Active,
		},
	],
	id: 0,
};
