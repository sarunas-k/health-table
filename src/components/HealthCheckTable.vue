<script setup lang="ts">
import HealthCheck from './HealthCheck.vue';
import InputCheckbox from './InputCheckbox.vue';
import InputButton from './InputButton.vue';
import User from '../models/User';
import { computed } from 'vue';

const usersEntries = [`
{
      "status": "0",
      "first-name": "Vytautas",
      "last-name": "Urbonas",
      "job-title": "Direktorius",
      "department": "Logistika",
      "health-checks": [
        {
          "code": "0000",
          "issue-date": "2022-02-09T13:13:09.218Z",
          "status": "1"
        },
        {
          "code": "0001",
          "issue-date": "2023-03-22T13:06:31.972Z",
          "status": "1"
        },
        {
          "code": "0002",
          "issue-date": "2022-12-21T01:26:58.674Z",
          "status": "0"
        }
      ]
    }`,
	`{
      "status": "0",
      "first-name": "Vytautas",
      "last-name": "Urbonas",
      "job-title": "Direktorius",
      "department": "Logistika",
      "health-checks": [
        {
          "code": "0000",
          "issue-date": "2022-02-09T13:13:09.218Z",
          "status": "1"
        },
        {
          "code": "0001",
          "issue-date": "2023-03-22T13:06:31.972Z",
          "status": "1"
        },
        {
          "code": "0002",
          "issue-date": "2022-12-21T01:26:58.674Z",
          "status": "0"
        }
      ]
    }`];
</script>

<template>
	<table class="health-check-table">
		<thead>
			<th role="col">
				<InputCheckbox />
			</th>
			<th>Full name / Health check</th>
			<th>Code</th>
			<th>Expiration</th>
			<th>Status</th>
			<th>Department</th>
			<th>User status</th>
			<th>Job title</th>
			<th>
				<InputButton
					icon="refresh"
					:callback="() => console.log('Refresh clicked')"
				/>
			</th>
		</thead>
		<tbody>
			<HealthCheck
				v-for="(user, index) in usersEntries"
				:user="new User(user)"
				:key="index"
			/>
		</tbody>
	</table>
</template>

<style scoped>
thead {
	box-shadow: var(--table-shadow);
}
th:first-child {
	padding: 1rem;
}
</style>
