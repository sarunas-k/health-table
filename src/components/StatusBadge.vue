<script setup lang="ts">

const props = defineProps({
    badge: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});

</script>

<template>
	<span :class="props.value">{{ props.value }}</span>
</template>

<style scoped lang="scss">

span {
	font-size: var(--fs-badge);
	color: var(--color-badge-text);
	font-weight: var(--fw-bold);
	border-radius: 0.5rem;
	padding: 0 0.8rem;

	&.active,
	&.valid {
		background-color: var(--color-badge-valid);
	}
	&.inactive,
	&.expired {
		background-color: var(--color-badge-expired);
	}
	&.cancelled {
		background-color: var(--color-badge-canceled);
	}
}
</style>