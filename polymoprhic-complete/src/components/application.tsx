import React from 'react';
import clsx from 'clsx';

type BaseProps<C extends React.ElementType> = {
  as?: C;
  className?: string;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (BaseProps<C> & P);

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & BaseProps<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponent = <C extends React.ElementType = 'button'>(
  props: PolymorphicComponentProps<C>,
) => React.ReactElement | null;

export const Button: PolymorphicComponent = <
  C extends React.ElementType = 'button',
>({
  as,
  children,
  ...props
}: PolymorphicComponentProps<C>) => {
  const Component = as || 'button';

  return (
    <Component {...props} className={clsx('button', props.className)}>
      {children}
    </Component>
  );
};

const Application = () => (
  <main className="p-8">
    <Button as="a" href="https://frontendmasters.com">
      Link
    </Button>
    <Button as="button">Hello</Button>
    <Button as="span">Span</Button>
    <Button as="div">Div</Button>
    <Button>Defaults to a Button</Button>
  </main>
);

export default Application;
