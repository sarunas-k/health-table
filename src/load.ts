import type {
	IUserRawData,
	IHealthTableLoader,
	IUserStore,
} from '@/models/types/HealthTableTypes.mjs';
import User from './models/User';

/* Class for downloading data from storage
 *  and initializing table content
 *
 * @param store : IUserStore
 *
 */

export default class HealthTableLoader implements IHealthTableLoader {
	private store: IUserStore;
	private apiUrl: string = 'http://127.0.0.1:8000';

	constructor(store: IUserStore) {
		this.store = store;
	}

	// Fetch user data. Each row describes one entry, format of 15 columns
	/*
	 *	@params	from 	- starting line (1 - first line, default - 1)
	 *			length 	- count of lines (default - empty (whole file))
	 */
	async load(from?: number, length?: number) {
		try {
			if (!this.store.isLoaded) {
				// Initiate csrf cookie
				await fetch(`${this.apiUrl}/sanctum/csrf-cookie`, {
					credentials: 'include',
				}).then((res) => res.json()).then((res) => console.log(res)).catch((err) => new Error(err));
			}

			// Get token from csrf cookie
			const xsrf = document.cookie
				.split('; ')
				.find((str) => str.split('=')[0] === 'XSRF-TOKEN');
			if (!xsrf) throw new Error('Error parsing csrf token.');

			if (!this.store.isLoaded) {
				// Attempt to authenticate
				await fetch(`${this.apiUrl}/api/login`, {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						'X-XSRF-TOKEN': decodeURIComponent(xsrf.split('=')[1]),
						Accept: 'application/json',
					},
					body: JSON.stringify({
						email: 'test@api.org',
						password: 'test_api',
					}),
				}).then((res) => res.json()).then((res) => console.log(res)).catch((err) => new Error(err));
			}

			// Start fetching data
			let lines = [''];
			let responseJson;
			let targetUrl = `${this.apiUrl}/api/rows`;

			if (typeof from !== 'undefined') {
				if (typeof length === 'undefined') length = 0;

				targetUrl = `${targetUrl}/${from}/${length}`;
			}

			console.log(targetUrl);
			this.store.setLoaded(false);
			await fetch(targetUrl, {
				credentials: 'include',
				headers: {
					'X-XSRF-TOKEN': decodeURIComponent(xsrf.split('=')[1]),
				},
			})
				.then((response) => { console.log(response); return response.json()})
				.then((value) => (responseJson = value))
				.catch((err) => new Error(err))
				.finally(() => {
					this.store.setLoaded(true);
				});

			if (responseJson) {
				lines = (<any>responseJson).rows.split('\\r\\n');
				this.parseUsers(lines);
				this.store.setLength(parseInt((<any>responseJson).length)-1);
			} else throw new Error("Could't read response");

		} catch (error) {
			this.store.setError(<any>error);
		}
	}

	async parseUsers(lines: string[]) {
		console.log(lines);
		const parse = (data: string[]) => {
			return new Promise((resolve) => {
				data.forEach((line, index) => {
					this.parseUser(line, index);
				});
				resolve(true);
			});
		};
		await parse(lines)
			.catch(() => new Error('Error while loading all users data.'))
			.finally(() => this.store.setLoaded(true));
	}

	// Create user object by using data from single line
	parseUser(line: string, index: number) {
		const fields = line.split(',');
		if (fields.length !== 15)
			throw new Error(
				'Unreadable data format found on line ' +
					index +
					'. 15 words required.'
			);

		const userId = parseInt(fields[0]);

		// Do not parse if ID field isnt a number
		if (index === 0 && Number.isNaN(userId)) return;

		// Do not parse if user data is already in store
		if (typeof this.store.getUser(userId) !== 'undefined')
			return;

		const fieldNames: string[] = [
			'id',
			'firstName',
			'lastName',
			'status',
			'jobTitle',
			'department',
			'checkCode_1',
			'expiration_1',
			'checkStatus_1',
			'checkCode_2',
			'expiration_2',
			'checkStatus_2',
			'checkCode_3',
			'expiration_3',
			'checkStatus_3',
		];

		const userData: IUserRawData = <IUserRawData>{};
		fields.map(function (field, index) {
			const key = fieldNames[index];
			userData[key] = field;
		});
		this.store.addUser(new User(userData));
	}
}
