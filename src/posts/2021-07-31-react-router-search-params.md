---
title: React Router v5 Search Parameters with URLSearchParams
description: A solution for using URLSearchParams with search parameters from React Router v5.
modified: 2021-01-19
image: https://cdn.brianm.me/images/posts/react-router-search-params/useSearchParams-hook.png
imageAlt: Screenshot of useSearchParams hook
tags:
  - React
  - JavaScript
  - TypeScript
---

The React Router (v5) location object contains the search params string, but from there it's up to us to figure out how we want to use it. This post shows a solution for how I like to work with search params.

## Search Parameters

Here's an example of a location object, taken from the React Router [location docs](https://web.archive.org/web/20210730225030/https://reactrouter.com/web/api/location). The `search` property is a string containing all the search parameters. In a React Component, we can get a handle on this object by using the `useLocation()` hook.

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere',
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

For simple parameters, we could parse the `search` string ourselves, but that doesn't scale as easily as something that already does this for us, like [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams). Luckily these APIs work together with little effort!

```js
const searchParams = new URLSearchParams(location.search);
```

When in a React Component and using the `useLocation()` hook from React Router, we depend on our component being re-rendered if the location changes. Furthermore, the location search is a primitive string, so it can be used to key on needing to create a new `URLSearchParams` instance. In the example below, searchParams will retain a stable reference across renders (thanks to the `useMemo` hook), unless the search parameters change.

```tsx
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function SearchComponent() {
  const { search } = useLocation();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  return null;
}
```

This is great, but what if someone tries to manipulate those parameters with this nice object we have?

```js
searchParams.set('query', 'pizza');
```

The `searchParams` object will have its internal state changed, but the location search and browser search parameters won't have changed. We're using this object as a nice API in order to read the parameters, but we still need to use React Router to change them.

## Type Checking Immutability

This all works great, but how can we _make sure_ that it won't be inadvertently mutated? These days, we all use TypeScript, so we can extend the type of `URLSearchParams` and cast the type of the object to our new interface, `ReadOnlyURLSearchParams`. This interface can override the methods that would mutate the state.

```tsx
import { useHistory, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  set: never;
  delete: never;
  sort: never;
}

function SearchComponent() {
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  useEffect(() => {
    // add a default parameter if not set
    if (!searchParams.get('query')) {
      // this now throws a TypeScript compiler error
      // @ts-expect-error
      searchParams.set('query', 'pizza');
      history.replace({ search: searchParams.toString() });
    }
  }, [searchParams]);

  return null;
}
```

## useSearchParams Custom Hook

To tie it all up, we can move this logic to our own custom hook!

```ts
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  set: never;
  delete: never;
  sort: never;
}

export function useSearchParams() {
  const { search } = useLocation();

  return useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
}
```

And that's it! Happy params searching!
