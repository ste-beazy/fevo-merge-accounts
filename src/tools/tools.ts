import { Person } from '../types'

export const emailsMatch = (emails: string[], email: string): boolean => {
  return !!emails.find((e) => e === email)
}

export const findExistingAccountIndices = (accounts: Person[], PersonList: Person[]): number[] => {
  return PersonList.map((Person, index) => {
    const match = Person.emails.find((email) => accounts.find((acc) => emailsMatch(acc.emails, email)))
    if (match) return index
    return -1
  })
}