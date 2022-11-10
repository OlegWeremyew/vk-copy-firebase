import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {Auth, NotFoundPage} from "../pages";
import {routesList} from "./data";
import {routesListType} from "./types";
import {useAuth} from "../providers";

export const RoutesPage: FC = () => {

  const {user} = useAuth()

  return (
    <Routes>
      <Route path='/*' element={<NotFoundPage/>}/>
      {
        routesList.map((route: routesListType) => {
          if (route.auth && !user) {
            return (
              <Route key={`route ${route.path}`} path={route.path} element={<Auth/>}/>
            )
          }

          return (
            <Route key={`route ${route.path}`} path={route.path} element={<route.component/>}/>
          )
        })
      }
    </Routes>
  );
};
