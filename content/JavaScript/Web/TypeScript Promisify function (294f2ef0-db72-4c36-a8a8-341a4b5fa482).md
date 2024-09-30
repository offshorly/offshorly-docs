# Promisify #

This markdown file contains a TypeScript implementation of a `promisify` function, which converts a Node.js-style callback-based function into a Promise-based function.

[TS Playground][1]

```typescript
type Tuple = readonly any[]

type NodeStyleCallback<E extends Error, R> = (err: E, result: R) => void

function promisify<Args extends Tuple, E extends Error, R>(fn: (...args: [...Args, NodeStyleCallback<E, R>]) => void) {
  return function asyncFn(...args: Args): Promise<R> {
    return new Promise<R>((resolve, reject) => {
      fn(...args, (error: E, result: R) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }
}

class CustomError extends Error {}
function nodeStyleAsyncFn(arg1: boolean, arg2: number, arg3: string, cb: (err: CustomError, data: string) => void) {
  // Implementation details omitted
}

const promisifiedAsyncFn = promisify(nodeStyleAsyncFn)
```

## How it works ##

1. The `promisify` function takes a Node.js-style callback function as input.

2. It returns a new function that wraps the original function in a Promise.

3. When the new function is called, it creates a Promise and passes a callback to the original function.

4. The callback either resolves or rejects the Promise based on whether an error occurred.

5. This allows you to use the function with modern async/await syntax or Promise chains.

[1]: https://www.typescriptlang.org/play?#code/C4TwDgpgBAKgrmANtAvFAThAhgEwPYB2iIUWBIA2gLoCwAUPaJFAHJ44QDKoyAwlokQAjLAGMA1gB4AolAgAPYBAI4AzlGnp0edABooAJQB8UNAAoIWgFwb9mVXETAbBgJSmTANzwBLHPXoAMzgCUWAfQigwbQBbH1UfQJBJAEF0AHN1BSUVdXgkCH1ZbOU1DS0dfWMzQIIbMwA6JqwM1RsKJoa0zP02Dm4QPgFhMSlpKqMqdxQvXxx3AG96KAwIYDh0Aihg0PDIrFUQUIAxAkbm1ptu1VcbAAVY+IhJYygluhWVzHXNqAIIADuUAeeDiqme1TM9jwiE8hVWACsIGFpiZ3p9PrVzg0Wj0oBYKugbONVg4nC5UW9lhjPol8ZZtOh3JgkWECYzXNSaXJEODSTC4VCIGTgJyPjSAL5ijFS6kS+jyhh0USIA7qXhwVTAUGaRlyRSldS6nRvRU7MIRLYEdhcHgQFKHE5nXEARhsQjwMOwBH0uIATDYCHAYkJLL6MgBmGxa9A+AjpfSiIT1Bk2DVanWE-Q4LDALDR4Cx+OU7x+RYBOiK+iiQhaqKPBKBHwQHAOo6iU6meug+KJEBma39O1tp1ioA
