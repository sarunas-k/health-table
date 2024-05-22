import { config, mount } from '@vue/test-utils';
import HealthCheckTableControls from '@/components/HealthCheckTableControls.vue';
import { test, expect, describe, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useTableStore } from '@/stores/tableStore';
import type { ComponentOptions } from 'vue';

config.global.stubs = { HealthCheckTableControls };
config.global.mocks = { iconsPath: '' };

describe('HealthCheckTableControls tests', () => {
	let wrapper: ComponentOptions;
	beforeEach(() => {
		wrapper = mount(HealthCheckTableControls, {
			attrs: { class: 'health-check-table-controls' },
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							users: {
								allUsers: [{id: 0}, {id: 1}],
								perPage: 50,
                                page: 1,
								length: 2,
							},
						},
					}),
				],
			},
		});
	});
	test('component renders correctly', async () => {
		expect(wrapper.findAll('.health-check-table-controls')).toHaveLength(1);
		expect(wrapper.findAll('.controls-box')).toHaveLength(1);
		expect(wrapper.findAll('.totals')).toHaveLength(1);
		expect(wrapper.findAll('.pages')).toHaveLength(1);
		expect(wrapper.findAll('.pages button.inactive')).toHaveLength(2);
		expect(wrapper.findAll('.jump-to')).toHaveLength(1);
		expect(wrapper.findAll('.page-entries-control')).toHaveLength(1);
		expect(wrapper.findAll('.page-entries-btn')).toHaveLength(3);

		expect(wrapper.get('.totals').text()).toContain('Total: 2');
		expect(wrapper.get('.pages').text()).toContain('Page 1 / 1');
		expect(wrapper.get('.jump-to').text()).toContain('Jump to:');
		expect(wrapper.get('.page-entries-control').text()).toContain('Show: 25  50  100');
		expect(wrapper.findAll('.page-entries-btn').at(0)?.classes()).not.toContain('active');
		expect(wrapper.findAll('.page-entries-btn').at(1)?.classes()).toContain('active');
		expect(wrapper.findAll('.page-entries-btn').at(2)?.classes()).not.toContain('active');
	});
	test('previous/next works correctly', async () => {
        const store = useTableStore();
        store.perPage = 1;
        expect(store.page).toEqual(1);
        await wrapper.find('button.next-icon').trigger('click');
        await wrapper.find('button.next-icon').trigger('click');
        expect(store.page).toEqual(2);
        await wrapper.find('button.previous-icon').trigger('click');
        await wrapper.find('button.previous-icon').trigger('click');
        expect(store.page).toEqual(1);
    });
    test('jump-to page works correctly', async () => {
        const store = useTableStore();
        store.perPage = 1;
        wrapper.find('.page-number-input').setValue('2');
        await wrapper.find('.corner-icon').trigger('click');
        expect(store.page).toEqual(2);
        wrapper.find('.page-number-input').setValue('1');
        await wrapper.find('.corner-icon').trigger('click');
        expect(store.page).toEqual(1);
    });
    test('show number of rows works correctly', async () => {
        const store = useTableStore();
        expect(wrapper.findAll('.page-entries-btn').at(0).classes()).not.toContain('active');
        expect(wrapper.findAll('.page-entries-btn').at(1).classes()).toContain('active');
        expect(wrapper.findAll('.page-entries-btn').at(2).classes()).not.toContain('active');
        await wrapper.findAll('.page-entries-btn').at(0).trigger('click');
        expect(wrapper.findAll('.page-entries-btn').at(0).classes()).toContain('active');
        expect(wrapper.findAll('.page-entries-btn').at(1).classes()).not.toContain('active');
        expect(wrapper.findAll('.page-entries-btn').at(2).classes()).not.toContain('active');
        expect(store.perPage).toEqual(25);
    });
});
