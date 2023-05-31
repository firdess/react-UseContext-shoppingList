import React, { createContext, useState } from "react";
import "./styles.css";
import { Route } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { data } from "./data";

export const BookContext = createContext();

export default function App() {
  const [state, setState] = useState({
    bookList: data,
    cart: []
  });

  const addToCart = (book) => {
    setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.id === book.id)
        ? state.cart.map((cartItem) =>
            cartItem.id === book.id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        : [...state.cart, { ...book, count: 1 }]
    });
  };

  const increase = (id) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      )
    });
  };

  const decrease = (id) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
          : cartItem
      )
    });
  };

  const removeItem = (id) => {
    setState({
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== id)
    });
  };

  return (
    <BookContext.Provider
      value={{
        state: state,
        addToCart,
        decrease,
        increase,
        removeItem
      }}
    >
      <div className="App">
        <h1>Alışveriş Sepeti Yapımı</h1>
        <Route exact path="/" component={Products} />
        <Route path="/cart" component={Cart} />
      </div>
    </BookContext.Provider>
  );
}
