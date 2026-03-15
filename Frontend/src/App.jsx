// import { RouterProvider } from "react-router-dom";
// import { x } from "./routes/mainLayout";
// import { Provider } from "react-redux";
// import store from "./app/store";
// function App() {
//   return (
//     <Provider store={store}>
//       <RouterProvider router={x} />
//     </Provider>
//   );
// }

// export default App;

import { RouterProvider } from "react-router-dom";
import { x } from "./routes/mainLayout";

function App() {
  return <RouterProvider router={x} />;
}

export default App;