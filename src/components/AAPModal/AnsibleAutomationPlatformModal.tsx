import * as React from 'react';
import { Buffer } from 'buffer';
import {
  Alert,
  AlertActionCloseButton,
  AlertVariant,
  Bullseye,
  Button,
  ClipboardCopy,
  Modal,
  Spinner,
  Text,
  TextContent,
  TextVariants,
  Title,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon, EyeIcon, EyeSlashIcon } from '@patternfly/react-icons';
import { errorMessage } from '../../utils/utils';
import { AAPData } from '../../services/kube-api';
import { SHORT_INTERVAL } from '../../utils/const';
import useKubeApi from '../../hooks/useKubeApi';
import useRegistrationService from '../../hooks/useRegistrationService';
import AnalyticsButton from '../AnalyticsButton/AnalyticsButton';
import { getReadyCondition } from '../../utils/conditions';

type Props = {
  initialStatus?: string;
  onClose: (aapData?: AAPData) => void;
};

const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');

function AnsibleAutomationPlatformProvisioningModalContent(props: { onClose: () => void }) {
  return (
    <>
      <TextContent>
        <Text component={TextVariants.p} data-testid="modal-content">
          Your AAP instance might take up to 30 minutes to provision. Once ready, your instance will
          remain active for 12 hours.
        </Text>
        <br />
        <Text component={TextVariants.p} data-testid="modal-content-docs">
          While you wait, explore the
          <a
            className={'pf-v5-u-ml-sm'}
            target="_blank"
            rel="noreferrer"
            href={'https://docs.redhat.com/en/documentation/red_hat_ansible_automation_platform'}
          >
            AAP documentation
            <ExternalLinkAltIcon></ExternalLinkAltIcon>
          </a>
          .
        </Text>
      </TextContent>
      <Bullseye className="pf-v5-u-mt-2xl pf-v5-u-mb-lg">
        <Spinner size="xl" />
      </Bullseye>
      <Alert
        variant="info"
        isInline
        title="You can close this window, and follow the status from the AAP card on the screen
                                        in the background."
      />
      <br />
      <Button
        variant="link"
        size="sm"
        component="span"
        isInline
        onClick={props.onClose}
        aria-label="Close"
      >
        Close
      </Button>
    </>
  );
}

function AnsibleAutomationPlatformReadyModalContent(props: {
  ansibleUIUser: string | undefined;
  onCopy: () => void;
  passwordHidden: boolean;
  ansibleUIPassword: string;
  onHidePasswordClick: () => void;
  onOpenUIClick: () => void;
}) {
  return (
    <>
      <TextContent className={'pf-v5-u-mb-sm'}>
        <Text component={TextVariants.p}>
          Use the following credentials to log into the Ansible Portal.
        </Text>
      </TextContent>
      <TextContent>
        Username:
        <ClipboardCopy
          isReadOnly
          className={'pf-v5-u-ml-xs'}
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          isCode
        >
          {props.ansibleUIUser}
        </ClipboardCopy>
      </TextContent>
      <TextContent className={'pf-v5-u-mb-sm'}>
        Password:
        <ClipboardCopy
          isReadOnly
          className={'pf-v5-u-ml-sm'}
          hoverTip="Copy"
          clickTip="Copied"
          variant="inline-compact"
          aria-label={'Copy password'}
          isCode
          onCopy={props.onCopy}
        >
          {props.passwordHidden
            ? '*'.repeat(props.ansibleUIPassword.length)
            : props.ansibleUIPassword}
        </ClipboardCopy>
        <Button
          className={'pf-v5-u-ml-0 pf-v5-u-pl-sm'}
          variant="plain"
          onClick={props.onHidePasswordClick}
          aria-label={props.passwordHidden ? 'Show password' : 'Hide password'}
          icon={props.passwordHidden ? <EyeIcon /> : <EyeSlashIcon />}
        ></Button>
      </TextContent>
      <TextContent>
        <AnalyticsButton
          onClick={props.onOpenUIClick}
          className="pf-v5-u-w-100 pf-v5-u-w-initial-on-sm"
          analytics={{
            event: 'DevSandbox Ansible UI Start',
          }}
        >
          Go to Ansible Automation Platform <ExternalLinkAltIcon></ExternalLinkAltIcon>
        </AnalyticsButton>
      </TextContent>
      <br />
      <TextContent>
        <Text component={TextVariants.small}>
          12 hours remaining until the instance will be automatically turned off.
        </Text>
      </TextContent>
    </>
  );
}

