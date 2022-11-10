import {Auth, Conversation, Friends, Home, Messages, Profile} from "../../pages";
import {routesListType} from "../types";

export const routesList: routesListType[] = [
  {
    path: '/',
    exact: true,
    component: Home,
    auth: true,
  },
  {
    path: '/profile/:id',
    exact: false,
    component: Profile,
    auth: true,
  },
  {
    path: '/messages',
    exact: true,
    component: Messages,
    auth: true,
  },
  {
    path: '/message/:id',
    exact: false,
    component: Conversation,
    auth: true,
  },
  {
    path: '/friends/:id',
    exact: false,
    component: Friends,
    auth: true,
  },
  {
    path: '/auth',
    exact: true,
    component: Auth,
    auth: false,
  },
]
