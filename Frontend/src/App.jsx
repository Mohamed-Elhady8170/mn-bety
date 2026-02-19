import { RouterProvider } from "react-router-dom";
import { x } from "./roles/Users/Pages/mainLayout";
import { Provider } from "react-redux";
import store from "./app/store";
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={x} />
    </Provider>
  );
}

export default App;
