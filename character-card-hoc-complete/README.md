# Character cards with higher-order components

Instead of having the `Application` comoponent do all of the data fetching for us and pass it into the component, we're going to create a higher-order component that can wrap the `CharacterCard` component and handle the data fetching for it. This will give us that separation of stateful and presentational logic that we're looking for.

We're going to complete the following steps:

1. Create a simple higher-order component that just acts as a pass-through.
2. Add the data-fetching logic to the higher-component.
3. Add type support to the higher-order component.
4. Learn how to add pass additional properties from the higher order component to the presentational component.

## Laying the foundation

Let's start small. We'll create a simple higher-component that simply wraps the component and doesn't do much of anything else.

We'll make a new file called `WithCharacter.tsx` and add the following:

```ts
export const withCharacter = (Component: any) => {
  return Component;
};
```

We'll also add a version of the component wrapped in this higher-order function as well.

```ts
export const CardWithCharacterInformation = withCharacter(CharacterCard);
```

Next, we'll swap it with `CharacterCard` in `Application.tsx`.

```tsx
const Application = () => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    characters.then((c) => {
      setCharacter(c);
      setLoading(false);
    });
  }, []);

  return (
    <main className="bg-primary-200 flex h-full items-center justify-around p-24">
      {loading && <Loading />}
      {character && <CardWithCharacterInformation character={character} />}
      {/* 👆 */}
    </main>
  );
};
```

At this moment, we're actually _worse_ off than we were before since we've lost the type information for the underlying component. Gross.

But, that's fine. We want to move the data fetching inside the higher-order component anyway. So, this is just a temporary set-back.

## Moving the data-fetching into the higher-order component

Now, we're going to refactor our higher-order component a little bit. Instead of being a silly little pass-through, it's going to take a component and return a functional component that—at this moment—doesn't take any props of it's own.

Inside of this functional component, we'll do all of our lovely data fetching in `WithCharacter.tsx`.

```ts
export const withCharacter = (Component: any) => () => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [loading, setLoading] = useState(true);

  const characters = fetchCharacter();

  useEffect(() => {
    characters.then((c) => {
      setCharacter(c);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    characters.then((c) => {
      setCharacter(c);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  return <Component character={character} />;
};
```

Our `Application.tsx` slims down to something simple and elegant.

```tsx
import { CardWithCharacterInformation } from './WithCharacter';

const Application = () => {
  return (
    <main className="bg-primary-200 flex h-full items-center justify-around p-24">
      <CardWithCharacterInformation />
    </main>
  );
};

export default Application;
```

In fact, if we so desired, we could pop multiple `CardWithCharacterInformation` components in here and they'd all handle they're own data fetching independently.

```tsx
const Application = () => {
  return (
    <main className="bg-primary-200 flex h-full items-center justify-around p-24">
      <CardWithCharacterInformation />
      <CardWithCharacterInformation />
      <CardWithCharacterInformation />
    </main>
  );
};
```

But, we still have some problems:

1. We can't pass any additional data to the wrapped component.
2. Our presentational component _still_ doesn't have any type safety, even if our higher-order component does.

## Adding type safety to our higher order component

Since `withCharacter` is passing a `character` prop of the `CharacterType` to whatever it's wrapping. It makes sense that we should totally make sure that it's wrapping something that accepts a prop of that type.

This is where we're going to step in with some types.

```tsx
export const withCharacter =
  <T,>(Component: React.ComponentType<T>) =>
  (props: T) => {
    const [character, setCharacter] = useState<CharacterType | null>(null);
    const [loading, setLoading] = useState(true);

    const characters = fetchCharacter();

    useEffect(() => {
      characters.then((c) => {
        setCharacter(c);
        setLoading(false);
      });
    }, []);

    useEffect(() => {
      characters.then((c) => {
        setCharacter(c);
        setLoading(false);
      });
    }, []);

    if (loading) return <Loading />;
    return <Component character={character} />;
  };

export const CardWithCharacterInformation = withCharacter(CharacterCard);
```

So, it loads, but—as usual—TypeScript is angry with us.

It's angry with us about two things:

- First, it's angry with us that `CardWithCharacterInformation` isn't getting the `character` that the underlying component is expecting.
- Our higher order component doesn't have any idea that `Component` is something that can accept a `character` prop.

So, it stands that we need to do two things:

- Tell our HOC that we will only wrap components that have take the props that we plan on passing in.
- Return a component that doesn't worry about the props that our HOC is passing in.

Okay, so what does our HOC pass in? Well, in this case, it passes in character. Right on. Let's get clear about that.

## Picking and choosing the correct props

Okay, so what does our HOC pass in? Well, in this case, it passes in `character`. Right on. Let's get clear about that.

```ts
type WithCharacterProps = {
  character: CharacterType;
};
```

Now, we'll tell our HOC, that cool—set the generic, `T` to the type of the component that we pass in, _but_ that component _must_ have a `character` prop that is of the type `CharacterType`.

Next, we want to say that our wrapper is going to take all of the props that the wrapped component takes, except for `character` because we're passing that one in.

```tsx
export const withCharacter =
  <T,>(Component: React.ComponentType<T>) =>
  (props: Omit<T, keyof WithCharacterProps>) => {
    // …
  };
```

This quiets the error in `Application`. But it doesn't really work, right?

It _theoretically_ does, but there is just a little too much dynamic stuff going on for TypeScript to be completely sure, you can validate this hypothesis by looking at the results if you type out the same logic inline:

```ts
type WithCharacterProps = {
  character: CharacterType;
};

type CharacterCardProps = {
  character: CharacterType;
  id: number;
};

type RemainginProps = Omit<CharacterCardProps, keyof WithCharacterProps>;
```

If you hover over `RemainingProps`, you'll see:

```ts
type RemainginProps = {
  id: number;
};
```

We can use the `as` keyword to opt-in to manually assuring TypeScript that it's getting what we think it should be getting.

```tsx
export const withCharacter =
  <T,>(Component: React.ComponentType<T>) =>
  (props: Omit<T, keyof WithCharacterProps>): JSX.Element => {
    // …

    if (loading) return <Loading />;
    if (!character) return <p>There was an error.</p>;

    return <Component {...(props as T)} character={character} />;
  };
```
