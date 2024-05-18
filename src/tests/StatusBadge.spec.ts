import { mount } from '@vue/test-utils';
import StatusBadge from '@/components/StatusBadge.vue';
import { test, expect, beforeEach, describe } from 'vitest';
import type { ComponentOptions } from 'vue';


const defaultProps = {
    attrs: { 'class': 'status-badge' },
	props: { value: 'expired' },
};
describe('StatusBadge tests', () => {
    let wrapper: ComponentOptions;
    beforeEach(() => {
        wrapper = mount(StatusBadge, defaultProps);
    });
	test('badge is rendered', () => {
		expect(wrapper.findAll('span.expired')).toHaveLength(1);
	});
	test('sets badge text correctly', () => {
		expect(wrapper.find('span.expired').text()).toBe('expired');
	});
    test('passing props works', () => {
		expect(wrapper.vm.value).toMatch('expired');
	});
});