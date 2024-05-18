import { config, mount, shallowMount } from '@vue/test-utils';
import HealthCheckTable from '@/components/HealthCheckTable.vue';
import { test, expect, describe } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useTableStore } from '@/stores/tableStore';
import { HealthCheckStatus, HealthCheckTitle, UserStatus } from '@/models/types/HealthTableTypes.mjs';

describe('HealthCheckTable tests', () => {
	test('component renders correctly', () => {
        const wrapper = shallowMount(HealthCheckTable, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        users: {
                            isLoaded: true,
                            allUsers: [{},{}],
                            checkboxStates: [ { parent: false, checks: [false, false, false] } ]
                        }
                    }
                })],
            },
        });
		expect(wrapper.findAll('div.health-check-table')).toHaveLength(1);
		expect(wrapper.findAll('header')).toHaveLength(1);
		expect(wrapper.findAll('header [role=col]')).toHaveLength(9);
		expect(wrapper.findAll('header [role=col]').at(1)?.text()).toMatch('Full name / Health check');
		expect(wrapper.findAll('header [role=col]').at(2)?.text()).toMatch('Code');
		expect(wrapper.findAll('header [role=col]').at(3)?.text()).toMatch('Expiration');
		expect(wrapper.findAll('header [role=col]').at(4)?.text()).toMatch('Status');
		expect(wrapper.findAll('header [role=col]').at(5)?.text()).toMatch('Department');
		expect(wrapper.findAll('header [role=col]').at(6)?.text()).toMatch('User status');
		expect(wrapper.findAll('header [role=col]').at(7)?.text()).toMatch('Job title');
		expect(wrapper.findAll('.checkbox-component')).toHaveLength(1);
		expect(wrapper.findAll('.button-component')).toHaveLength(1);
		expect(wrapper.findAll('.health-check-table-controls')).toHaveLength(1);
	});
    test('refresh button callback test', () => {
        const wrapper = mount(HealthCheckTable, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        users: {
                            isLoaded: true
                        }
                    }
                })],
            },
        });
        wrapper.get('.button-component.refresh-icon').trigger('click');
        expect(wrapper.emitted('table-refresh')).toBeTruthy();
    });
    test('main checkbox test', async () => {
        const wrapper = mount(HealthCheckTable, {
            attachTo: document.body,
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        users: {
                            isLoaded: true,
                            isHeadChecked: false,
                            allUsers: [mockUser],
                            checkboxStates: [{ parent: false, checks: [ false, false, false ] }]
                        }
                    }
                })],
            },
        });
        await wrapper.findAll('.checkbox-component label').at(0)?.trigger('click');
        expect(useTableStore().isHeadChecked).toBeTruthy();
        expect(useTableStore().checkboxStates[0].parent).toBeTruthy();
        expect(useTableStore().checkboxStates[0].checks).toEqual([true, true, true]);
    });
});

config.global.stubs = { HealthCheckTable };
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
