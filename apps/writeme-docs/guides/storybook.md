---
sidebar_position: 7
---

# Storybook

:::info
Storybook is used to isolate our components from the complexity of our entire app, to get just the design and documentation right.
:::

## Running the storybook server locally

- use **Nx console** start the `storybook` script on the `wmc` project

### Alternatively

- run in the terminal

```shell
nx run wmc:storybook
```

## Storybook stories

:::tip
A component will not display in story book until you create a story for that component
:::

- In the component's (eg. NavBar) folder, create a `<Component>.stories.js` file.

Follow the following template:

```js
// import the component you want to make a story for
import { NavBar} from "./NavBar"; //changeme!

// A story has a lot of options, but the only required one is to specify the component we want to render
// Setting up the story's default component
export default {
    component: NavBar//changeme!
}


// Can multiple different variants of a component
// I have named this the DefaultNavbar variant
export const DefaultNavBar = {
    //changeme!
    render: () => <NavBar />, // this function specifies how we want to render this variant of the component
};

// We could also export a dark mode variant for example
// assuming our component took a param for a theme we could do 
// export const DarkNavBar = {
//     render: () => <NavBar theme="dark" />, // in this case our function passes the theme prop to the component
// };
```

- Assuming you have the storybook server running locally, you should now see you component's story and and sub variants.

![storybook example](../assets/storybook/storybook%20example.webp)
