import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { RootState } from "./app/store";

// Criamos o custom render
const customRender = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
      },...preloadedState
    }),
    ...renderOptions
  }: {
    preloadedState?: RootState;
    store?: ReturnType<typeof configureStore>;
  } = {}
) => {
  const Wrapper: React.FC<{
    children: React.ReactNode;
  }> = ({ children }) => <Provider store={store}>{children}</Provider>;

  render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
};

// re-exportamos todo
export * from "@testing-library/react";

// sobrescrevemos o método render.
export { customRender as render };