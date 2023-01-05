import accountData from './data/accounts.json'
import { Person, Account } from './types'
import { emailsMatch, findExistingAccountIndices } from './tools'

 const mergeAccounts = (accounts: Account[]): Person[] => {
	let mergedUsers = [] as Person[]
	const alphabeticallySorted = accounts
		.sort((a, b) => -1 * b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
	alphabeticallySorted.forEach((account) => {
		const mergedAccount: Person = {
			name: account.name,
			emails: account.emails,
			applications: [account.application]
		}

		if (mergedUsers.length > 0) {
			const existingAccounts = mergedUsers.filter((user: Person) => {
				return user.emails.filter((e) => emailsMatch(mergedAccount.emails, e.toLowerCase())).length > 0
			})

			if (existingAccounts.length > 0) {
				const indexesToErase = findExistingAccountIndices(existingAccounts, mergedUsers)
				existingAccounts.map(({ applications, emails }) => {
					applications.forEach((app: number) => mergedAccount.applications.push(app))
					emails.forEach((email: string) => mergedAccount.emails.push(email))
				})
				mergedAccount.emails = [...new Set([...mergedAccount.emails])]
				mergedAccount.applications = [...new Set([...mergedAccount.applications])]
				indexesToErase.forEach((index) => mergedUsers = mergedUsers.splice(index, 1))
			}
		}

		mergedUsers.push(mergedAccount)
	})

	return mergedUsers
 }

const users = mergeAccounts(accountData)
console.log(users)