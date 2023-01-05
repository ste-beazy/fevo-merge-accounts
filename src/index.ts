import accountData from './data/accounts.json'
import { MergedAccount, Account } from './types'
import { emailsMatch, findExistingAccountIndices } from './tools'

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
				const indexesToErase = findExistingAccountIndices(existingAccounts, mergedAccounts)
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