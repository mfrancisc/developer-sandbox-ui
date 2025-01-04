import * as React from 'react';
import {Buffer} from "buffer";
import {Alert, AlertActionCloseButton, AlertVariant} from '@patternfly/react-core/dist/dynamic/components/Alert';
import {Bullseye} from '@patternfly/react-core/dist/dynamic/layouts/Bullseye';
import {Modal} from '@patternfly/react-core/dist/dynamic/components/Modal';
import {Spinner} from '@patternfly/react-core/dist/dynamic/components/Spinner';
import {Text, TextContent, TextVariants} from '@patternfly/react-core/dist/dynamic/components/Text';
import {Title} from '@patternfly/react-core/dist/dynamic/components/Title';
import {errorMessage} from '../../utils/utils';
import {AAPData, StatusCondition} from "../../services/kube-api";
import {SHORT_INTERVAL} from '../../utils/const';
import useKubeApi from "../../hooks/useKubeApi";
import {ClipboardCopy} from '@patternfly/react-core';
import useRegistrationService from "../../hooks/useRegistrationService";

type Props = {
    initialStatus?: Status;
    onClose: (aapData?: AAPData) => void;
};

export type Status = 'unknown' | 'provisioning' | 'ready';

const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');

const AAPModal = ({onClose, initialStatus}: Props) => {
    const [error, setError] = React.useState<string | undefined>();
    const {getSignupData} = useRegistrationService();
    const {getAAPData, getSecret} = useKubeApi();
    const [status, setStatus] = React.useState<string>(initialStatus ? initialStatus : 'provisioning');
    const [ansibleUILink, setAnsibleUILink] = React.useState<string | undefined>();
    const [ansibleUIUser, setAnsibleUIUser] = React.useState<string>();
    const [ansibleUIPassword, setAnsibleUIPassword] = React.useState<string>();

    const handleSetAAPCRError = (errorDetails: string) => {
        setError(errorDetails)
    }

    const getAAPDataFn = React.useCallback(async () => {
        try {
            let signupData = await getSignupData()
            if (signupData == undefined) {
                setError('Unable to retrieve signup data.');
                return
            }
            const data = await getAAPData(signupData.defaultUserNamespace);
            let status = getReadyCondition(data, handleSetAAPCRError)
            setStatus(status);
            if (data != undefined && data.items.length > 0 && data.items[0].status != undefined) {
                // set UI link if available
                if (data.items[0].status.URL) {
                    setAnsibleUILink(data.items[0].status.URL)
                }
                // set the user for accessing the UI
                if (data.items[0].status.adminUser) {
                    setAnsibleUIUser(data.items[0].status.adminUser)
                }
                // set the password for the UI user
                if (data.items[0].status.adminPasswordSecret) {
                    let adminSecret = await getSecret(signupData.defaultUserNamespace, data.items[0].status.adminPasswordSecret)
                    if (adminSecret != undefined && adminSecret.data != undefined) {
                        setAnsibleUIPassword(adminSecret.data.password)
                    }
                }
                setStatus("ready")
            }

        } catch (e) {
            setError(errorMessage(e));
        }
    }, []);


    React.useEffect(() => {
        if (status === 'provisioning' || status === 'unknown') {
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
                    {status === 'ready'
                        ? "Congratulations, you're ready to get started!"
                        : 'We are provisioning your AAP instance...'}
                </Title>
            }
            isOpen
            onClose={() => onClose()}
        >
            {error ? (
                <Alert
                    title="An error occurred"
                    variant={AlertVariant.danger}
                    actionClose={<AlertActionCloseButton onClose={() => setError(undefined)}/>}
                    isInline
                    className="pf-v5-u-mb-lg"
                >
                    {error}
                </Alert>
            ) : null}
            {(() => {
                switch (status) {
                    case 'provisioning':
                    case 'unknown':
                        return (
                            <>
                                <TextContent>
                                    <Text component={TextVariants.p}>
                                        We are preparing your AAP instance. It might take up to ~30 minutes to be
                                        ready...
                                    </Text>
                                </TextContent>
                                <Bullseye className="pf-v5-u-mt-2xl pf-v5-u-mb-lg">
                                    <Spinner size="xl"/>
                                </Bullseye>
                            </>
                        );

                    case 'ready':
                        return (
                            <>
                                <TextContent>
                                    <Text component={TextVariants.p}>
                                        Your AAP instance is now ready. Jump right in
                                        and start creating your applications!
                                    </Text>
                                    <Text component={TextVariants.h3}>
                                        Ansible UI access details
                                    </Text>
                                </TextContent>
                                <TextContent>
                                    <Text component={TextVariants.p}>
                                        Link: &nbsp;
                                        <a target="_blank" href={ansibleUILink} rel="noreferrer">Open UI</a>
                                    </Text>
                                </TextContent>
                                <TextContent>
                                    <Text component={TextVariants.p}>
                                        Username: &nbsp;
                                        <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied"
                                                       variant="inline-compact"
                                                       isCode>
                                            {ansibleUIUser}
                                        </ClipboardCopy>
                                    </Text>
                                </TextContent>
                                <TextContent>
                                    <Text component={TextVariants.p}>
                                        Password: &nbsp;
                                        <ClipboardCopy isReadOnly hoverTip="Copy" clickTip="Copied"
                                                       variant="inline-compact"
                                                       isCode
                                        >

                                            {decode(ansibleUIPassword || "")}
                                        </ClipboardCopy>
                                    </Text>
                                    &nbsp;
                                </TextContent>
                            </>
                        );
                    default:
                        return null;
                }
            })()}
        </Modal>
    );
};

let getReadyCondition = (data: AAPData | undefined, setError: (errorDetails: string) => void): string => {
    /**
     * Those are the types of conditions you can find in the AAP CR
     *
     * Type       Status  Updated                Reason     Message
     * Successful True    * 23 Dec 2024, 23:56   * - -
     * Failure    False    * 27 Dec 2024, 18:21  * Failed   unknown playbook failure
     * Running    False     * 27 Dec 2024, 18:37 * Running  Running reconciliation
     */
    if (data == undefined || data.items.length == 0 || data.items[0].status == undefined || data.items[0].status.conditions.length == 0) {
        return "unknown"
    }

    // we can assume that there will be only one aap instance
    let conditions = data.items[0].status.conditions

    // if the Successful condition is set to true it means the instance is ready
    let [isSuccessful, conditionSuccessful] = isConditionTrue("Successful", conditions)
    if (isSuccessful && conditionSuccessful?.reason == "Successful") {
        return "ready"
    }

    // If the Failure condition is set to True, then we need to return the error
    let [hasFailed, condition] = isConditionTrue("Failure", conditions)
    if (hasFailed) {
        if (condition) {
            setError(condition.message)
        }
        return "unknown"
    }

    // If the Running condition is set to true it means that the instance it's still provisioning
    let [isStillRunning, conditionRunning] = isConditionTrue("Running", conditions)
    if (isStillRunning) {
        return "provisioning"
    }

    // unable to find the ready condition
    return "unknown"
}


// isConditionTrue checks if a given condition type exists and it's status is set to True
let isConditionTrue = (condType: string, conditions: StatusCondition[]): [boolean, StatusCondition | null] => {
    for (var condition of conditions) {
        if (condition.type == condType &&
            condition.status == "True") {
            return [true, condition]
        }
    }
    return [false, null]
}

export default AAPModal;
