<script setup lang="ts">
import User from '@/models/User';
import { useTableStore } from '@/stores/tableStore';

defineProps({
    type: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: false,
        default: 'checkmark' // Either checkmark or minus
    },
    user: {
        type: User,
        required: false,
        default: null
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    checked: {
        type: Boolean,
        default: false
    }
});
const store = useTableStore();

const refToThisCheckbox = defineModel();
const model = defineModel('checked');

</script>

<template>
	<span class="checkbox-component" :class="{ all: refToThisCheckbox || store.isHeadChecked }">
		<label :style="{ maskImage: refToThisCheckbox || store.isHeadChecked? `url(${iconsPath}/${icon}.svg)` : '' }">
			<input
				name="checkbox-name"
				type="checkbox"
				v-model="refToThisCheckbox" class="visually-hidden"
				:value="model"
			/>
		</label>

	</span>
</template>

<style scoped lang="scss">

.checkbox-component {
    display: inline-block;
    border: 1px solid #9a9a9a;
    height: 17px;
    width: 17px;
    border-radius: 3px;
    background-color: #FFF;
    vertical-align: middle;

    label {
        height: 17px;
        width: 17px;
        display: inline-block;
    }

    &.active {
        background-color: var(--color-primary-green);
        border: 0;

        label {
            background-color: #FFF;
        }
    }

    &.all {
        background-color: var(--color-primary-green) !important;
        border: 0;

        label {
            background-color: #FFF !important;
        }
    }
}
</style>