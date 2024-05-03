<script setup lang="ts">
import User from '@/models/User';
import { useTableStore } from '@/stores/tableStore';
import { computed, ref } from 'vue';
const props = defineProps({
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
    parentcheck: {
        type: Boolean,
        required: false
    }
});
const store = useTableStore();
const isChecked = ref(false);
function setChecked() {
    if (props.user && props.icon === 'checkmark')
        store.setChecked(props.user.id, isChecked.value);
    else if (props.user && props.icon === 'minus')
        store.setCheckedChildren(props.user, isChecked.value);
    else {
        store.isHeadChecked = isChecked.value;
        store.setCheckedAll(isChecked.value);
    }


}
const parentOrTableHeaderChecked = computed(() => isChecked.value || store.isHeadChecked || props.parentcheck);
</script>

<template>
	<span
		class="checkbox-component"
		:class="{ all: parentOrTableHeaderChecked }"
	>
		<label :style="{ maskImage: parentOrTableHeaderChecked ? `url(${iconsPath}/${icon}.svg)` : '' }">
			<input
				type="checkbox"
				value="checkbox-record"
				v-model="isChecked"
				class="visually-hidden"
				@change="setChecked"
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