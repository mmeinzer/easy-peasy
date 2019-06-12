>
> This is the v2.4.0 branch. Your early testing and [feedback](https://github.com/ctrlplusb/easy-peasy/pull/181) is appreciated. 🙏
>

<p>&nbsp;</p>
<p align='center'>
  <img src="https://i.imgur.com/F6WfRFI.png" width="130" />
</p>
<p align='center'>Easy peasy state for React</p>
<p>&nbsp;</p>

[![npm](https://img.shields.io/npm/v/easy-peasy.svg?style=flat-square)](http://npm.im/easy-peasy)
[![MIT License](https://img.shields.io/npm/l/easy-peasy.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis](https://img.shields.io/travis/ctrlplusb/easy-peasy.svg?style=flat-square)](https://travis-ci.org/ctrlplusb/easy-peasy)
[![Codecov](https://img.shields.io/codecov/c/github/ctrlplusb/easy-peasy.svg?style=flat-square)](https://codecov.io/github/ctrlplusb/easy-peasy)

```javascript
import { action, createStore, StoreProvider, useStoreState, useStoreActions } from 'easy-peasy';

const store = createStore({
  todos: {
    items: ['Install easy-peasy', 'Define your model', 'Have fun'],
    add: action((state, payload) => {
      state.items.push(payload)
    })
  }
});

const App = () => (
  <StoreProvider store={store}>
    <TodoList />
  </StoreProvider>
)

function TodoList() {
  const todos = useStoreState(state => state.todos.items)
  const add = useStoreActions(actions => actions.todos.add)
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
      <AddTodo onAdd={add} />
    </div>
  )
}
```

<details>
<summary>View the above code snippet with comments</summary>
<p>

```javascript
import { action, createStore, StoreProvider, useStoreState, useStoreActions } from 'easy-peasy';

// 👇 create your store, providing the model
const store = createStore({
  todos: {
    items: ['Install easy-peasy', 'Define your model', 'Have fun'],
    // 👇 define actions directly on your model
    add: action((state, payload) => {
      // simply mutate state to update, and we convert to immutable updates
      state.items.push(payload)
      // (you can also return a new immutable version of state if you prefer)
    })
  }
});

const App = () => (
  // 👇 wrap your app to expose the store
  <StoreProvider store={store}>
    <TodoList />
  </StoreProvider>
)

function TodoList() {
  // 👇  use hooks to get state or actions
  const todos = useStoreState(state => state.todos.items)
  const add = useStoreActions(actions => actions.todos.add)
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo}</div>)}
      <AddTodo onAdd={add} />
    </div>
  )
}
```

</p>
</details>

## Highlights

  - React hooks based API
  - Simple, intuitive API focusing on speed of development
  - Thunks for data fetching and side effects
  - Selectors for derived data
  - Global, shared, or component level stores
  - Immutable data store under the hood
  - Typescript definitions baked in
  - React Native supported
  - Testing helpers baked in
  - Wraps Redux, all the radness, without the boilerplate
  - Redux Dev Tools support built in
  - Supports Redux middleware and enhancers

<p>&nbsp;</p>
<p align='center'>
  <img src='https://i.imgur.com/2vFSy1y.png' width='500' />
</p>
<p>&nbsp;</p>

## TOCs

  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Examples](#examples)
    - [Easy Peasy Typescript](#easy-peasy-typescript)
    - [React Todo List](#react-todo-list)
  - [Tutorial](#tutorial)
    - [Core Concepts](#core-concepts)
      - [Creating the store](#creating-the-store)
      - [Accessing state directly via the store](#accessing-state-directly-via-the-store)
      - [Modifying state via actions](#modifying-state-via-actions)
      - [Dispatching actions directly via the store](#dispatching-actions-directly-via-the-store)
      - [Creating a `thunk` action](#creating-a-thunk-action)
      - [Dispatching a `thunk` action directly via the store](#dispatching-a-thunk-action-directly-via-the-store)
      - [Creating selectors for derived state](#creating-selectors-for-derived-state)
      - [Accessing your selectors directly via the store](#accessing-your-selectors-directly-via-the-store)
      - [Updating multiple parts of your state in response to a thunk/action](#updating-multiple-parts-of-your-state-in-response-to-a-thunkaction)
    - [Usage with React](#usage-with-react)
      - [Wrap your app with StoreProvider](#wrap-your-app-with-storeprovider)
      - [Accessing state in your Components](#accessing-state-in-your-components)
      - [Dispatching actions in your Components](#dispatching-actions-in-your-components)
  - [API](#api)
    - [createStore](#createstore)
    - [createContextStore](#createcontextstore)
    - [createComponentStore](#createcomponentstore)
    - [action](#action)
    - [thunk(action)](#thunkaction)
    - [selector](#selector)
    - [listen(on)](#listenon)
    - [reducer(fn)](#reducerfn)
    - [StoreProvider](#storeprovider)
    - [useStoreState](#usestorestate)
    - [useStoreActions](#usestoreactions)
    - [useStoreDispatch](#usestoredispatch)
    - [StoreConfig](#storeconfig)
    - [Store](#store)
  - [Deprecated API](#deprecated-api)
    - [select(selector)](#selectselector)
  - [Usage with Typescript](#usage-with-typescript)
  - [Usage with React Native](#usage-with-react-native)
  - [Writing Tests](#writing-tests)
  - [Typescript API](#typescript-api)
  - [Tips, Tricks and FAQS](#tips-tricks-and-faqs)
    - [Generalising effects/actions/state via helpers](#generalising-effectsactionsstate-via-helpers)
    - [Usage with class components / Using with react-redux](#usage-with-class-components--using-with-react-redux)
  - [Prior Art](#prior-art)

<p>&nbsp;</p>

---

## Introduction

Easy Peasy provides you with an intuitive and easy to use API allowing you to quickly and easily build the state for your React application. Batteries are included - you don't need to configure any additional packages to support derived state, API calls, memoisation, etc.

<p>&nbsp;</p>

---

## Installation

Firstly, install React and React DOM.

```bash
npm install react
npm install react-dom
```

> Note: please ensure you install versions >= 16.8.0 for both `react` and `react-dom`, as this library depends on the hooks feature of React

Then install Easy Peasy.

```bash
npm install easy-peasy@next
```

You're off to the races.

<p>&nbsp;</p>

---

## Examples

### Easy Peasy Typescript

This GitHub repository shows off how to utilise Typescript with Easy Peasy. I highly recommend cloning it and running it so that you can experience first hand what a joy it is to have types helping you with global state.

https://github.com/ctrlplusb/easy-peasy-typescript

### React Todo List

A simple implementation of a todo list that utilises a mock service to illustrate data fetching/persisting via effect actions. A fully stateful app with no class components. Hot dang hooks are awesome.

https://codesandbox.io/s/woyn8xqk15

<p>&nbsp;</p>

---

## Tutorial

The below will introduce you to the core concepts of Easy Peasy, where we will create a global store and interact with it directly. In a following section we shall illustrate how to [access the store from your React components](#usage-with-react).

### Core Concepts

#### Creating the store

Firstly, define your model. This represents the structure of your state along with its default values. Your model can be as deep and complex as you like. Feel free to split your model across many files, importing and composing them as you like.

```javascript
const model = {
  todos: {
    items: [],
  }
};
```

Then provide your model to `createStore`.

```javascript
import { createStore } from 'easy-peasy';

const store = createStore(model);
```

You will now have a [store](#store). 👍

> Note: A store is the same as a Redux store - all the standard Redux store APIs are available to you. You can pass the store into 3rd party libs that require and integrate with Redux stores.

#### Accessing state directly via the store

You can access your store's state using the `getState` API of the store.

```javascript
store.getState().todos.items;
```

#### Modifying state via actions

In order to mutate your state you need to define an action against your model.

```javascript
import { action } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  todos: {
    items: [],
    //         👇 define the action with the helper
    addTodo: action((state, payload) => {
      // Mutate the state directly. Under the hood we convert this to an
      // an immutable update.
      state.items.push(payload)
    })
  }
});
```

The action will receive as its first parameter the slice of the state that it was added to. So in the example above our action would receive `{ items: [] }` as the value for its `state` argument. It will also receive any `payload` that may have been provided when the action was triggered.

> Note: Some prefer not to use a mutation based API. You can alternatively return new instances of your state:
>
> ```javascript
> addTodo: action((state, payload) => {
>   return { ...state, items: [...state.items, payload] };
> })
> ```
>
> Personally I find the above harder to read and error prone, however, this is a subjective matter.

#### Dispatching actions directly via the store

Easy Peasy will bind your actions against the `dispatch` of your store. They will be bound using paths that match the location of the action within your model.

```javascript
//                                 payload
//                                    |
//                           |------------------|
store.dispatch.todos.addTodo('Install easy-peasy');
//            |-------------|
//                  |
//  path matches our model (todos.addTodo)
```

Call `getState` to see the updated state.

```javascript
store.getState().todos.items;
// ['Install easy-peasy']
```

#### Creating a `thunk` action

If you wish to perform side effects, such as fetching or persisting data from your server then you can use the `thunk` helper to declare a thunk action.

```javascript
import { thunk } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  todos: {
    items: [],

    //          👇 define a thunk action via the helper
    saveTodo: thunk(async (actions, payload) => {
      //                      👆
      // Notice that the thunk will receive actions instead of state. You can
      // call the actions to update your state appropriately.

      // e.g. call an api
      const savedTodo = await todoService.save(payload);

      // then dispatch an action with the api result as the payload
      actions.todoSaved(savedTodo);
    }),

    todoSaved: action((state, payload) => {
      state.items.push(payload)
    })
  }
});
```

#### Dispatching a `thunk` action directly via the store

You can dispatch a thunk action in the same manner as a normal action. A `thunk` action is _always_ asynchronous and _always_ returns a `Promise`. This allows you chain execution against the succesful resolution of the `thunk`.

```javascript
store.dispatch.todos.saveTodo('Install easy-peasy')
  .then(() => {  // 👈 chain onto the returned promise
    console.log('Todo saved');
  });
```

#### Creating selectors for derived state

If you wish to derive state you can use the [`selector`](#selector) helper.

```javascript
import { selector } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  shoppingBasket: {
    products: [{ name: 'Shoes', price: 123 }, { name: 'Hat', price: 75 }],
    totalPrice: selector(
      // Firstly you provide an array of "stateResolvers" which resolve the
      // parts of your state that will be used by your selector
      [state => state.products],
      // Then define the selector, which receives the resolved
      ([products]) => products.reduce((acc, cur) => acc + cur.price, 0)
    )
  }
}
```

Using the helper will attach a function to your state, that when executed will return the derived state. The results of selectors are memoized and will only be recalculated when the state that they operate against changes. This provides a nice level of performance optimisation, and avoids unneccessary rerendering of your React components.

> This helper is inspired by [`reselect`](https://github.com/reduxjs/reselect), a popular library in the Redux ecosystem.

#### Accessing your selectors directly via the store

You can access your selector similar to state, but remember, selectors are functions.

```javascript
store.getState().shoppingBasket.totalPrice(); // fresh hit

store.getState().shoppingBasket.totalPrice(); // cached result
```

> We intentionally made selectors be functions as it allows us to ensure that the work to derive your data is only performed when you actually need it. In addition to this, having selectors as functions allows us to support runtime arguments being provided to them. See the [selector](#selector) API docs for more information and examples of this.

#### Updating multiple parts of your state in response to a thunk/action

You may want one part of your model respond to actions fired on different parts of it. For example, you may want to clear certain parts of your state when a user logs out, or perhaps you need an audit log that tracks specific actions.

You can use the `listen` helper to achieve this.

```javascript
import { listen } from 'easy-peasy'; // 👈 import the helper

const todosModel = {
  items: [],
  // 👇 this is the action we wish to listen to
  addTodo: action((state, payload) => {
    state.items.push(payload)
  })
};

const auditModel = {
  logs: [],
  // Declare listeners on your model
  //          👇
  listeners: listen((on) => {
    on(
      // Pass in the _reference_ to the action we wish to listen to
      //           👇
      todosModel.addTodo,
      // 👇 the action we wish to execute after `addTodo` has completed
      action((state, payload) => {
        state.logs.push(`Added a new todo: ${payload}`);
      })
    );

    // You can define as many listeners as you like using the provided `on`
  })
};

const model = {
  todos: todosModel,
  audit: auditModel
};
```

This is a more advanced feature, however, using this method allows a clearer separation of concerns and promotes a more reactive programming model.

You can listen to any action type (`action`/`thunk`), and can execute any action type in response. Please read the [docs](#listenon) for more information.

### Usage with React

We will now cover how to access your store from your React components. We leverage React [hooks](https://reactjs.org/docs/hooks-intro.html) to do so. If you aren't familiar with hooks, we highly recommend that you read the [official documentation](https://reactjs.org/docs/hooks-intro.html) and try out the live [examples](#examples).

> Be sure to install the [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension). This extension allows you to view your actions being fired along with the associated updates to your store's state. Easy Peasy is preconfigured to work with this plugin.

#### Wrap your app with StoreProvider

Firstly you need to create your store then wrap your application with the `StoreProvider`.

```javascript
import { StoreProvider, createStore } from 'easy-peasy';
import model from './model'

const store = createStore(model);

const App = () => (
  <StoreProvider store={store}>
    <TodoList />
  </StoreProvider>
)
```

#### Accessing state within your Components

To access state within your components you can use the `useStoreState` hook.

```javascript
import { useStoreState } from 'easy-peasy';

const TodoList = () => {
  const todos = useStoreState(state => state.todos.items);
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo.text}</div>)}
    </div>
  );
};
```

In the case that your `useStoreState` implementation depends on an "external" value when mapping state, you should provide the respective external within the "dependencies" second argument to the `useStoreState`. This is a similar requirement to some of the official hooks that are bundled with React. The `useStoreState` hook will then track the dependency and ensure that the state is remapped every time they change.

```javascript
import { useStoreState } from 'easy-peasy';

const Product = ({ id }) => {
  const product = useStoreState(
    state => state.products[id], // 👈 we are using an external value: "id"
    [id] // 👈 we provide "id" so our useStoreState knows to re-execute mapState
         //    if the "id" value changes
  );
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};
```

We recommend that you read the API docs for the [`useStoreState` hook](#usestorestatemapstate-externals) to gain a full understanding of the behaviours and pitfalls of the hook.

#### Dispatching actions within your Components

To dispatch actions within your components you can use the `useStoreActions` hook.

```javascript
import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

const AddTodo = () => {
  const [text, setText] = useState('');
  const addTodo = useStoreActions(actions => actions.todos.add);
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => addTodo(text)}>Add</button>
    </div>
  );
};
```

For more on how you can use this hook please read the API docs for the [`useStoreActions` hook](#usestoreactionsmapactions).

#### Final notes

This is by no means an exhaustive overview of Easy Peasy's API. We _highly_ recommend you read through the [API](#API) documentation to gain a fuller understanding of the tools and helpers that Easy Peasy provides to you.

<p>&nbsp;</p>

---

## API

Below is a full breakdown of the API exposed by Easy Peasy.

### createStore

Creates a global [store](#store) based on the provided model. It supports a [configuration](#storeconfig) parameter to customise your [store's](#store) behaviour.

```javascript
createStore({
  todos: {
    items: [],
    addTodo: action((state, text) => {
      state.items.push(text)
    })
  }
});
```

**Arguments**

The following arguments are accepted:

  - `model` (Object, required)

    Your model representing your state tree, and optionally containing action functions.

  - `config` (Object, not required)

    Provides custom configuration options for your store. Please see the [StoreConfig](#storeconfig) API documentation for a full list of configuration options.

**Returns**

When executed, you will receive a [store](#store) instance back. Please refer to the [docs](#store) for details of the store's API.

Once you have a store you provide it to the [StoreProvider](#storeprovider) in order to expose it to your application.

<details>
<summary>Full Example</summary>
<p>

```javascript
import { createStore, StoreProvider, action } from 'easy-peasy';

const model = {
  todos: {
    items: [],
    addTodo: action((state, text) => {
      state.items.push(text)
    })
  },
};

const store = createStore(model, { });

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.querySelector('#app')
);
```

</p>
</details>

### createContextStore

Creates a store powered by context, allowing you to expose state to specific parts of your React application.

Using this approach over the global [createStore](#createstore) approach allows you to create multiple stores. Each store can encapsulate differing state needs for branches/features of your application. This may be especially useful for larger scale applications, or when employing code splitting techniques.

```javascript
const Counter = createContextStore({
  count: 0,
  increment: action(state => {
    state.count += 1;
  })
})
```

**Arguments**

The following arguments are accepted:

  - `model` (Object | (initialData: any) => Object, required)

    The model representing your store.

    Alternatively this can be a function that accepts `initialData`. The `initialData` can be provided as a prop to the `Provider`. This allows additional runtime configuration/overrides against your model.

  - `config` (Object, not required)

    Custom [configuration](#storeconfig) for your store. Please see the [StoreConfig](#storeconfig) API documentation for a full list of configuration options.

**Returns**

When executed you will receive a store container that contains the following properties:

 - `Provider` (Component, required)

   The React component that allows you to wrap a specific part of your React app in order to expose the store state to it. You can wrap as much or as little of your React app as you like.

   If you render multiple instances of this provider component each instance will have it's own unique state. This may be handy in some cases, but in most cases you will likely only have one instance of your provider rendered.

   ```javascript
   <Counter.Provider>
    <App />
   </Counter.Provider>
   ```

   The provider accepts the following props:

   - `initialData` (Any, not required)

     Allows you to provide additional data to instantiate your store's model with. This needs to be used in conjunction with the function form of defining your model. See the examples below.

     ```javascript
     <Counter.Provider initialData={{ count: 1 }}>
       <App />
     </Counter.Provider>
     ```

 - `useStoreState` (Function, required)

   A hook allowing you to access the state of your store.

   ```javascript
   function CountDisplay() {
     const count = Counter.useStoreState(state => state.count);
     return <div>{count}</div>
   }
   ```

   This hook shares all the same properties and features of the global [`useStoreState`](#usestorestate) hook.

 - `useStoreActions` (Function, required)

   A hook allowing you to access the actions of your store.

   ```javascript
   function CountIncButton() {
     const increment = Counter.useStoreActions(actions => actions.increment);
     return <button onClick={increment}>+</button>
   }
   ```

   This hook shares all the same properties and features of the global [`useStoreActions`](#usestoreactions) hook.

 - `useStoreDispatch` (Function, required)

   A hook allowing you to access the dispatch of your store.

   ```javascript
   function CountIncButton() {
     const dispatch = Counter.useStoreDispatch();
     return <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
   }
   ```

   This hook shares all the same properties and features of the global [`useStoreDispatch`](#usestoredispatch) hook.

 - `useStore` (Function, required)

   A hook allowing you to access the store. We recommend that this only be used within exceptional use cases.

   ```javascript
   function MyCounter() {
     const store = Counter.useStore();
     store.getState();
     return null;
   }
   ```

<details>
<summary>Full example</summary>
<p>

```javascript
const Counter = createContextStore({
  count: 0,
  inc: action(state => {
    state.count += 1;
  })
})

function MyCounter() {
  const count = Counter.useStoreState(state => state.count);
  const actions = Counter.useActions(actions => actions.inc);
  return (
    <>
      <div>{count}</div>
      <button onClick={() => actions.inc()} type="button"> + </button>
    </>
  )
}

ReactDOM.render(
  <Counter.Provider>
    <MyCounter />
  </Counter.Provider>,
  document.querySelector('#app')
);
```

</p>
</details>

<details>
<summary>Using multiple stores</summary>
<p>

```javascript
const Counter = createContextStore({
  count: 0,
  inc: action(state => {
    state.count += 1;
  })
})

const Todos = createContextStore({
  items: [],
  addTodo: action((state, text) => {
    state.items.push(text)
  })
})

ReactDOM.render(
  <>
    <Counter.Provider>
      <CounterApp />
    </Counter.Provider>
    <Todos.Provider>
      <TodosApp />
    </Todos.Provider>
  </>,
  document.querySelector('#app')
);
```

</p>
</details>

<details>
<summary>Nesting stores</summary>
<p>

```javascript
const Counter = createContextStore({
  count: 0,
  inc: action(state => {
    state.count += 1;
  })
})

const Todos = createContextStore({
  items: [],
  addTodo: action((state, text) => {
    state.items.push(text)
  })
})

ReactDOM.render(
  <Counter.Provider>
    <Todos.Provider>
      <App />
    </Todos.Provider>
  </Counter.Provider>,
  document.querySelector('#app')
);
```

</p>
</details>

<details>
<summary>Providing initialData to customise your model at runtime</summary>
<p>

```javascript
// The initial data will be received here
//                                      👇
const Counter = createContextStore(initialData => ({
  count: initialData.count,
  inc: action(state => {
    state.count += 1;
  })
}));

ReactDOM.render(
  // Provide some initial data to your model instantiation
  //                                 👇
  <Counter.Provider initialData={{ count: 1 }}>
    <CounterApp />
  </Counter.Provider>,
  document.querySelector('#app')
);
```

</p>
</details>

<details>
<summary>Using a store multiple times</summary>
<p>

It is entirely possible to use a store multiple times. Although this should
be managed carefully. Each provider instance will have its own state.

```javascript
const Counter = createContextStore(initialData => ({
  name: initialData.name,
  count: 0,
  inc: action(state => {
    state.count += 1;
  })
}));

ReactDOM.render(
  <>
    <Counter.Provider initialData={{ name: 'counter1' }}>
      <CounterApp />
    </Counter.Provider>
    <Counter.Provider initialData={{ name: 'counter2' }}>
      <CounterApp />
    </Counter.Provider>
  </>,
  document.querySelector('#app')
);
```

</p>
</details>

### createComponentStore

Creates a store meant to manage the state for a single component.

```javascript
const useCounter = createComponentStore({
  count: 0,
  increment: action(state => {
    state.count += 1;
  })
})
```

**Arguments**

The following arguments are accepted:

  - `model` (Object | (any) => Object, required)

    The model representing your store.

    Alternatively this can be a function that accepts `initialData`, which is provided when using the store within your components. The function should then return the model. This allows additional runtime configuration/overrides.

  - `config` (Object, not required)

    Provides custom configuration options for your store. Please see the [StoreConfig](#StoreConfig) API documentation for a full list of configuration options.

**Returns**

When executed you will receive a hook that allows you to use the store within your component.

<details>
<summary>Full example</summary>
<p>

```javascript
const useCounter = createComponentStore({
  count: 0,
  inc: action(state => {
    state.count += 1;
  })
})

function MyCounter() {
  const [state, actions] = useCounter();
  return (
    <>
      <div>{state.count}</div>
      <button onClick={() => actions.inc()} type="button"> + </button>
    </>
  );
}
```

</p>
</details>

<details>
<summary>Providing initialData to customise your model at runtime</summary>
<p>

```javascript
// The initial data will be received here
//
const useCounter = createComponentStore(initialData => ({
  count: initialData.count,
  inc: action(state => {
    state.count += 1;
  })
}));

                                    👇
const Counter = createContextStore(initialData => ({
  count: initialData.count,
  inc: action(state => {
    state.count += 1;
  })
}));

ReactDOM.render(
  // Provide some initial data to your model instantiation
  //

function MyCounter() {
  const [state, actions] = useCounter();
  return (
    <>
      <div>{state.count}</div>
      <button onClick={() => actions.inc()} type="button"> + </button>
    </>
  );
}
```

</p>
</details>

### action

Declares an action on your model. An action allows you to perform updates on your store.

The action will have access to the part of the state tree where it was defined.

```javascript
action((state, payload) => {
  state.items.push(payload);
})
```

<details>
<summary>Arguments</summary>
<p>

  - action (Function, required)

    The action definition. It receives the following arguments:

    - `state` (Object, required)

      The part of the state tree that the action is against. You can mutate this state value directly as required by the action. Under the hood we convert these mutations into an update against the Redux store.

    - `payload` (Any)

      The payload, if any, that was provided to the action.

When your model is processed by Easy Peasy to create your store all of your actions will be made available against the store's `dispatch`. They are mapped to the same path as they were defined in your model. You can then simply call the action functions providing any required payload.  See the example below.
</p>
</details>

<details>
<summary>Example</summary>
<p>

```javascript
import { action, createStore } from 'easy-peasy';

const store = createStore({
  todos: {
    items: [],
    add: action((state, payload) => {
      state.items.push(payload)
    })
  }
});

store.dispatch.todos.add('Install easy-peasy');
```
</p>
</details>

### thunk(action)

Declares a thunk action on your model. Allows you to perform effects such as data fetching and persisting.

```javascript
thunk(async (actions, payload) => {
  const user = await loginService(payload);
  actions.loginSucceeded(user);
})
```

<details>
<summary>Arguments</summary>
<p>

  - action (Function, required)

    The thunk action definition. A thunk typically encapsulates side effects (e.g. calls to an API). It can be asynchronous - i.e. use Promises or async/await. Thunk actions cannot modify state directly, however, they can dispatch other actions to do so.

    It receives the following arguments:

    - `actions` (required)

      The actions that are bound to same section of your model as the thunk. This allows you to dispatch another action to update state for example.

    - `payload` (Any, not required)

      The payload, if any, that was provided to the action.

    - `helpers` (Object, required)

      Contains a set of helpers which may be useful in advanced cases. The object contains the following properties:

      - `dispatch` (required)

        The Redux store `dispatch` instance. This will have all the Easy Peasy actions bound to it allowing you to dispatch additional actions.

      - `getState` (Function, required)

        When executed it will provide the local state of where the thunk is attached to your model. This can be useful in the cases where you require state in the execution of your thunk.

      - `getStoreState` (Function, required)

        When executed it will provide the root state of your model. This can be useful in the cases where you require state in the execution of your thunk.

      - `injections` (Any, not required, default=undefined)

        Any dependencies that were provided to the `createStore` configuration will be exposed as this argument. See the [`StoreConfig`](#storeconfig) docs on how to specify them.

      - `meta` (Object, required)

        This object contains meta information related to the effect. Specifically it contains the following properties:

          - parent (Array, string, required)

            An array representing the path of the parent to the action.

          - path (Array, string, required)

            An array representing the path to the action.

        This can be represented via the following example:

        ```javascript
        const store = createStore({
          products: {
            fetchById: thunk((dispatch, payload, { meta }) => {
              console.log(meta);
              // {
              //   parent: ['products'],
              //   path: ['products', 'fetchById']
              // }
            })
          }
        });
        ```

When your model is processed by Easy Peasy to create your store all of your thunk actions will be made available against the store's `dispatch`. They are mapped to the same path as they were defined in your model. You can then simply call the action functions providing any required payload.  See the examples below.

</p>
</details>

<details>
<summary>Example</summary>
<p>

```javascript
import { action, createStore, thunk } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  session: {
    user: undefined,
    // 👇 define your thunk action
    login: thunk(async (actions, payload) => {
      const user = await loginService(payload)
      actions.loginSucceeded(user)
    }),
    loginSucceeded: action((state, payload) => {
      state.user = payload
    })
  }
});

// 👇 you can dispatch and await on the thunk action
store.dispatch.session.login({
  username: 'foo',
  password: 'bar'
})
// 👇 thunk actions _always_ return a Promise
.then(() => console.log('Logged in'));

```

</p>
</details>

<details>
<summary>Example accessing local state via the getState parameter</summary>
<p>

```javascript
import { createStore, thunk } from 'easy-peasy';

const store = createStore({
  counter: {
    count: 1,
    // getState allows you to gain access to the local state
    //                                               👇
    doSomething: thunk(async (dispatch, payload, { getState }) => {
      // Calling it exposes the local state. i.e. the part of state where the
      // thunk was attached
      //            👇
      console.log(getState())
      // { count: 1 }
    }),
  }
});

store.dispatch.doSomething()
```

</p>
</details>

<details>
<summary>Example accessing full state via the getStoreState parameter</summary>
<p>

```javascript
import { createStore, thunk } from 'easy-peasy';

const store = createStore({
  counter: {
    count: 1,
    // getStoreState allows you to gain access to the  store's state
    //                                               👇
    doSomething: thunk(async (dispatch, payload, { getStoreState }) => {
      // Calling it exposes the root state of your store. i.e. the full
      // store state 👇
      console.log(getStoreState())
      // { counter: { count: 1 } }
    }),
  }
});

store.dispatch.doSomething()
```

</p>
</details>

<details>
<summary>Example dispatching an action from another part of the model</summary>
<p>

```javascript
import { action, createStore, thunk } from 'easy-peasy';

const store = createStore({
  audit: {
    logs: [],
    add: action((state, payload) => {
      audit.logs.push(payload);
    })
  },
  todos: {
    // dispatch allows you to gain access to the store's dispatch
    //                                      👇
    saveTodo: thunk((actions, payload, { dispatch }) => {
      // ...
      dispatch.audit.add('Added a todo');
    })
  }
});

store.dispatch.todos.saveTodo('foo');
```

We don't recommned doing this, and instead encourage you to use the [`listen`](#listenon) helper to invert responsibilites. However, there may exceptional cases in which you need to do the above.

</p>
</details>

<details>
<summary>Example with Dependency Injection</summary>
<p>

```javascript
import { createStore, thunk } from 'easy-peasy';
import api from './api' // 👈 a dependency we want to inject

const store = createStore(
  {
    foo: 'bar',
    //                       injections are exposed here 👇
    doSomething: thunk(async (dispatch, payload, { injections }) => {
      const { api } = injections
      await api.foo()
    }),
  },
  {
    // 👇 specify the injections parameter when creating your store
    injections: {
      api,
    }
  }
);

store.dispatch.doSomething()
```

</p>
</details>

### selector

The `selector` helper is intended to allow you to create state selectors, i.e. functions that take in state and then return derived new state. We have decided to incorporate this helper within the library, as we can ensure that performance optimisations such as memoization are automatically performed against your selectors. Your selectors will automatically manage cache invalidation when updates to related state occurs.

```javascript
selector(
  [state => state.products],
  ([products]) => products.length
)
```

<details>
<summary>Arguments</summary>
<p>

  - stateSelectors (Array<Function>. required)

    An array of functions responsible for resolving the slices of state that the selector will act against. Each function receives the following arguments:

    - `state` (Object)

      The local state against which your `selector` is bound.

    - `storeState` (Object)

      The entire state of your store.

    ```javascript
    (state, storeState) => state.foo
    ```

    > Note: It is best to keep your state selectors as simple as possible. Keep the heavy lifting  / transforms to your actual selector function.

  - selector (Function, required)

    The selector function responsible for resolving the derived state. It is provided the following arguments:

    - `selectedState` (Array<any>, required)

      These are the results of your defined `stateSelectors`. Where each value matches the idx of the respective state selector.

    - `runtimeArguments` (Array<any>, required)

      If any runtime arguments were provided to your selector

    Please see the examples to make this clearer.

  - configuration (Object, not required)

    The configuration for your selector. It currently supports the following properties:

    - `limit` (number, not required, default=1)

      The size of the cache of your selector. By default only the most recent result of your selector will be cached. Every time your selector gets executed with selector arguments that do not match the arguments that were provided for the previous execution the cache will be invalidated and your selector will be rerun with the new result cached.

      This configuration value is typically useful when your selector will accept runtime arguments. For example, imagine a `productById` selector. You may make multiple calls to this selector across a render cycle of your React application. It would be wasteful to have a maximum cache size of 1, especially in cases where you render multiple products to a page. For these cases it is highly recommended to increase the cache limit. For example you could choose to increase the cache limit to 100, in which case the 100 most recent unique argument calls to `productById` would be cached.

</p>
</details>

<details>
<summary>Example</summary>
<p>

```javascript
import { selector } from 'easy-peasy';

const store = createStore({
  todos: {
    items: [],
    count: selector(
      [state => state.items],
   // |--------------------|
   //     |
   //     V
   //  |-----|
      ([items]) => items.length,
    ),
  }
});
```

</p>
</details>

<details>
<summary>Example containing multiple state selectors</summary>
<p>

```javascript
import { selector } from 'easy-peasy';

const store = createStore({
  profile: {
    firstName: 'Isla',
    lastName: 'Rose',
    fullName: selector(
      [state => state.firstName, state => state.lastName],
    // |----------------------|  |---------------------|
    //     |                                |
    //     |           |---------------------
    //     V           V
      ([firstName, lastName]) => firstName + ' ' + lastName,
    ),
  }
});

store.getState().profile.fullName();
// "Isla Rose"
```

</p>
</details>

<details>
<summary>Example using a selector from a component</summary>
<p>

```javascript
import { useStoreState } from 'easy-peasy';

function TotalTodos() {
  // Note how we execute the selector                    👇
  const todoCount = useStoreState(state => state.todos.count());
  return <div>Total: {todoCount}</div>;
}
```

</p>
</details>

<details>
<summary>Example defining a selector that uses global store state</summary>
<p>

```javascript
const store = createStore({
  todos: {
    items: {
      1: { id: 1, text: 'Win the lottery' }
    }
  },
  profile: {
    favouriteTodoId: 1,
    favouriteTodo: selector(
     [
       state => state.favouriteTodoId,
       // 2nd parameter to a state selector exposes global state
       //         👇
       (state, storeState) => storeState.todos.items
     ],
     ([todoId, todos]) => todos[todoId]
    )
  }
});

store.getState().profile.favouriteTodo();
// { id: 1, text: "Win the lottery" }
```

</p>
</details>

<details>
<summary>Example using runtime arguments against a selector</summary>
<p>

```javascript
const store = createStore({
  todos: {
    items: {
      1: { id: 1, text: 'Win the lottery' }
    },
    getById: selector(
      [state => state.items],
      // The second argument to our selector is an array containing any runtime
      // args that were provided
      //         👇
      ([items], [id]) => items[id]
    )
  },//           ^
}); //           |--------------
//                             |
//                             V
store.getState().todos.getById(1);
// { id: 1, text: "Win the lottery" }
```

And here is an example using it within a React component:

```javascript
import { useStoreState } from 'easy-peasy';

function Todo({ id }) {
  const todo = useStoreState(
    state => state.todos.getById(id),
    [id],
  );
  return todo ? <div>{todo.text}</div> : null;
}
```

</p>
</details>

<details>
<summary>Example customising the cache limit</summary>
<p>

```javascript
const store = createStore({
  todos: {
    items: {
      1: { id: 1, text: 'Win the lottery' }
    },
    getById: selector(
      [state => state.items],
      ([items], [id]) => items[id],
      { limit: 100 }
    )
  },
});

store.getState().todos.getById(1); // new hit
store.getState().todos.getById(2); // new hit
store.getState().todos.getById(1); // cache hit
store.getState().todos.getById(2); // cache hit
```

</p>
</details>

<details>
<summary>Example referencing other selectors</summary>
<p>

You can reference selectors from any part of your tree when defining one.

```javascript
const store = createStore({
  todos: {
    items: [{ id: 1, text: 'Win the lottery' }],
    getFirst: selector(
      [state => state.items],
      ([items]) => items.length > 0 items[0] : undefined,
    ),
    textForFirst: selector(
      // Referencing another selector
      //                  👇
      [state => state.getFirst],
      ([getFirst]) => {
        const todo = getFirst();
        return todo ? todo.text : undefined;
      }
    )
  },
});

store.getState().todos.textForFirst();
// "Win the lottery"
```

</p>
</details>

### listen(on)

Allows you to attach listeners to any action or thunk.

This enables parts of your model to respond to actions being fired in other parts of your model. For example you could have a "notifications" model that populates based on certain actions being fired (logged in, product added to basket, etc).

It also supports attach listeners to a "string" named action. This allows with interop with 3rd party libraries, or aids in migration.

Note: If any action being listened to does not complete successfully (i.e. throws an exception), then no listeners will be fired.

```javascript
listen((on) => {
  on(userModel.loggedIn, action((state, payload) => {
    state.logs.push(`${payload.username} logged in`);
  }));
})
```

<details>
<summary>Arguments</summary>
<p>

  - `on` (Function, required)

    Allows you to attach a listener to an action. It expects the following arguments:

    - `target` (action | thunk | string, required)

      The target action you wish to listen to - you provide the direct reference to the action, or the string name of it.

    - `handler` (Function, required)

      The handler thunk to be executed after the target action is fired successfully. It can be an [`action`](#action) or a [`thunk`](#thunkaction).

      The payload for the handler will be the same payload that the target action received

</p>
</details>


<details>
<summary>Example</summary>
<p>

```javascript
import { action, listen } from 'easy-peasy'; // 👈 import the helper

const userModel = {
  user: null,
  loggedIn: action((state, user) => {
    state.user = user;
  }),
  logOut: action((state) => {
    state.user = null;
  })
};

const notificationModel = {
  msg: '',

  // 👇 you can label your listeners as you like, e.g. "userListeners"
  listeners: listen((on) => {
    // Thunk handler
    on(userModel.loggedIn, thunk(async (actions, payload, helpers) => {
      const msg = `${payload.username} logged in`
      await auditService.log(msg)
    }));

    // Action handler
    on(userModel.logOut, action((state) => {
      state.msg = 'User logged out'
    });
  })
};

const model = {
  user: userModel,
  notification: notificationModel
};
```

</p>
</details>

<details>
<summary>Example listening to string named action</summary>
<p>

```javascript
import { listen } from 'easy-peasy';

const model = {
  msg: '',
  set: (state, payload) => { state.msg = payload; },

  listeners: listen((on) => {
    //      👇 passing in action name
    on('ROUTE_CHANGED', action(actions, payload) => {
      //                            👆
      // We won't know the type of payload, so it will be "any".
      // You will have to annotate it manually if you are using
      // Typescript and care about the payload type.
      actions.set(`Route was changed`);
    }));
  })
};
```
</p>
</details>

### reducer(fn)

Declares a section of state to be calculated via a "standard" reducer function - as typical in Redux. This was specifically added to allow for integrations with existing libraries, or legacy Redux code.

Some 3rd party libraries, for example [`connected-react-router`](https://github.com/supasate/connected-react-router), require you to attach a reducer that they provide to your state. This helper will you achieve this.

```javascript
reducer((state = 1, action) => {
  switch (action.type) {
    case 'INCREMENT': state + 1;
    default: return state;
  }
})
```

<details>
<summary>Arguments</summary>
<p>

  - fn (Function, required)

    The reducer function. It receives the following arguments.

    - `state` (Object, required)

      The current value of the property that the reducer was attached to.

    - `action` (Object, required)

      The action object, typically with the following shape.

      - `type` (string, required)

        The name of the action.

      - `payload` (any)

        Any payload that was provided to the action.

</p>
</details>

<details>
<summary>Example</summary>
<p>

```javascript
import { createStore, reducer } from 'easy-peasy';

const store = createStore({
  counter: reducer((state = 1, action) => {
    switch (action.type) {
      case 'INCREMENT': state + 1;
      default: return state;
    }
  })
});

store.dispatch({ type: 'INCREMENT' });

store.getState().counter;
// 2
```

</p>
</details>

### StoreProvider

Initialises your React application with the store so that your components will be able to consume and interact with the state via the `useStoreState` and `useStoreActions` hooks.

```javascript
<StoreProvider store={store}>
  <App />
</StoreProvider>
```

<details>
<summary>Example</summary>
<p>

```javascript
import { StoreProvider, createStore } from 'easy-peasy';
import model from './model'

const store = createStore(model);

const App = () => (
  <StoreProvider store={store}>
    <TodoList />
  </StoreProvider>
)
```

</p>
</details>

### useStoreState(mapState, externals)

A [hook](https://reactjs.org/docs/hooks-intro.html) granting your components access to the store's state.

```javascript
const todos = useStoreState(state => state.todos.items);
```

> Note: this hook also has an alias of `useStore` to backward support the previous Easy Peasy API

<details>
<summary>Argument</summary>
<p>

  - `mapState` (Function, required)

    The function that is used to resolved the piece of state that your component requires. The function will receive the following arguments:

    - `state` (Object, required)

      The root state of your store.

  - `externals` (Array of any, not required)

    If your `useStoreState` function depends on an external value (for example a property of your component), then you should provide the respective value within this argument so that the `useStoreState` knows to remap your state when the respective externals change in value.

Your `mapState` can either resolve a single piece of state. If you wish to resolve multiple pieces of state then you can either call `useStoreState` multiple times, or if you like resolve an object within your `mapState` where each property of the object is a resolved piece of state (similar to the `connect` from `react-redux`). The examples will illustrate the various forms.

</p>
</details>

<details>
<summary>Example</summary>
<p>

```javascript
import { useStoreState } from 'easy-peasy';

const TodoList = () => {
  const todos = useStoreState(state => state.todos.items);
  return (
    <div>
      {todos.map((todo, idx) => <div key={idx}>{todo.text}</div>)}
    </div>
  );
};
```

</p>
</details>

<details>
<summary>Example resolving multiple values</summary>
<p>

```javascript
import { useStoreState } from 'easy-peasy';

const BasketTotal = () => {
  const totalPrice = useStoreState(state => state.basket.totalPrice);
  const netPrice = useStoreState(state => state.basket.netPrice);
  return (
    <div>
      <div>Total: {totalPrice}</div>
      <div>Net: {netPrice}</div>
    </div>
  );
};
```

</p>
</details>

<details>
<summary>Example resolving multiple values via an object result</summary>
<p>

```javascript
import { useStoreState } from 'easy-peasy';

const BasketTotal = () => {
  const { totalPrice, netPrice } = useStoreState(state => ({
    totalPrice: state.basket.totalPrice,
    netPrice: state.basket.netPrice
  }));
  return (
    <div>
      <div>Total: {totalPrice}</div>
      <div>Net: {netPrice}</div>
    </div>
  );
};
```

</p>
</details>

<details>
<summary>A word of caution</summary>
<p>

Please be careful in the manner that you resolve values from your `mapToState`. To optimise the rendering performance of your components we use equality checking (===) to determine if the mapped state has changed.

When an action changes the piece of state your `mapState` is resolving the equality check will break, which will cause your component to re-render with the new state.

Therefore deriving state within your `mapState` in a manner that will always produce a new value (for e.g. an array) is an anti-pattern as it will break our equality checks.

```javascript
// ❗️ Using .map will produce a new array instance every time mapState is called
//                                                     👇
const productNames = useStoreState(state => state.products.map(x => x.name))
```

You have two options to solve the above.

Firstly, you could just return the products and then do the `.map` outside of your `mapState`:

```javascript
const products = useStoreState(state => state.products)
const productNames = products.map(x => x.name)
```

Alternatively you could use the [`select`](#selectselector) helper to define derived state against your model itself.

```javascript
import { select, createStore } from 'easy-peasy';

const createStore = ({
  products: [{ name: 'Boots' }],
  productNames: select(state => state.products.map(x => x.name))
});
```

Note, the same rule applies when you are using the object result form of `mapState`:

```javascript
const { productNames, total } = useStoreState(state => ({
  productNames: state.products.map(x => x.name), // ❗️ new array every time
  total: state.basket.total
}));
```

</p>
</details>

### useStoreActions(mapActions)

A [hook](https://reactjs.org/docs/hooks-intro.html) granting your components access to the store's actions.

```javascript
const addTodo = useStoreActions(actions => actions.todos.add);
```

> Note: this hook also has an alias of `useActions` to backward support the previous Easy Peasy API

<details>
<summary>Arguments</summary>
<p>

  - `mapActions` (Function, required)

    The function that is used to resolved the action(s) that your component requires. Your `mapActions` can either resolve single or multiple actions. The function will receive the following arguments:

    - `actions` (Object, required)

      The `actions` of your store.

</p>
</details>

<details>
<summary>Example</summary>
<p>

```javascript
import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

const AddTodo = () => {
  const [text, setText] = useState('');
  const addTodo = useStoreActions(actions => actions.todos.add);
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => addTodo(text)}>Add</button>
    </div>
  );
};
```

</p>
</details>

<details>
<summary>Example resolving multiple actions</summary>
<p>

```javascript
import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';

const EditTodo = ({ todo }) => {
  const [text, setText] = useState(todo.text);
  const { saveTodo, removeTodo } = useStoreActions(actions => ({
    saveTodo: actions.todos.save,
    removeTodo: actions.todo.toggle
  }));
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => saveTodo(todo.id)}>Save</button>
      <button onClick={() => removeTodo(todo.id)}>Remove</button>
    </div>
  );
};
```

</p>
</details>

### useStoreDispatch()

A [hook](https://reactjs.org/docs/hooks-intro.html) granting your components access to the store's dispatch.

```javascript
const dispatch = useStoreDispatch();
```

> Note: this hook also has an alias of `useDispatch` to backward support the previous Easy Peasy API

<details>
<summary>Example</summary>
<p>

```javascript
import { useState } from 'react';
import { useStoreDispatch } from 'easy-peasy';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useStoreDispatch();
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => dispatch({ type: 'ADD_TODO', payload: text })}>Add</button>
    </div>
  );
};
```

</p>
</details>

### StoreConfig

When creating your stores you can provide configuration for more advanced scenarios. In most cases you shouldn't need to reach for these configuration options, however, they can be useful so it is good to familiarise yourself with them.

The store config is an object that accepts the following properties:

- `name` (string, not required, default=EasyPeasyStore)

  Allows you to customise the name of the store. This is especially useful when you are creating multiple stores as you will easily be able to distinguish and toggle between the different store instances within the Redux dev tools.

- `devTools` (bool, not required, default=true)

  Setting this to `true` will enable the [Redux Dev Tools Extension](https://github.com/zalmoxisus/redux-devtools-extension).

- `initialState` (Object, not required, default=undefined)

  Allows you to hydrate your store with initial state (for example state received from your server in a server rendering context).

- `injections` (Any, not required, default=undefined)

  Any dependencies you would like to inject, making them available to your effect actions. They will become available as the 4th parameter to the effect handler. See the [effect](#effectaction) docs for more.

- `mockActions` (boolean, not required, default=false)

  Useful when testing your store, especially in the context of thunks. When set to `true` none of the actions dispatched will update the state, they will be instead recorded and can be accessed via the `getMockedActions` API that is added to the store.  Please see the ["Writing Tests"](#writing-tests) section for more information.

**Super Advanced Redux Specific Configuration Properties**

Under the hood we use Redux. You can customise the Redux store via the following Redux-specific configuration properties:

- `compose` (Function, not required, default=undefined)

  Custom [`compose`](https://redux.js.org/api/compose) function that will be used in place of the one from Redux. This is especially useful in the context of React Native and other environments. See the Usage with React Native notes.

- `enhancers` (Array, not required, default=[])

  Any custom [store enhancers](https://redux.js.org/glossary#store-enhancer) you would like to apply to your Redux store.

- `middleware` (Array, not required, default=[])

  An array of Redux [middleware](https://redux.js.org/glossary#middleware) you would like to attach to your store.

- `reducerEnhancer` (Function, not required, default=(reducer => reducer))

  Any additional reducerEnhancer you would like to enhance to your root reducer (for example you want to use [redux-persist](https://github.com/rt2zz/redux-persist)).

### Store

A store instance contains the following properties:

  - `dispatch` (Function & Object, required)

    The Redux store `dispatch` behaves as normal, however, it also has the actions from your model directly mounted against it - allowing you to easily dispatch actions. Please see the docs on actions/thunks for examples.

  - `getState` (Function, required)

    Returns the full state of the store.

  - `getMockedActions` (Function, required)

    If the `mockActions` configuration value was passed to the `createStore` then calling this function will return the actions that have been dispatched (and mocked). This is useful in the context of testing - especially thunks.

  - `clearMockedActions` (Function, required)

    If the `mockActions` configuration value was passed to the `createStore` then calling this function clears the list of mocked actions that have been tracked by the store. This is useful in the context of testing - especially thunks.

<p>&nbsp;</p>

---

## Deprecated API

### select(selector)

Attach derived state (i.e. is calculated from other parts of your state) to your store.

The results of your selectors will be cached, and will only be recomputed if the state that they depend on changes. You may be familiar with `reselect` - this feature provides you with the same benefits.

<details>
<summary>Arguments</summary>
<p>

  - selector (Function, required)

    The selector function responsible for resolving the derived state. It will be provided the following arguments:

    - `state` (Object, required)

      The local part of state that the `select` property was attached to.

    You can return any derived state you like.

    It also supports returning a function. This allows you to support creating a "dynamic" selector that accepts arguments (e.g. `productById(1)`). We will automatically optimise the function that you return - ensuring that any calls to the function will be automatically be memoised - i.e. calls to it with the same arguments will return cached results. This automatic memoisation of the function can be disabled via the `disableInternalSelectFnMemoize` setting on the `createStore`'s config argument.

  - dependencies (Array, not required)

    If this selector depends on data from other selectors then you should provide the respective selectors within an array to indicate the case. This allows us to make guarantees of execution order so that your state is derived in the manner you expect it to.

</p>
</details>

<details>
<summary>Example</summary>
<p>

```javascript
import { select } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  shoppingBasket: {
    products: [{ name: 'Shoes', price: 123 }, { name: 'Hat', price: 75 }],
    // 👇 define your derived state
    totalPrice: select(state =>
      state.products.reduce((acc, cur) => acc + cur.price, 0)
    )
  }
};

// 👇 access the derived state as you would normal state
store.getState().shoppingBasket.totalPrice;
```

</p>
</details>

<details>
<summary>Example with arguments</summary>
<p>

```javascript
import { select } from 'easy-peasy'; // 👈 import the helper

const store = createStore({
  products: [{ id: 1, name: 'Shoes', price: 123 }, { id: 2, name: 'Hat', price: 75 }],

  productById: select(state =>
    // 👇 return a function that accepts the arguments
    id => state.products.find(x => x.id === id)
  )
};

// 👇 access the select fn and provide its required arguments
store.getState().productById(1);

// This next call will return a cached result
store.getState().productById(1);
```

</p>
</details>

<details>
<summary>Example with Dependencies</summary>
<p>

```javascript
import { select } from 'easy-peasy';

const totalPriceSelector = select(state =>
  state.products.reduce((acc, cur) => acc + cur.price, 0),
)

const netPriceSelector = select(
  state => state.totalPrice * ((100 - state.discount) / 100),
  [totalPriceSelector] // 👈 declare that this selector depends on totalPrice
)

const store = createStore({
  discount: 25,
  products: [{ name: 'Shoes', price: 160 }, { name: 'Hat', price: 40 }],
  totalPrice: totalPriceSelector,
  netPrice: netPriceSelector // price after discount applied
});
```

</p>
</details>

<p>&nbsp;</p>

---

## Usage with Typescript

Easy Peasy has full support for Typescript, via its bundled definitions.

We announced our support for Typescript via [this Medium post](https://medium.com/@ctrlplusb/easy-typed-state-in-react-with-hooks-and-typescript-eacd32901f05).

The documentation below will be expanded into higher detail soon, but the combination of the Medium post and the below examples should be enough to get you up and running for now. If anything is unclear please feel free to post and issue and we would be happy to help.

We also have an [example repository](https://github.com/ctrlplusb/easy-peasy-typescript) which you can clone and run for a more interactive run through.

<details>
<summary>Firstly, you need to define a type that represents your model.</summary>
<p>

Easy Peasy exports numerous types to help you declare your model correctly.

```typescript

import { Action, Reducer, Thunk, Select } from 'easy-peasy'

interface TodosModel {
  items: Array<string>
  // represents a "select"
  firstItem: Select<TodosModel, string | void>
  // represents an "action"
  addTodo: Action<TodosModel, string>
}

interface UserModel {
  token?: string
  loggedIn: Action<UserModel, string>
  // represents a "thunk"
  login: Thunk<UserModel, { username: string; password: string }>
}

interface StoreModel {
  todos: TodosModel
  user: UserModel
  // represents a custom reducer
  counter: Reducer<number>
}
```

</p>
</details>

<details>
<summary>Then you create your store.</summary>
<p>

```typescript
// Note that as we pass the Model into the `createStore` function. This allows
// full type checking along with auto complete to take place
//                          👇
const store = createStore<StoreModel>({
  todos: {
    items: [],
    firstItem: select(state =>
      state.items.length > 0 ? state.items[0] : undefined,
    ),
    addTodo: action((state, payload) => {
      state.items.push(payload)
    }),
  },
  user: {
    token: undefined,
    loggedIn: action((state, payload) => {
      state.token = payload
    }),
    login: effect(async (dispatch, payload) => {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { token } = await response.json()
      dispatch.user.loggedIn(token)
    }),
  },
  counter: reducer((state = 0, action) => {
    switch (action.type) {
      case 'COUNTER_INCREMENT':
        return state + 1
      default:
        return state
    }
  }),
})
```

</p>
</details>

<details>
<summary>The store's APIs will be typed</summary>
<p>

```typescript
console.log(store.getState().todos.firstItem)

store.dispatch({ type: 'COUNTER_INCREMENT' })

store.dispatch.todos.addTodo('Install typescript')
```

</p>
</details>

<details>
<summary>You can type your hooks too.</summary>
<p>

``` typescript
import { useStoreState, useStoreActions, Actions, State } from 'easy-peasy';
import { StoreModel } from './your-store';

function MyComponent() {
  const token = useStoreState((state: State<StoreModel>) =>
    state.user.token
  )
  const login = useStoreActions((actions: Actions<StoreModel>) =>
	  actions.user.login,
  )
  return (
    <button onClick={() => login({ username: 'foo', password: 'bar' })}>
      {token || 'Log in'}
    </button>
  )
}
```

The above can become a bit cumbersome - having to constantly provide your types to the hooks. Therefore we recommend using the bundled `createTypedHooks` helper in order to create pre-typed versions of the hooks.

```typescript
// hooks.js

import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "./model";

export default createTypedHooks<StoreModel>();
```

We could then revise our previous example.

``` typescript
import { useStoreState, useStoreActions } from './hooks';

function MyComponent() {
  const token = useStoreState((state) => state.user.token)
  const login = useStoreActions((actions) => actions.user.login)
  return (
    <button onClick={() => login({ username: 'foo', password: 'bar' })}>
      {token || 'Log in'}
    </button>
  )
}
```

That's far cleaner - and it's still fully type checked.

</p>
</details>

<details>
<summary>We also support typing `react-redux` based integrations.</summary>
<p>

```typescript
const Counter: React.SFC<{ counter: number }> = ({ counter }) => (
  <div>{counter}</div>
)

connect((state: State<StoreModel>) => ({
  counter: state.counter,
}))(Counter)
```

</p>
</details>

<p>&nbsp;</p>

---

## Usage with React Native

Easy Peasy is platform agnostic but makes use of features that may not be available in all environments.

<details>
<summary>How to enable remote Redux dev tools</summary>
<p>
React Native, hybrid, desktop and server side Redux apps can use Redux Dev Tools using the [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) library.

To use this library, you will need to pass the DevTools compose helper as part of the [config object](#createstore) to `createStore`

```javascript
import { createStore } from 'easy-peasy';
import { composeWithDevTools } from 'remote-redux-devtools';
import model from './model';

/**
 * model, is used for passing through the base model
 * the second argument takes an object for additional configuration
 */

const store = createStore(model, {
  compose: composeWithDevTools({ realtime: true, trace: true })
  // initialState: {}
});

export default store;
```

See [https://github.com/zalmoxisus/remote-redux-devtools#parameters](https://github.com/zalmoxisus/remote-redux-devtools#parameters) for all configuration options.
</p>
</details>

<p>&nbsp;</p>

---

## Writing Tests

The below covers some strategies for testing your store / components. If you have any useful test strategies please consider making a pull request so that we can expand this section.

All the below examples are using [Jest](https://jestjs.io) as the test framework, but the ideas should hopefully translate easily onto your test framework of choice.

In the examples below you will see that we are testing specific parts of our model in isolation. This makes it far easier to do things like bootstrapping initial state for testing purposes, whilst making your tests less brittle to changes in your full store model structure.

<details>
<summary>Testing an action</summary>
<p>

Actions are relatively simple to test as they are essentially an immutable update to the store. We can therefore test the difference.

Given the following model under test:

```typescript
import { action } from 'easy-peasy'

const todosModel = {
  items: {},
  add: action((state, payload) => {
    state.items[payload.id] = payload
  }),
}
```

We could test it like so:

```typescript
test('add action', async () => {
  // arrange
  const todo = { id: 1, text: 'foo' }
  const store = createStore(todosModel)

  // act
  store.dispatch.add(todo)

  // assert
  expect(store.getState().items).toEqual({ [todo.id]: todo })
})
```

</p>
</details>

<details>
<summary>Testing a thunk</summary>
<p>

Thunks are more complicated to test than actions as they can invoke network requests and other actions.

There will likely be seperate tests for our actions, therefore it is recommended that you don't test for the state changes of actions fired by your thunk. We rather recommend that you test for what actions were fired from your thunk under test.

To do this we expose an additional configuration value on the `createStore` API, specifically `mockActions`. If you set the `mockActions` configuration value, then all actions that are dispatched will not affect state, and will instead be mocked and recorded. You can get access to the recorded actions via the `getMockedActions` function that is available on the store instance. We took inspiration for this functionality from the awesome [`redux-mock-store`](https://github.com/dmitry-zaets/redux-mock-store) package.

In addition to this approach, if you perform side effects such as network requests within your thunks, we highly recommend that you expose the modules you use to do so via the `injections` configuration variable of your store. If you do this then it makes it significantly easier to provide mocked instances to your thunks when testing.

We will demonstrate all of the above within the below example.

Given the following model under test:

```typescript
import { action, thunk } from 'thunk';

const todosModel = {
  items: {},
  add: action((state, payload) => {
    state.items[payload.id] = payload
  }),
  fetchById: thunk(async (actions, payload, helpers) => {
    const { injections } = helpers
    const todo = await injections.fetch(`/todos/${payload}`).then(r => r.json())
    actions.add(todo)
  }),
}
```

We could test it like so:

```typescript
import { createStore, actionName, thunkStartName, thunkCompleteName, thunkFailName } from 'easy-peasy'

const createFetchMock = response =>
  jest.fn(() => Promise.resolve({ json: () => Promise.resolve(response) }))

test('fetchById', async () => {
  // arrange
  const todo = { id: 1, text: 'Test my store' }
  const fetch = createFetchMock(todo)
  const store = createStore(todosModel, {
    injections: { fetch },
    mockActions: true,
  })

  // act
  await store.dispatch.fetchById(todo.id)

  // assert
  expect(fetch).toHaveBeenCalledWith(`/todos/${todo.id}`)
  expect(store.getMockedActions()).toEqual([
    { type: thunkStartName(todosModel.fetchById), payload: todo.id },
    { type: actionName(todosModel.add), payload: todo },
    { type: thunkCompleteName(todosModel.fetchById), payload: todo.id },
  ])
})
```

</p>
</details>

<details>
<summary>Testing components</summary>
<p>

When testing your components I strongly recommend the approach recommended by Kent C. Dodd's awesome [Testing Javascript](https://testingjavascript.com/) course, where you try to test the behaviour of your components using a natural DOM API, rather than reaching into the internals of your components. He has published a very useful package by the name of [`@testing-library/react`](https://github.com/testing-library/react-testing-library) to help us do so. The tests below shall be adopting this package and strategy.

Imagine we were trying to test the following component.

```typescript
function Counter() {
  const count = useStoreState(state => state.count)
  const increment = useStoreActions(actions => actions.increment)
  return (
    <div>
      Count: <span data-testid="count">{count}</span>
      <button type="button" onClick={increment}>
        +
      </button>
    </div>
  )
}
```

As you can see it is making use of our hooks to gain access to state and actions of our store.

We could adopt the following strategy to test it.

```typescript
import { createStore, StoreProvider } from 'easy-peasy'
import model from './model';

test('Counter', () => {
  // arrange
  const store = createStore(model)
  const app = (
    <StoreProvider store={store}>
      <ComponentUnderTest />
    </StoreProvider>
  )

  // act
  const { getByTestId, getByText } = render(app)

  // assert
  expect(getByTestId('count').textContent).toEqual('0')

  // act
  fireEvent.click(getByText('+'))

  // assert
  expect(getByTestId('count').textContent).toEqual('1')
})
```

As you can see we create a store instance in the context of our test and wrap the component under test with the `StoreProvider`. This allows our component to act against our store.

We then interact with our component using the DOM API exposed by the render.

This grants us great power in being able to test our components with a great degree of confidence that they will behave as expected.

Some other strategies that you could employ whilst using this pattern include:

  - Providing an initial state to your store within the test.

    ```typescript
    test('Counter', () => {
      // arrange
      const store = createStore(model, { initialState: initialStateForTest })

      // ...
    })
    ```

  - Utilising the `injections` and `mockActions` configurations of the `createStore` to avoid performing actions with side effects in your test.

There is no one way to test your components, but it is good to know of the tools available to you. However you choose to test your components, I do recommend that you try to test them as close to their real behaviour as possible - i.e. try your best to prevent implementation details leaking into your tests.

</p>
</details>

<p>&nbsp;</p>

---


## Typescript API

### Actions<Model = {}>

Creates a type that represents the actions for a model.

<details>
<summary>Example</summary>
<p>

```typescript
import { Actions } from 'easy-peasy';

type ModelActions = Actions<MyStoreModel>;
```

</p>
</details>

### Action<Model = {}, Payload = any>

Represents an `action`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Action, action } from 'easy-peasy';

interface Todos {
  items: string[];
  add: Action<Todos, string>;
}

const todos: Todos = {
  items: [],
  add: action((state, payload) => {
    state.items.push(payload);
  })
};
```

</p>
</details>

### Listen<Model = {}, Injections = any, StoreModel = {}>

Represents a `listen`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Listen, listen } from 'easy-peasy';

interface Audit {
  logs: string[];
  listen: Listen<Audit>;
}

const audit: Audit = {
  logs: [],
  listen: (on) => {
    on('ROUTE_CHANGED', action((state, payload) => {
      state.logs.push(payload.path);
    }));
  },
};
```

</p>
</details>

### Reducer<State = any, Action = ReduxAction>

Represents a `reducer`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Reducer, reducer } from 'easy-peasy';
import { RouterState, routerReducer } from 'my-router-solution';

interface Model {
  router: Reducer<RouterState>;
}

const model: Model = {
  router: reducer(routerReducer)
};
```

</p>
</details>

### Select<Model = {}, Result = any>

Represents a `select`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Select, select } from 'easy-peasy';

interface Todos {
  items: string[];
  firstTodo: Select<Todos, string | undefined>;
}

const todos: Todos = {
  items: [],
  firstTodo: select((state) => {
    return state.items.length > 0 ? state.items[0] : undefined;
  })
};
```

</p>
</details>

### Thunk<Model = {}, Payload = void, Injections = any, StoreModel = {}, Result = any>

Represents a `thunk`, useful when defining your model interface.

<details>
<summary>Example</summary>
<p>

```typescript
import { Thunk, thunk } from 'easy-peasy';

interface Todos {
  items: string[];
  saved: Action<Todos, string>;
  save: Thunk<Todos, string>;
}

const todos: Todos = {
  items: [],
  saved: action((state, payload) => {
    state.items.push(payload);
  }),
  save: thunk(async (actions, payload) => {
    await saveTodo(payload);
    actions.saved(payload);
  })
};
```

</p>
</details>

### createTypedHooks<StoreModel = {}>()

Allows you to create typed versions of all the hooks so that you don't need to constantly apply typing information against them.

<details>
<summary>Example</summary>
<p>

```typescript
// hooks.js
import { createTypedHooks } from 'easy-peasy';
import { StoreModel } from './model';

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<StoreModel>();

export default {
  useStoreActions,
  useStoreState,
  useStoreDispatch
}
```

And then use your typed hooks in your components:

```typescript
import { useStoreState } from './hooks';

export default MyComponent() {
  //                          This will be typed
  //                                       👇
  const message = useStoreState(state => state.message);
  return <div>{message}</div>;
}
```

</p>
</details>

<p>&nbsp;</p>

---

## Tips, Tricks, and FAQs

Below are a few useful tips and tricks when using Easy Peasy.

### Generalising effects/actions/state via helpers

You may identify repeated patterns within your store implementation. It is possible to generalise these via helpers.

For example, say you had the following:

```javascript
const store = createStore({
  products: {
    data: {},
    ids: select(state => Object.keys(state.data)),
    fetched: action((state, products) => {
      products.forEach(product => {
        state.data[product.id] = product;
      });
    }),
    fetch: thunk(async (actions) => {
      const data = await fetchProducts();
      actions.fetched(data);
    })
  },
  users: {
    data: {},
    ids: select(state => Object.keys(state.data)),
    fetched: action((state, users) => {
      users.forEach(user => {
        state.data[user.id] = user;
      });
    }),
    fetch: thunk(async (dispatch) => {
      const data = await fetchUsers();
      actions.fetched(data);
    })
  }
})
```

You will note a distinct pattern between the `products` and `users`. You could create a generic helper like so:

```javascript
const data = (endpoint) => ({
  data: {},
  ids: select(state => Object.keys(state.data)),
  fetched: action((state, items) => {
    items.forEach(item => {
      state.data[item.id] = item;
    });
  }),
  fetch: thunk(async (actions, payload) => {
    const data = await endpoint();
    actions.fetched(data);
  })
})
```

You can then refactor the previous example to utilise this helper like so:

```javascript
const store = createStore({
  products: {
    ...data(fetchProducts)
    // attach other state/actions/etc as you like
  },
  users: {
    ...data(fetchUsers)
  }
})
```

This produces an implementation that is like for like in terms of functionality but far less verbose.

### Usage with class components / Using with react-redux

As Easy Peasy outputs a standard Redux store, so it is entirely possible to use Easy Peasy with the official [`react-redux`](https://github.com/reduxjs/react-redux) package.

This allows you to do a few things:

 - Slowly migrate a legacy application that is built using `react-redux`
 - Connect your store to Class components via `connect`

<details>
<summary>First, install the `react-redux` package</summary>
<p>

```bash
npm install react-redux
```

</p>
</details>

<details>
<summary>Then wrap your app with the `Provider`</summary>
<p>

```javascript
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'easy-peasy';
import { Provider } from 'react-redux'; // 👈 import the provider
import model from './model';
import TodoList from './components/TodoList';

// 👇 then create your store
const store = createStore(model);

const App = () => (
  // 👇 then pass it to the Provider
  <Provider store={store}>
    <TodoList />
  </Provider>
)

render(<App />, document.querySelector('#app'));
```

</p>
</details>

<details>
<summary>Finally, use `connect` against your components</summary>
<p>

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux'; // 👈 import the connect

function TodoList({ todos, addTodo }) {
  return (
    <div>
      {todos.map(({id, text }) => <Todo key={id} text={text} />)}
      <AddTodo onSubmit={addTodo} />
    </div>
  )
}

export default connect(
  // 👇 Map to your required state
  state => ({ todos: state.todos.items }
  // 👇 Map your required actions
  dispatch => ({ addTodo: dispatch.todos.addTodo })
)(EditTodo)
```

</p>
</details>

<p>&nbsp;</p>

----

## Prior art

This library was massively inspired by the following awesome projects. I tried to take the best bits I liked about them all and create this package. Huge love to all contributors involved in the below.

 - [rematch](https://github.com/rematch/rematch)

   Rematch is Redux best practices without the boilerplate. No more action types, action creators, switch statements or thunks.

 - [react-easy-state](https://github.com/solkimicreb/react-easy-state)

   Simple React state management. Made with ❤️ and ES6 Proxies.

 - [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree)

   Model Driven State Management