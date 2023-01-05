import { MergedAccount } from '../types'

export const emailsMatch = (emails: string[], email: string): boolean => {
  return !!emails.find((e) => e === email)
}

export const findExistingAccountIndices = (accounts: MergedAccount[], mergedAccountList: MergedAccount[]): number[] => {
  return mergedAccountList.map((mergedAccount, index) => {
    const match = mergedAccount.emails.find((email) => accounts.find((acc) => emailsMatch(acc.emails, email)))
    if (match) return index
    return -1
  })
}