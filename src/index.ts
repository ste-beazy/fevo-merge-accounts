import accountData from './data/accounts.json';

 interface Account {
	application: number
	emails: string[]
	name: string
 }

 interface MergedAccount {
	applications: number[]
	emails: string[]
	name: string
 }

 const emailsMatch = (emails: string[], email: string): boolean => {
		return !!emails.find((e) => e === email)
 }

 const accountsMatch = (object: MergedAccount, objectToCompare: MergedAccount): boolean => {
	const keys = Object.keys(object)
	const keysToMatch = Object.keys(objectToCompare)
	const values = Object.values(object)
	const valuesToMatch = Object.values(objectToCompare)
	const keysMatch = keys.filter((key) => keysToMatch.includes(key)).length === keys.length
	const valuesMatch = values.filter((value) => {
		if (Array.isArray(value)) {
			const arrayValues = valuesToMatch.filter((val) => Array.isArray(val))
			return !arrayValues.find((array) => array.includes(value))
		}
		return valuesToMatch.includes(value)
	}).length === values.length

	return keysMatch && valuesMatch
 }

 const findExistingAccountIndexes = (accounts: MergedAccount[], existingAccountList: MergedAccount[]): number[] => {
	return existingAccountList.map((existingAccount, index) => {
		const match = accounts.find((acc) => accountsMatch(acc, existingAccount))
		if (match) return index
		return -1
	})
 }

 const mergeAccounts = (accounts: Account[]): MergedAccount[] => {
	let mergedAccounts = [] as MergedAccount[]
	const alphabeticallySorted = accounts
		.sort((a, b) => -1 * b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
	alphabeticallySorted.forEach((account) => {
		const mergedAccount: MergedAccount = {
			name: account.name,
			emails: account.emails,
			applications: [account.application]
		}

		if (mergedAccounts.length > 0) {
			const existingAccounts = mergedAccounts.filter((account: MergedAccount) => {
				return account.emails.filter((e) => emailsMatch(mergedAccount.emails, e.toLowerCase())).length > 0
			})

			if (existingAccounts.length > 0) {
				const indexesToErase = findExistingAccountIndexes(existingAccounts, mergedAccounts)
				existingAccounts.map(({ applications, emails }) => {
					applications.forEach((app: number) => mergedAccount.applications.push(app))
					emails.forEach((email: string) => mergedAccount.emails.push(email))
				})
				mergedAccount.emails = [...new Set([...mergedAccount.emails])]
				mergedAccount.applications = [...new Set([...mergedAccount.applications])]
				indexesToErase.forEach((index) => mergedAccounts = mergedAccounts.splice(index, 1))
			}
		}

		mergedAccounts.push(mergedAccount)
	})

	return mergedAccounts
 }

const accountsMerged = mergeAccounts(accountData)
console.log(accountsMerged)