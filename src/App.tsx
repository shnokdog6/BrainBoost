import React, {Fragment} from 'react';
import {createGlobalStyle} from "styled-components";
import {routes} from "./router/routes";
import {RouterProvider} from "react-router-dom";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body, #root {
        height: 100vh;
        overflow: hidden;
    }
`;

function App() {
  return (
      <Fragment>
          <GlobalStyles/>
          <RouterProvider router={routes}/>
      </Fragment>
  );
}

export default App;
