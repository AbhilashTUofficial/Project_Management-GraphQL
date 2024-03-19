import React from "react";
import "../src/Scss/index.scss";
import NavBar from "./Components/NavBar";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./Components/Clients";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Projects from "./Components/Projects";
import NotFoundPage from "./Components/NotFound";
import ProjectView from "./Components/ProjectView";
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/clients",
      error:<NotFoundPage/>,
      element: (
        <>
          <NavBar />
          <Clients />
        </>
      ),
    },
    {
      path: "/",
      errorElement: <NotFoundPage />,
      element: (
        <>
          <NavBar />
          <Projects />
        </>
      ),
    },
    {
      path: "/:id",
      errorElement: <NotFoundPage />,
      element: <ProjectView />
      ,
    },

  ]);

  return (
    <ApolloProvider client={client}>
      <div className="app-cointainer">
        <RouterProvider router={router} />
      </div>
    </ApolloProvider>
  );
}

export default App;
