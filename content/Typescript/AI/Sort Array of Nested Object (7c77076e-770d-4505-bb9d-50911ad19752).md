# Sort Array by Property #

This markdown file contains a TypeScript function `sortArrayByProperty` that sorts an array of objects based on a specified property. It also includes examples demonstrating how to use the function.

```typescript
/**
 * Sort array by property value
 * @param {any[]} array - The array to be sorted
 * @param {string} prop - The property to sort by
 * @param {'asc' | 'desc'} [order='asc'] - The sort order (ascending or descending)
 * @returns {any[]} - The sorted array
 */
const sortArrayByProperty = <T>(
  array: T[],
  prop: string,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return array.sort((a, b) => {
    const props = prop.split('.')
    let aVal: any = a || null
    let bVal: any = b || null
    for (const p of props) {
      if (!aVal || !bVal) break
      aVal = aVal[p]
      bVal = bVal[p]
    }
    if (order === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
    }
  })
}
```

## Usage Examples ##

```typescript
// Import the sortArrayByProperty function if not in the same file
// import { sortArrayByProperty } from './path-to-your-file';

// Sample array of objects
const data = [
  { id: 3, name: 'Alice', details: { age: 25 } },
  { id: 1, name: 'Bob', details: { age: 30 } },
  { id: 2, name: 'Charlie', details: { age: 20 } }
]

// Example 1: Sort by 'id' in ascending order
const sortedByIdAsc = sortArrayByProperty(data, 'id', 'asc')
console.log('Sorted by ID (asc):', sortedByIdAsc)

// Example 2: Sort by 'name' in descending order
const sortedByNameDesc = sortArrayByProperty(data, 'name', 'desc')
console.log('Sorted by Name (desc):', sortedByNameDesc)

// Example 3: Sort by nested property 'details.age' in ascending order
const sortedByAgeAsc = sortArrayByProperty(data, 'details.age', 'asc')
console.log('Sorted by Age (asc):', sortedByAgeAsc)
```

## Output ##

```typescript
Sorted by ID (asc): [
  { id: 1, name: 'Bob', details: { age: 30 } },
  { id: 2, name: 'Charlie', details: { age: 20 } },
  { id: 3, name: 'Alice', details: { age: 25 } }
]

Sorted by Name (desc): [
  { id: 2, name: 'Charlie', details: { age: 20 } },
  { id: 1, name: 'Bob', details: { age: 30 } },
  { id: 3, name: 'Alice', details: { age: 25 } }
]

Sorted by Age (asc): [
  { id: 2, name: 'Charlie', details: { age: 20 } },
  { id: 3, name: 'Alice', details: { age: 25 } },
  { id: 1, name: 'Bob', details: { age: 30 } }
]
```
