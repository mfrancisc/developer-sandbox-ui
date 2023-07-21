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
import { useTrackEvent } from '../hooks/useTrackEvent';

const RegistrationProvider = ({ children }: { children?: React.ReactNode }) => {
  const track = useTrackEvent();

  // state
  const [statusUnknown, setStatusUnknown] = React.useState(true);
  const [signupData, setSignupData] = React.useState<SignupData>();
  const [error, setError] = React.useState<string>();
  const [showUserSignup, setShowUserSignup] = React.useState(false);

  const status = React.useMemo(
    () => (statusUnknown ? 'unknown' : signupDataToStatus(signupData)),
    [statusUnknown, signupData],
  );

  React.useEffect(() => {
    // send event when signup status is first established and upon change
    if (!statusUnknown) {
      track('DevSandbox Signup Status', {
        status,
      });
    }
  }, [statusUnknown, status]);

  const getSignupDataRef = React.useRef<() => void>();
  getSignupDataRef.current = async () => {
    try {
      const data = await getSignupData();
      if (!isEqual(data, signupData)) {
        setSignupData(data);
      }
      setError(undefined);
      setStatusUnknown(false);
    } catch (e) {
      setError(`An error occurred retrieving registration status. ${errorMessage(e)}`);
      setStatusUnknown(false);
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
      }, 10000);
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
            track('DevSandbox Signup Closed');
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
