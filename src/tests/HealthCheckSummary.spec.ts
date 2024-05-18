import { shallowMount } from '@vue/test-utils';
import HealthCheckSummary from '@/components/HealthCheckSummary.vue';
import { test, expect, describe } from 'vitest';

describe('HealthCheckSummary tests', () => {
    test('component renders correctly', () => {
        const wrapper = shallowMount(HealthCheckSummary);
        expect(wrapper.findAll('div.health-check-summary')).toHaveLength(1);
    });
});