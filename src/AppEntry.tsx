import { canaryDeploymentCheck } from './utils/canary-deployment';
/*** CANARY Deployment for redirecting users to new UI
 Users visiting the first time the UI will get assigned with a random number, the number will be stored in localstorage and reused everytime the user opens the UI.
 The users that gets a number that is lower than a canary weight threshold, they will be redirected to the new ui,
 the others will be using the current UI.
 The threshold can be configured in the backend so that a bigger/smaller number of users can be routed to the new UI.
 ***/
// TODO get the threshold from the backend regsvc
const UI_CANARY_WEIGHT_TRESHOLD = 95;
canaryDeploymentCheck(UI_CANARY_WEIGHT_TRESHOLD);
/** END canary UI deployment **/


import React from 'react';
import App from './App';

const AppEntry = () => <App />;

export default AppEntry;
