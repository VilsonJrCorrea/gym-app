import { useState, useEffect } from 'react';

let stores = {};
const subscriptions = {};

const defaultReducer = (state, payload) => payload;

function subscriberExists(name) {
  const keys = Object.keys(subscriptions);
  return keys.find(key => subscriptions[key].find(action => action && action.name === name));
}

function subscribe(actions, callback) {
  if (!actions || !Array.isArray(actions)) new Error('first argument must be an array');
  if (!callback || typeof callback !== 'function') new Error('second argument must be a function');
  if (subscriberExists(this.name))
    new Error('you are already subscribing to this store. unsubscribe to configure a new subscription.');
  actions.forEach(action => {
    if (!subscriptions[action]) {
      subscriptions[action] = [];
    }
    subscriptions[action].push({ callback, name: this.name });
  });
}

function unsubscribe() {
  const keys = Object.keys(subscriptions);
  keys.forEach(key => {
    if (subscriptions[key].length === 1) {
      delete subscriptions[key];
    } else {
      subscriptions[key] = subscriptions[key].filter(action => action.name !== this.name);
    }
  });
}

class StoreInterface {
  constructor(name, store, useReducer) {
    this.name = name;
    if (useReducer) {
      this.dispatch = store.setState;
    } else {
      this.setState = store.setState;
    }
    this.getState = () => store.state;
    this.subscribe = subscribe;
    this.unsubscribe = unsubscribe;
  }

  setState() {
    console.warn(
      `[React Hookstore] Store ${
        this.name
      } uses a reducer to handle its state updates. use dispatch instead of setState`
    );
  }

  dispatch() {
    console.warn(
      `[React Hookstore] Store ${
        this.name
      } does not use a reducer to handle state updates. use setState instead of dispatch`
    );
  }
}

function getStoreByIdentifier(identifier) {
  const name = identifier instanceof StoreInterface ? identifier.name : identifier;
  return stores[name];
}

export function createStore(name, state = {}, reducer = defaultReducer) {
  if (typeof name !== 'string') {
    new Error('store name must be a string');
  }
  if (stores[name]) {
    new Error('store already exists');
  }

  const store = {
    state,
    reducer,
    setState(action, callback) {
      this.state = this.reducer(this.state, action);
      this.setters.forEach(setter => setter(this.state));
      if (typeof callback === 'function') callback(this.state);
      if (action && action.type && subscriptions[action.type]) {
        subscriptions[action.type].forEach(
          subscription => subscription.name === name && subscription.callback(action, this.state)
        );
      }
    },
    setters: []
  };
  store.setState = store.setState.bind(store);
  store.public = new StoreInterface(name, store, reducer !== defaultReducer);

  stores = Object.assign({}, stores, { [name]: store });
  return store.public;
}

export function getStoreByName(name) {
  try {
    return stores[name].public;
  } catch (e) {
    return new Error('store does not exist');
  }
}

export function useStore(identifier) {
  const store = getStoreByIdentifier(identifier);
  if (!store) {
    new Error('store does not exist');
  }

  const [state, set] = useState(store.state);

  useEffect(
    () => () => {
      store.setters = store.setters.filter(setter => setter !== set);
    },
    [store.setters]
  );

  if (!store.setters.includes(set)) {
    store.setters.push(set);
  }

  return [state, store.setState];
}
