import { MergedAccount } from '../types'

export const emailsMatch = (emails: string[], email: string): boolean => {
  return !!emails.find((e) => e === email)
}

export const accountsMatch = (object: MergedAccount, objectToCompare: MergedAccount): boolean => {
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

export const findExistingAccountIndexes = (accounts: MergedAccount[], existingAccountList: MergedAccount[]): number[] => {
return existingAccountList.map((existingAccount, index) => {
  const match = accounts.find((acc) => accountsMatch(acc, existingAccount))
  if (match) return index
  return -1
})
}