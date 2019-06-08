import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Error404,
  Dashboard,
  Member,
  FormMember,
  ViewMember,
  Commerce,
  FormCommerce,
  ViewCommerce,
  Equipment,
  FormEquipment,
  ViewEquipment,
  Professional,
  FormProfessional,
  ViewProfessional
} from './pages';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />

      <Route exact path="/member" component={Member} />
      <Route exact path="/member/:id" component={FormMember} />
      <Route exact path="/member/view/:id" component={ViewMember} />

      <Route exact path="/commerce" component={Commerce} />
      <Route exact path="/commerce/:id" component={FormCommerce} />
      <Route exact path="/commerce/view/:id" component={ViewCommerce} />

      <Route exact path="/equipment" component={Equipment} />
      <Route exact path="/equipment/:id" component={FormEquipment} />
      <Route exact path="/equipment/view/:id" component={ViewEquipment} />

      <Route exact path="/professional" component={Professional} />
      <Route exact path="/professional/:id" component={FormProfessional} />
      <Route exact path="/professional/view/:id" component={ViewProfessional} />

      <Route path="*" component={Error404} />
      <Route exact path="/404" component={Error404} />
    </Switch>
  </BrowserRouter>
);
