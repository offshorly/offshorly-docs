# useRunOnce Hook #

A React hook that provides a utility function to ensure code execution happens only once across multiple instances using the Web Locks API.

## Code Implementation ##

```javascript
export const useRunOnce = () => {
  const runOnce = (id, fn, lockDuration = 2000) => {
    const lockId = `run-once-${id}`
    if (typeof navigator.locks === 'undefined') { fn(); return }
    navigator.locks.request(lockId, { ifAvailable: true }, (lock) => {
      if (!lock) return
      fn()
      return new Promise((resolve) => setTimeout(resolve, lockDuration))
    })
  }
  return { runOnce }
}
```

## How It Works ##

This hook leverages the Web Locks API to prevent duplicate execution of functions across browser tabs or instances:

1. **Lock Creation**: Creates a unique lock identifier using the provided `id` parameter

2. **Fallback Handling**: If Web Locks API is unavailable, executes the function immediately

3. **Lock Acquisition**: Attempts to acquire a lock with `ifAvailable: true` option

4. **Execution Control**: Only executes the function if the lock is successfully acquired

5. **Lock Duration**: Maintains the lock for the specified duration (default 2 seconds) to prevent immediate re-execution

## Usage Example ##

```javascript
const { runOnce } = useRunOnce();

// Ensure analytics event fires only once
runOnce('page-view', () => {
  analytics.track('Page View');
});
```

## Parameters ##

- `id`: Unique identifier for the lock
- `fn`: Function to execute once
- `lockDuration`: Duration to hold the lock in milliseconds (default: 2000)
