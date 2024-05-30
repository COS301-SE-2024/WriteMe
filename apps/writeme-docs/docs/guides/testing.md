---
sidebar_position: 8
---

# Testing Guide

In general tests should do 1 of the following 3 things:

1. Testing **Rendering**
2. Testing **User Interaction**
3. **Mocking** (Storybook, cypress)

In general styles should be tested with your eyes and google lighthouse.

TLDR; **Don't test styles in `.spec` files**

:::warning
Please also `lint` your code as part of testing, failing a lint will also fail your push/commit.
:::

## Unit Testing (Components)

All unit tests have 3 parts:

1. Arrangement
     Structure your component, with props and context if needed

     ```jsx
     import {render, screen} from '@testing-library/react';

     //eg. just a component
     render(<YourComponent />)

     //eg. with props
     //should make a test with every variation of the props
     render(<YourComponent user={{name: "Jane Doe", age:22}} />)

     //eg. with context
     render(
          <SupabaseContext.Provider value={mockedSupabase}>
          <YourComponent />
          </SupabaseContext.Provider>
     )


     ```

2. Action
     Actions are typically simulated user interaction, split into two parts
     1. finding the element we want to interact with

          ```jsx
          //3 common approaches
          screen.getByText("Some Text") //also accepts regex
          screen.getByPlaceholder("Placeholder Text")//useful for forms
          screen.getByTestId("id")// a more general solution, but requires additional setup on component
          //must add data-testid="some id" to a components props
          ```

     2. Simulated interaction

          ```jsx
          //simulates a click
          fireEvent.click(screen.getByText("SignUp"))
          ```

3. Assertion

Define what effect the previous interactions should have achieved.
[full list of expect options](https://vitest.dev/api/expect)

```jsx
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
```

### Testing rendering

- [ ] At it's most basic testing rendering should just test whether a component will render **without errors**.
- [ ] Then if the component has properties (`props`), all the **different variations** of those properties should be tested.
- [ ] Finally testing **mocking** and react context should be done.

### Testing User interaction

- [ ] Testing any Button Clicks
- [ ] Testing form input
- [ ] Any User action that would affect a component's state

### Mocking Data

- [ ] If the component makes a call to supabase, this is requires

we can mock the supabase context that will get passed to each component.

```jsx
let supabase = {
     auth: {},
     functions: {},
     storage: {},
     realtime: {}
} //empty mock supabase object

beforeEach(() => {
     vi.spyOn(supabase.auth, "getUser")//spy on the function you would call on supabase
     .mockResolvedValueOnce({ data: { user: {email: "jane@doe.co.za"}, session: null }, error: null }); //mock the data data you expect to get back on a function call

})


test('test with logged in user', async () => {
     render(
          <SupabaseContext.Provider value={supabase}> //uses the mocked supabase object
          <NavBar />
          </SupabaseContext.Provider>
     )
     fireEvent.click(screen.getByText('Log In'))
     expect(screen.getByText('Home')).toBeTruthy()
})
```

### Test Coverage

## Unit Testing (Pages)

:::info
Coming in sprint 2...
:::

## Integration Testing (E2E)

:::info
Coming in sprint 2...
:::

:::note

- You may need to install the following for Cypress

```shell
sudo apt install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev \
     libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb \
     x11-apps build-essential ca-certificates libcurl3-gnutls    \
     libcurl4 libcurl4-openssl-dev
```

:::

## Extra Material

<iframe width="560" height="315" src="https://www.youtube.com/embed/8Xwq35cPwYg?si=XfMP3W-wjVnkodPt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
