import { config, mount } from '@vue/test-utils';
import InputButton from '@/components/InputButton.vue';
import { test, expect, describe } from 'vitest';

config.global.stubs = { InputButton };
config.global.mocks = { iconsPath: '' };
const defaultProps = {
	props: {
		icon: 'next',
		callback: () => true,
	},
};
describe('InputButton tests', () => {
	test('renders button', () => {
		const wrapper = mount(InputButton, defaultProps);
		expect(wrapper.findAll('button')).toHaveLength(1);
	});
	test('attributes are set correctly', () => {
		const wrapper = mount(InputButton, defaultProps);
		expect(wrapper.get('button').classes()).toContain('next-icon');
		expect(wrapper.get('span').attributes('style')).toContain('mask-image');
		expect(wrapper.get('span').attributes('style')).toContain('next.svg');
	});
	test('callback works', async () => {
		const wrapper = mount(InputButton, {
			props: {
				icon: 'next',
				callback: () => wrapper.vm.$el.setAttribute('data-test', '1'),
			},
		});
		await wrapper.get('button').trigger('click');
		expect(wrapper.get('button').attributes('data-test')).toBe('1');
	});
});
