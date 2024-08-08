const baseUrl = 'http://localhost:3000';

export const api = {
	getHistoryChoices: async () => {
		const resp = await fetch(`${baseUrl}/historyChoices`);
		const res = await resp.json();

		return res;
	},
	updateHistoryChoices: async newHistoryChoices => {
		const resp = await fetch(`${baseUrl}/historyChoices`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ historyChoices: newHistoryChoices })
		});

		const res = await resp.json();

		return res;
	},

	removeChoiceById: async choiceId => {
		console.log(choiceId);
		const resp = await fetch(`${baseUrl}/historyChoices/${choiceId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const res = resp.json();

		return res;
	},

	addChoice: async newChoice => {
		const resp = await fetch(`${baseUrl}/historyChoices`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newChoice)
		});

		if (!resp.ok) {
			throw new Error(`HTTP error! Status: ${resp.status}`);
		}

		const res = await resp.json();
		return res;
	}
};
