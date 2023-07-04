import * as React from 'react';
import {
  Alert,
  AlertActionCloseButton,
  AlertVariant,
  Bullseye,
  Button,
  ButtonVariant,
  Checkbox,
  Form,
  FormGroup,
  Grid,
  GridItem,
  Modal,
  ModalVariant,
  Spinner,
  TextContent,
  TextInput,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import { CheckIcon } from '@patternfly/react-icons/dist/esm/icons/check-icon';
import FooterButton from './FooterButton';
import {
  completePhoneVerification,
  getSignupData,
  initiatePhoneVerification,
  isValidCountryCode,
  isValidPhoneNumber,
  signup,
} from '../../services/registration-service';
import sandboxReadyImg from '../../images/launch-sandbox-success.svg';
import { useRecaptcha } from '../../hooks/useRecaptcha';
import { errorMessage } from '../../utils/utils';
import { SignupData } from '../../types';
import { Status } from '../../utils/registration-context';

type Props = {
  initialStatus?: Status;
  onClose: (signupData?: SignupData) => void;
};

const RegistrationModal = ({ onClose, initialStatus }: Props) => {
  useRecaptcha();

  const [step, setStep] = React.useState<
    'new' | 'ready' | 'provisioning' | 'verify' | 'verifyCode' | 'pending-approval'
  >(initialStatus && initialStatus !== 'unknown' ? initialStatus : 'new');
  const [error, setError] = React.useState<string>();
  const [verifyCode, setVerifyCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [codeResent, setCodeResent] = React.useState(false);
  const [accepted, setAccepted] = React.useState(false);

  const [signupData, setSignupDataState] = React.useState<SignupData>();

  const getSignupDataFn = React.useCallback(async () => {
    try {
      const data = await getSignupData();
      setSignupDataState(data);
      if (data == null) {
        setStep('new');
      } else if (data.status.ready === true) {
        setStep('ready');
      } else if (data.status.ready === false && data.status.verificationRequired) {
        setStep((cur) => (cur !== 'verify' && cur !== 'verifyCode' ? 'verify' : cur));
      } else if (data.status.ready === false && data.status.reason === 'Provisioning') {
        setStep('provisioning');
      } else {
        setStep('pending-approval');
      }
    } catch (e) {
      setError(errorMessage(e));
    }
  }, []);

  React.useEffect(() => {
    if (step === 'provisioning' || step === 'pending-approval') {
      const handle = setInterval(getSignupDataFn, 1000);
      return () => {
        clearInterval(handle);
      };
    }
  }, [step]);

  return (
    <Modal
      data-testid="registration-modal"
      variant={ModalVariant.small}
      title={
        step === 'ready'
          ? "Congratulations, you're ready to get started!"
          : 'Activate your free 30 days trial'
      }
      isOpen
      onClose={() => onClose()}
    >
      {error ? (
        <Alert
          title="An error occurred"
          variant={AlertVariant.danger}
          actionClose={<AlertActionCloseButton onClose={() => setError(undefined)} />}
          isInline
          className="pf-u-mb-lg"
        >
          {error}
        </Alert>
      ) : null}
      {(() => {
        switch (step) {
          case 'new':
            return (
              <>
                <TextContent>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </TextContent>
                <div className="pf-u-pt-lg pf-u-pt-md pf-u-text-align-center">
                  <Checkbox
                    aria-label="Join the Red Hat Developers program"
                    id="accept-join"
                    isChecked={accepted}
                    onChange={(checked) => setAccepted(checked)}
                    className="pf-u-mr-sm"
                  />
                  Join the{' '}
                  <Button
                    variant={ButtonVariant.link}
                    isInline
                    component="a"
                    href="https://developers.redhat.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Red Hat Developers program <ExternalLinkAltIcon />
                  </Button>
                </div>
                <FooterButton
                  isDisabled={loading || !accepted}
                  isLoading={loading}
                  onClick={async () => {
                    try {
                      setLoading(true);
                      await signup();
                      await getSignupDataFn();
                    } catch (e) {
                      setError(errorMessage(e));
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Activate
                </FooterButton>
              </>
            );
          case 'verify':
            return (
              <>
                <TextContent>
                  <p>We are preparing your Sandbox. It will be available shortly.</p>
                  <p>
                    One more thing, to ensure your account is secure please enter a valid phone
                    number for SMS verification.
                  </p>
                </TextContent>
                <Form>
                  <Grid hasGutter className="pf-u-mt-md">
                    <GridItem span={3}>
                      <FormGroup label="Country code" isRequired>
                        <TextInput
                          aria-label="Country code"
                          isRequired
                          validated={
                            !countryCode || isValidCountryCode(countryCode) ? 'default' : 'error'
                          }
                          type="text"
                          placeholder="+01"
                          minLength={1}
                          maxLength={4}
                          value={countryCode}
                          onChange={(value) => {
                            setCountryCode(value);
                          }}
                        />
                      </FormGroup>
                    </GridItem>
                    <GridItem span={9}>
                      <FormGroup label="Phone number" isRequired>
                        <TextInput
                          aria-label="Phone number"
                          isRequired
                          validated={
                            !phoneNumber || isValidPhoneNumber(phoneNumber) ? 'default' : 'error'
                          }
                          type="tel"
                          placeholder="123-456-7890"
                          minLength={6}
                          maxLength={32}
                          value={phoneNumber}
                          onChange={(value) => {
                            setPhoneNumber(value);
                          }}
                        />
                      </FormGroup>
                    </GridItem>
                  </Grid>
                </Form>
                <FooterButton
                  isDisabled={
                    loading || !isValidCountryCode(countryCode) || !isValidPhoneNumber(phoneNumber)
                  }
                  onClick={async () => {
                    try {
                      setLoading(true);
                      await initiatePhoneVerification(countryCode, phoneNumber);
                      setStep('verifyCode');
                    } catch (e) {
                      setError(errorMessage(e));
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Next
                </FooterButton>
              </>
            );
          case 'verifyCode':
            return (
              <>
                <TextContent>
                  <p>We are preparing your Sandbox. It will be available shortly.</p>
                  <p>
                    We sent a verification code to "<b>{`${countryCode} ${phoneNumber}`}</b>"
                  </p>
                </TextContent>
                <Form>
                  <FormGroup label="Verification code" isRequired className="pf-u-mt-md pf-u-mb-md">
                    <TextInput
                      aria-label="Veritification code"
                      isRequired
                      validated={!verifyCode || verifyCode.length === 5 ? 'default' : 'error'}
                      minLength={5}
                      maxLength={5}
                      placeholder="XXXXX"
                      value={verifyCode || ''}
                      onChange={(value) => {
                        setCodeResent(false);
                        setVerifyCode(value);
                      }}
                    />
                  </FormGroup>
                </Form>
                <TextContent>
                  <p>
                    No text received?{' '}
                    <Button
                      isInline
                      variant={ButtonVariant.link}
                      onClick={() => {
                        setVerifyCode('');
                        initiatePhoneVerification(countryCode, phoneNumber);
                        setCodeResent(true);
                      }}
                    >
                      Resend code
                    </Button>
                    {codeResent ? (
                      <CheckIcon
                        className="pf-u-ml-md"
                        style={{ color: 'var(--pf-global--success-color--100)' }}
                      />
                    ) : null}
                    <br />
                    Or{' '}
                    <Button
                      isInline
                      variant={ButtonVariant.link}
                      onClick={() => {
                        setStep('verify');
                        setVerifyCode('');
                      }}
                    >
                      use a different phone number
                    </Button>
                  </p>
                </TextContent>
                <FooterButton
                  isDisabled={loading || verifyCode.length !== 5}
                  onClick={async () => {
                    try {
                      setLoading(true);
                      await completePhoneVerification(verifyCode);
                      await getSignupDataFn();
                    } catch (e) {
                      setError(
                        errorMessage(e) ||
                          'Error while sending verification code. Please try again.',
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  Next
                </FooterButton>
              </>
            );
          case 'provisioning':
            return (
              <>
                <TextContent>
                  <p>We are preparing your Sandbox. It will be available shortly.</p>
                </TextContent>
                <Bullseye className="pf-u-mt-2xl pf-u-mb-lg">
                  <Spinner isSVG size="xl" />
                </Bullseye>
                <FooterButton isDisabled>Launch Sandbox</FooterButton>
              </>
            );

          case 'pending-approval':
            return (
              <>
                <TextContent>
                  <p>Your Sandbox account is waiting for approval.</p>
                </TextContent>
                <Bullseye className="pf-u-mt-2xl pf-u-mb-lg">
                  <Spinner isSVG size="xl" />
                </Bullseye>
                <FooterButton onClick={() => onClose(signupData)}>Close</FooterButton>
              </>
            );
          case 'ready':
            return (
              <>
                <TextContent>
                  <p>
                    Your Sandbox will be activate for the next 30 days. Jump right in and start
                    building!
                  </p>
                </TextContent>
                <div className="pf-u-p-md">
                  <img src={sandboxReadyImg} />
                </div>
                <FooterButton onClick={() => onClose(signupData)}>Launch Sandbox</FooterButton>
              </>
            );
          default:
            return null;
        }
      })()}
    </Modal>
  );
};

export default RegistrationModal;
