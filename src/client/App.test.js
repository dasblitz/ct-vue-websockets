import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/vue";

import products from "./store/modules/products.js";

import App from "./App";

test("can render with vuex with custom store", async () => {
  const addToBasketFn = jest.fn();

  // mock the orderProduct action, to see if it get called later
  products.actions.orderProduct = addToBasketFn;

  const store = {
    state: {
      socketConnected: true
    },
    modules: { products }
  };

  const { getByTestId, getByText } = render(App, { store });

  expect(getByTestId("stock")).toHaveTextContent(
    "There are 0 products remaining"
  );

  expect(getByTestId("connection-status")).toHaveTextContent(
    "Connected to server: true"
  );

  await fireEvent.click(getByText("Add to basket"));
  expect(addToBasketFn).toHaveBeenCalled();
});
