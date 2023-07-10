import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {
  RegistrationContext,
  RegistrationContextValue,
  signupDataToStatus,
} from '../utils/registration-context';
import { getSignupData } from '../services/registration-service';
import RegistrationModal from './RegistrationModal/RegistrationModal';
import { SignupData } from '../types';
import { errorMessage } from '../utils/utils';

const RegistrationProvider = ({ children }: { children?: React.ReactNode }) => {
  // state
  const [statusUnknown, setStatusUnknown] = React.useState(true);
  const [signupData, setSignupData] = React.useState<SignupData>();
  const [error, setError] = React.useState<string>();
  const [showUserSignup, setShowUserSignup] = React.useState(false);

  const status = React.useMemo(
    () => (statusUnknown ? 'unknown' : signupDataToStatus(signupData)),
    [statusUnknown, signupData],
  );

  const getSignupDataRef = React.useRef<() => void>();
  getSignupDataRef.current = async () => {
    try {
      const data = await getSignupData();
      if (error || !isEqual(data, signupData)) {
        setSignupData(data);
      }
      setStatusUnknown(false);
    } catch (e) {
      setError(errorMessage(e) || 'An error occurred retrieving activation status.');
    }
  };

  React.useEffect(() => {
    getSignupDataRef.current?.();
  }, []);

  const pollStatus = !showUserSignup;
  React.useEffect(() => {
    if (pollStatus) {
      const handle = setInterval(() => {
        getSignupDataRef.current?.();
      }, 5000);
      return () => {
        clearInterval(handle);
      };
    }
  }, [pollStatus]);

  const actions = React.useMemo(() => ({ setError, setSignupData, setShowUserSignup }), []);
  const contextValue: RegistrationContextValue = React.useMemo(
    () => [
      {
        error,
        signupData,
        showUserSignup,
        status,
      },
      actions,
    ],
    [error, signupData, showUserSignup, status, actions],
  );
  return (
    <RegistrationContext.Provider value={contextValue}>
      {showUserSignup ? (
        <RegistrationModal
          initialStatus={status}
          onClose={(newSignupData) => {
            if (newSignupData) {
              setSignupData(newSignupData);
            }
            setShowUserSignup(false);
          }}
        />
      ) : null}
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
