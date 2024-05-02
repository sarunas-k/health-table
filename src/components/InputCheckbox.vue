<script setup lang="ts">

import { ref } from 'vue';
const isChecked = ref(false);
</script>

<template>
	<span
		class="checkbox-component"
		:class="{ active: isChecked }"
	>
		<label :style="{ maskImage: isChecked ? `url(${iconsPath}/checkmark.svg)` : '' }">
			<input
				type="checkbox"
				value="checkbox-record"
				v-model="isChecked"
				class="visually-hidden"
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
}
</style>