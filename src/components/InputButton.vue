<script setup lang="ts">
const props = defineProps({
    icon: {
        validator(value: string) {
            return ['next', 'previous', 'up', 'down', 'more', 'refresh', 'corner'].includes(value)
        },
        type: String,
        required: true,
        default: 'next'
    },
    callback: {
        type: Function,
        default: null
    }
});

</script>

<template>
	<button
		class="button-component"
		:class="props.icon + '-icon'"
		@click="props.callback"
	>
		<span :style="{ maskImage: `url(${iconsPath}/${props.icon}.svg` }" :class="props.icon"></span>
	</button>
</template>

<style scoped lang="scss">
.button-component {
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    vertical-align: middle;
    background: none;

    &:not(.inactive) {
        cursor: pointer;
    }

    span {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: #4d5156;
        mask-size: 80%;
        mask-repeat: no-repeat;
        mask-position: center;
    }

    &.more-icon,
    &.refresh-icon,
    &.corner-icon,
    &.next-icon,
    &.previous-icon {
        span {
            mask-size: 50%;
        }
    }
}
</style>