/**
 * provisioning status indicates that the AAP instance is still provisioning/booting.
 */
export const ANSIBLE_PROVISIONING_STATUS = 'provisioning';
/**
 * the unknown status might indicate that the AAP instance is still provisioning/booting and, it doesn't have a status condition yet.
 */
export const ANSIBLE_UNKNOWN_STATUS = 'unknown';
/**
 * the ready status indicates that the AAP instance is ready to be used.
 */
export const ANSIBLE_READY_STATUS = 'ready';

const AAPModal = ({ onClose, initialStatus }: Props) => {
  const [error, setError] = React.useState<string | undefined>();
  const { getSignupData } = useRegistrationService();
  const { getAAPData, getSecret } = useKubeApi();
  const [status, setStatus] = React.useState<string>(
    initialStatus ? initialStatus : ANSIBLE_PROVISIONING_STATUS,
  );
  const [ansibleUILink, setAnsibleUILink] = React.useState<string | undefined>();
  const [ansibleUIUser, setAnsibleUIUser] = React.useState<string>();
  const [ansibleUIPassword, setAnsibleUIPassword] = React.useState<string>('');
  const [passwordHidden, setPasswordHidden] = React.useState(true);
  const handleSetAAPCRError = (errorDetails: string) => {
    setError(errorDetails);
  };

  const getAAPDataFn = React.useCallback(async () => {
    try {
      const signupData = await getSignupData();
      if (signupData == undefined) {
        setError('Unable to retrieve signup data.');
        return;
      }
      const data = await getAAPData(signupData.defaultUserNamespace);
      const status = getReadyCondition(data, handleSetAAPCRError);
      setStatus(status);
      if (data != undefined && data.items.length > 0 && data.items[0].status != undefined) {
        // set UI link if available
        if (data.items[0].status.URL) {
          setAnsibleUILink(data.items[0].status.URL);
        }
        // set the user for accessing the UI
        if (data.items[0].status.adminUser) {
          setAnsibleUIUser(data.items[0].status.adminUser);
        }
        // set the password for the UI user
        if (data.items[0].status.adminPasswordSecret) {
          const adminSecret = await getSecret(
            signupData.defaultUserNamespace,
            data.items[0].status.adminPasswordSecret,
          );
          if (adminSecret != undefined && adminSecret.data != undefined) {
            setAnsibleUIPassword(decode(adminSecret.data.password));
          }
        }
      }
    } catch (e) {
      setError(errorMessage(e));
    }
  }, []);

  React.useEffect(() => {
    if (
      status === ANSIBLE_PROVISIONING_STATUS ||
      status === ANSIBLE_UNKNOWN_STATUS ||
      status == ''
    ) {
      const handle = setInterval(getAAPDataFn, SHORT_INTERVAL);
      return () => {
        clearInterval(handle);
      };
    }
  }, [status]);

  return (
    <Modal
      data-testid="aap-modal"
      width={600}
      aria-labelledby="aap-modal-title"
      header={
        // custom title to prevent ellipsis overflow on small screens
        <Title id="aap-modal-title" headingLevel="h1">
          {status === ANSIBLE_READY_STATUS
            ? 'Ansible Automation Platform instance provisioned'
            : 'Provisioning Ansible Automation Platform (AAP) instance'}
        </Title>
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
          className="pf-v5-u-mb-lg"
        >
          {error}
        </Alert>
      ) : null}
      {(() => {
        switch (status) {
          case ANSIBLE_PROVISIONING_STATUS:
          case ANSIBLE_UNKNOWN_STATUS:
            return <AnsibleAutomationPlatformProvisioningModalContent onClose={onClose} />;

          case ANSIBLE_READY_STATUS:
            return (
              <AnsibleAutomationPlatformReadyModalContent
                onCopy={() => {
                  navigator.clipboard.writeText(ansibleUIPassword);
                }}
                passwordHidden={passwordHidden}
                ansibleUIUser={ansibleUIUser}
                ansibleUIPassword={ansibleUIPassword}
                onHidePasswordClick={() => setPasswordHidden(!passwordHidden)}
                onOpenUIClick={() => {
                  window.open(ansibleUILink, '_blank');
                }}
              />
            );
          default:
            return null;
        }
      })()}
    </Modal>
  );
};

export default AAPModal;
