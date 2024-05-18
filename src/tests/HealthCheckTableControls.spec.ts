import { config, mount } from '@vue/test-utils';
import HealthCheckTableControls from '@/components/HealthCheckTableControls.vue';
import { test, expect, describe } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useTableStore } from '@/stores/tableStore';

config.global.stubs = { HealthCheckTableControls };
config.global.mocks = { iconsPath: '' };

describe('HealthCheckTableControls tests', () => {
    test('component renders correctly', async () => {
        const wrapper = mount(HealthCheckTableControls, {
            attrs: {'class': 'health-check-table-controls'},
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        users: {
                            allUsers: [{}, {}],
                            perPage: 50
                        }
                    }
                })],
            },
        });
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
});