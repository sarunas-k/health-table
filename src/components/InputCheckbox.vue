<script setup lang="ts">

defineProps({
    icon: {
        type: String,
        required: false,
        default: 'checkmark' // Either checkmark or minus
    },
    modelValue: {
        type: Boolean,
        default: false
    }
});

const checkedModel = defineModel();

</script>

<template>
	<!-- Show checkbox icon when this checkbox is checked -->
	<span class="checkbox-component" :class="{ all: checkedModel }">
		<label :style="{ maskImage: checkedModel ? `url(${iconsPath}/${icon}.svg)` : '' }">
			<input
				name="checkbox-name"
				type="checkbox"
				v-model="checkedModel" class="visually-hidden"
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