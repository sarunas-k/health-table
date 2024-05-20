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
	store: IUserStore;
	public static count: number;

	constructor(store: IUserStore) {
		this.store = store;
		HealthTableLoader.count = 0;
	}

	// Get user data from specified file. Format of 15 columns, each row describes one entry
	async load(path: string) {
		try {
			// Initiate csrf cookie
			await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
				credentials: 'include',
			}).catch((err) => new Error(err));

			// Get token from csrf cookie
			const xsrf = document.cookie
				.split('; ')
				.find((str) => str.split('=')[0] === 'XSRF-TOKEN');
			if (!xsrf) throw new Error('Error parsing csrf token.');

			// Attempt to authenticate
			await fetch('http://127.0.0.1:8000/api/login', {
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
			}).catch((err) => new Error(err));

			// Fetch all data
      let lines = [''];
			await fetch(
				'http://127.0.0.1:8000/api/rows/0/100',
				{
					credentials: 'include',
					headers: {
						'X-XSRF-TOKEN': decodeURIComponent(xsrf.split('=')[1]),
					},
				}
			).then((response) => response.text())
        .then((value) => lines = value.split('\\r\\n'))
        .catch((err) => new Error(err));

			HealthTableLoader.count = lines.length - 1;
			this.parseUsers(lines);
		} catch (error) {
			this.store.error.value = <TypeError>error;
		}
	}

	async parseUsers(lines: string[]) {
		const parse = (data: string[]) => {
			return new Promise((resolve) => {
				data.forEach((line, index) => {
					this.parseUser(line, index);
					if (data[index + 1] === '' || !data[index + 1]) {
						resolve(true);
					}
				});
			});
		};
		await parse(lines).catch(
			() => new Error('Error while loading all users data.')
		);
	}

	// Create user object by using data from single line
	parseUser(line: string, index: number) {
		if (index === 0) return;
		const fields = line.split(',');
		if (fields.length !== 15)
			throw new Error(
				'Unreadable data format found on line ' +
					index +
					'. 15 words required.'
			);

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
