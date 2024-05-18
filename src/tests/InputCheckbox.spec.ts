import { config, mount } from '@vue/test-utils';
import InputCheckbox from '@/components/InputCheckbox.vue';
import { test, expect, beforeEach, describe } from 'vitest';
import type { ComponentOptions } from 'vue';

config.global.stubs = { InputCheckbox };
config.global.mocks = { iconsPath: '' };
const defaultProps = {
    attrs: { 'class': 'checkbox-component' },
	props: {
		icon: 'checkmark',
		modelValue: false
	},
};
describe('InputCheckbox tests', () => {
    let wrapper: ComponentOptions;
    beforeEach(() => {
        wrapper = mount(InputCheckbox, defaultProps);
    });
	test('checkbox is rendered', () => {
		expect(wrapper.findAll('.checkbox-component')).toHaveLength(1);
		expect(wrapper.findAll('input[type=checkbox]')).toHaveLength(1);
		expect(wrapper.findAll('label')).toHaveLength(1);
	});
	test('is unchecked initially', () => {
		expect(wrapper.find('input[type=checkbox]').element.checked).toBeFalsy();
	});
	test('changes value when clicked', async () => {
        expect(wrapper.find('input[type=checkbox]').element.checked).toBeFalsy();
        await wrapper.find('label').trigger('click');
		expect(wrapper.find('input[type=checkbox]').element.checked).toBeTruthy();
	});
    test('changes value when model value changes', async () => {
        expect(wrapper.find('input[type=checkbox]').element.checked).toBeFalsy();
        await wrapper.setProps({modelValue: true});
		expect(wrapper.find('input[type=checkbox]').element.checked).toBeTruthy();
	});
});
