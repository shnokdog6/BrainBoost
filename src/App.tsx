import React from 'react';
import {createGlobalStyle} from "styled-components";
import {routes} from "./router/routes";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {PersistGate} from 'redux-persist/integration/react';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Inter,sans-serif;
    }
    
    body, #root {
        height: 100vh;
        overflow: hidden;
    }
`;

function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <GlobalStyles/>
              <RouterProvider router={routes}/>
          </PersistGate>
      </Provider>
  );
}

export default App;
