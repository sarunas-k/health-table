<script setup lang="ts">
import HealthCheckTable from './HealthCheckTable.vue';
import HealthCheckTableControls from './HealthCheckTableControls.vue';
</script>

<template>
	<div class="health-check-summary">
		<HealthCheckTable />
		<HealthCheckTableControls />
	</div>
</template>

<style scoped>
.health-check-summary {
    width: 100%;
	background-color: #FFFFFF;
}
</style>