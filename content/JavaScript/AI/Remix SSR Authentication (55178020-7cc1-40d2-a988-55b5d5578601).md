# Authenticating in Remix SSR #

Authentication in Remix Server-Side Rendering (SSR) involves managing user sessions and protecting routes. This guide demonstrates how to implement a basic authentication system using Remix's built-in session management.

## Setting up Session Storage #

First, create a session storage mechanism. In this example, we'll use cookie-based sessions:

```typescript
// app/sessions.ts
import { createCookieSessionStorage } from '@remix-run/node'

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['s3cr3t'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
```

## Creating Login and Logout Actions #

Implement login and logout actions in your route files:

```typescript
// app/routes/login.tsx
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getSession, commitSession } from "~/sessions";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  // Implement your authentication logic here
  if (username === "user" && password === "pass") {
    session.set("userId", "123");
    return redirect("/dashboard", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({ error: "Invalid credentials" }, { status: 400 });
};

export default function Login() {
  return (
    <Form method="post">
      <input type="text" name="username" required />
      <input type="password" name="password" required />
      <button type="submit">Log in</button>
    </Form>
  );
}
```

```typescript
// app/routes/logout.tsx
import { redirect } from '@remix-run/node'
import { getSession, destroySession } from '~/sessions'

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}
```

## Protecting Routes #

Create a helper function to check authentication status:

```typescript
// app/utils/auth.ts
import { redirect } from '@remix-run/node'
import { getSession } from '~/sessions'

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  if (!session.has('userId')) {
    throw redirect('/login')
  }
  return session.get('userId')
}
```

Use the helper function in protected routes:

```typescript
// app/routes/dashboard.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/utils/auth";

export const loader = async ({ request }) => {
  const userId = await requireAuth(request);
  // Fetch user data or perform other authenticated actions
  return json({ userId });
};

export default function Dashboard() {
  const { userId } = useLoaderData();
  return <div>Welcome, user {userId}!</div>;
}
```

By following these steps, you can implement a basic authentication system in your Remix SSR application. Remember to handle errors, implement proper password hashing, and consider using more secure session storage for production environments.
