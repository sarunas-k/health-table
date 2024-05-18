import HealthTableLoader from '@/load';
import type { IHealthTableLoader } from '@/models/types/HealthTableTypes.mjs';
import { useTableStore } from '@/stores/tableStore';
import { createPinia, setActivePinia } from 'pinia';
import { expect, beforeEach, describe, it } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/handlers';
import { nextTick } from 'vue';
describe('Health Table loader tests', () => {
    let loader: IHealthTableLoader;
    let server;
    let store: any;
	beforeEach(async () => {
        server = setupServer(...handlers);
        server.listen();
		setActivePinia(createPinia());
        store = useTableStore();

		loader = new HealthTableLoader(<any>store);
        loader.load('http://localhost/health-db/db.csv');
	});
	it('parses data correctly', () => {
        console.log(store.allUsers);
            expect(store.allUsers.length).toEqual(0);
	});
});
