<script setup lang="ts">
import HealthCheckTable from './HealthCheckTable.vue';
</script>

<template>
	<div class="health-check-summary">
		<HealthCheckTable />
	</div>
</template>

<style scoped>
.health-check-summary {
    width: 100%;
	background-color: #FFFFFF;
	position: relative;
}
</style>