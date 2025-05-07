import React from 'react';
import { Alert, AlertVariant } from '@patternfly/react-core/dist/dynamic/components/Alert';
import { Bullseye } from '@patternfly/react-core/dist/dynamic/layouts/Bullseye';
import { Flex } from '@patternfly/react-core/dist/dynamic/layouts/Flex';
import { PageSection } from '@patternfly/react-core/dist/dynamic/components/Page';
import { Spinner } from '@patternfly/react-core/dist/dynamic/components/Spinner';
import {
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core/dist/dynamic/components/Text';
import SandboxPageBanner from '../../components/PageBanner/SandboxPageBanner';
import HowItWorksCard from '../../components/HowItWorksCard/HowItWorksCard';
import GetStartedCard from '../../components/GetStartedCard/GetStartedCard';
import ServiceCatalog from '../../components/ServiceCatalog/ServiceCatalog';
import { useRegistrationContext } from '../../hooks/useRegistrationContext';
import useRegistrationService from '../../hooks/useRegistrationService';
import { canaryDeploymentCheck } from '../../utils/canary-deployment';

const SandboxPage = () => {
  const [{ status, error }] = useRegistrationContext();

  /*** CANARY Deployment for redirecting users to new UI
   Users visiting the first time the UI will get assigned with a random number, the number will be stored in localstorage and reused everytime the user opens the UI.
   The users that gets a number that is lower than the canary weight threshold, they will be redirected to the new ui,
   the others will be using the current UI.
   The threshold can be configured in the backend so that a bigger/smaller number of users can be routed to the new UI.
   ***/
  const loadUIConfig = async function () {
    console.log('loading ui config');
    const { getUIConfigData } = useRegistrationService();
    const uiConfigData = await getUIConfigData();
    if (uiConfigData == undefined) {
      console.log('Unable to load uiconfig. Got undefined response.');
    } else {
      console.log('uiCanaryDeploymentWeight found: ', uiConfigData.uiCanaryDeploymentWeight);
      canaryDeploymentCheck(uiConfigData.uiCanaryDeploymentWeight);
    }
  };
  /** END canary UI deployment logic **/

  (async () => {
    try {
      await loadUIConfig();
    } catch (e) {
      console.log('Unable to retrieve uiConfigData. Got error:', e);
    }
  })();

  const showOverview = status !== 'ready';
  return (
    <>
      <SandboxPageBanner />
      <PageSection className="pf-v5-u-p-xl">
        {status === 'unknown' ? (
          <Bullseye>
            <Spinner />
          </Bullseye>
        ) : (
          <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsXl' }}>
            {error ? (
              <Alert
                title="An error occurred"
                variant={AlertVariant.danger}
                className="pf-v5-u-mb-lg"
                style={{ boxShadow: 'var(--pf-v5-global--BoxShadow--sm)' }}
              >
                {error}
              </Alert>
            ) : null}
            {showOverview ? (
              <>
                <GetStartedCard />
                <HowItWorksCard />
              </>
            ) : (
              <>
                <TextContent>
                  <Text component={TextVariants.h1}>Available services</Text>
                  <Text component={TextVariants.p}>
                    Now that your Sandbox is activated, these are all the cool things that are
                    available to you, right in your Sandbox!
                  </Text>
                </TextContent>
                <ServiceCatalog />
              </>
            )}
          </Flex>
        )}
      </PageSection>
    </>
  );
};

export default SandboxPage;
