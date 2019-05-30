import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Error404,
  Dashboard,
  Member,
  FormMember,
  ViewMember
} from './pages';
// import { isAuthenticated } from './services/auth';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//       )
//     }
//   />
// );

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/member" component={Member}/>
      <Route exact path="/member/:id" component={FormMember}/>
      <Route exact path="/member/view/:id" component={ViewMember}/>
      <Route path="*" component={Error404} />
      <Route exact path="/404" component={Error404} />
    </Switch>
  </BrowserRouter>
);
