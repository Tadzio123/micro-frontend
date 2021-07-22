import * as React from 'react';
import { Link, Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { prefixRoutes, createChildHistory } from 'child-history';
import { ComponentA } from '../../shared';
import { History } from 'history';

const ViewE = () => (
  <div>
    <h1>View E </h1>
    <ComponentA />
  </div>
);

const ViewF = () => (
  <div>
    <h1>View F</h1>
  </div>
);

const Dashboard = () => (
  <ul>
    <li>
      <Link to="/view-E">View E</Link>
    </li>
    <li>
      <Link to="/view-F">View F</Link>
    </li>
  </ul>
);

const routes = [
  {
    path: '/view-E',
    component: ViewE
  },
  {
    path: '/view-F',
    component: ViewF
  },
  {
    path: '/',
    exact: true,
    component: Dashboard
  }
];

interface AppBProps {
  basename: string;
  history: History;
}

const AppC = ({ basename, history }: AppBProps) => {
  // Prefix routes with the provided base path
  const prefixedRoutes = prefixRoutes(basename, routes);
  // Add proxy layer to history
  const childHistory = createChildHistory({ history, basename });

  return <Router history={childHistory}>{renderRoutes(prefixedRoutes)}</Router>;
};

export default AppC;
