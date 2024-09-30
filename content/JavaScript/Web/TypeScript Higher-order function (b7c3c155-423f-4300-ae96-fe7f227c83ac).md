# Higher-order function #

A higher-order function is a function that takes one or more functions as arguments or returns a function as its result. This concept is fundamental in functional programming and is widely used in TypeScript and JavaScript.

[TS Playground][1]

```typescript
type Tuple = readonly any[]

function higherOrderFn<Args extends Tuple, R>(fn: (...args: Args) => R) {
  // Higher-order function initialization can be added here if needed

  return function wrapperFn(...args: Args): R {
    // Higher-order function logic can be implemented here

    // Here `args` has the same "shape" as the `arguments` of the wrapped fn
    // But this is generic code, so the shape varies depending on fn
    // All you can really do is forward the arguments to fn
    return fn(...args)
  }
}

function myFn(x: boolean, y: number, z: string) {
  return `${x ? 'yes' : 'no'}:${y*2}:${z}`
}

// You can verify that the typing works,
// The type of wrappedFn is the same as fn
const wrappedFn = higherOrderFn(myFn)
```

In this example, `higherOrderFn` is a higher-order function that takes a function `fn` as an argument and returns a new function `wrapperFn`. The `wrapperFn` maintains the same signature as the original function, allowing for type-safe usage.

The `Tuple` type alias is used to represent any readonly array, which helps in maintaining type safety when working with variable argument lists.

[1]: https://www.typescriptlang.org/play?#code/C4TwDgpgBAKgrmANtAvFAThAhgEwPYB2iIUWBIA2gLoCwAUPQGZwEDGwAloVABYcDmPCOgDy6HMIBiBADwBBdPwDOUCAA9gEAjhXwkEADRQASgD4AFIwIAuKOYB0jrIqW2FygJRQUpk14De9FBQAPQhUBwESsLAvAJC6FB44sJQVhEEHJxYiBwAXlic3AkQ9EEYEMBw6ARpLOxctQDu6FhgkOjSDk4ubi4etsZQgXTBwWEZ0eixfIKpyRKJ6Yh4-BysvMKlDKNjEyVQAAbOyoe8WCrAQlBKWAC20ABESjxtEI+kl9fHinAPBMAlGc8IwoFdoC02pAcGkCOVxuEAEZwWJXDgqdFQfhaYTrKCsPASIxKPBg64vN5QABuzg4EBUEkg2ki-CStSs8NC4RyiCgIDwcHxZAqPJI+AiKkYySazhh4NIv3+gLBpI5u2CmCqNVh3XsJyUHnKAF96Cadsw2EVancQF01LZEXg8MgyEYQLYCH9EcIjHlbEpgOgWQFyprqrVDgASfxqKAAfigAHIQPTE1BbImCHhE0brNGQAAqABMuejeSNh1NZToE35gtYwqpuMYJCuhTJ0FAYBZUCayQA1koDPQJvKu9AQb3Wu0IDhpBKOzd7tALrD6ASorFITO57U0LMEmJFl0bdJDXQgA
