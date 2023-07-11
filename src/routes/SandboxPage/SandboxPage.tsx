import React from 'react';
import {
  Alert,
  AlertVariant,
  Bullseye,
  Flex,
  PageSection,
  Spinner,
  TextContent,
} from '@patternfly/react-core';
import SandboxPageBanner from '../../components/PageBanner/SandboxPageBanner';
import HowItWorksCard from '../../components/HowItWorksCard/HowItWorksCard';
import GetStartedCard from '../../components/GetStartedCard/GetStartedCard';
import ServiceCatalog from '../../components/ServiceCatalog/ServiceCatalog';
import { useRegistrationContext } from '../../hooks/useRegistrationContext';

const SandboxPage = () => {
  const [{ status, error }] = useRegistrationContext();
  const provisioning = status === 'provisioning';
  const showOverview = status !== 'ready' && !provisioning;
  return (
    <>
      <SandboxPageBanner />
      <PageSection className="pf-u-p-xl">
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
                className="pf-u-mb-lg"
                style={{ boxShadow: 'var(--pf-global--BoxShadow--sm)' }}
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
                  <h1>
                    {provisioning ? 'Available service after provisioning' : 'Available services'}
                  </h1>
                  <p>
                    {provisioning
                      ? 'Your Sandbox account is waiting for provisioning. Once complete, these are all the cool things that are available to you.'
                      : 'Now that your Sandbox is activated, these are all the cool things that are available to you, right in your Sandbox!'}
                  </p>
                </TextContent>
                <ServiceCatalog isDisabled={provisioning} />
              </>
            )}
          </Flex>
        )}
      </PageSection>
    </>
  );
};

export default SandboxPage;
