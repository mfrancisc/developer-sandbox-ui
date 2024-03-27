import React, { Fragment, useEffect } from 'react';
import Routing from './routes/Routing';

import './App.scss';

import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';
import RegistrationProvider from './components/RegistrationProvider';

const App = () => {
  const { updateDocumentTitle } = useChrome();

  useEffect(() => {
    // You can use directly the name of your app
    updateDocumentTitle('Developer Sandbox');
  }, []);

  return (
    <Fragment>
      <RegistrationProvider>
        <Routing />
      </RegistrationProvider>
    </Fragment>
  );
};

export default App;
