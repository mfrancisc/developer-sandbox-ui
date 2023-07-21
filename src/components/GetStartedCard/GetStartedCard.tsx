import * as React from 'react';
import {
  ButtonVariant,
  Card,
  CardBody,
  Grid,
  GridItem,
  List,
  ListItem,
  Title,
} from '@patternfly/react-core';
import CheckIcon from '@patternfly/react-icons/dist/esm/icons/check-icon';
import heroImg from '../../images/sandbox-hero-graphic.svg';
import { useRegistrationContext } from '../../hooks/useRegistrationContext';
import AnalyticsButton from '../AnalyticsButton/AnalyticsButton';

const PrimaryCheckIcon = () => (
  <CheckIcon
    style={{
      color: 'var(--pf-global--primary-color--100)',
    }}
  />
);

const GetStartedCard = () => {
  const [state, { setShowUserSignup }] = useRegistrationContext();
  return (
    <>
      <Card>
        <CardBody>
          <Grid hasGutter>
            <GridItem
              md={4}
              order={{ md: '1' }}
              style={{ alignSelf: 'center' }}
              className="pf-u-text-align-center"
            >
              <img
                src={heroImg}
                style={{ maxHeight: 200 }}
                className="pf-u-display-block pf-u-m-auto pf-u-mb-lg pf-u-mb-auto-on-md"
              />
            </GridItem>
            <GridItem md={8}>
              <Title headingLevel="h1">Start exploring Developer Sandbox for free</Title>
              <List isPlain className="pf-u-p-md pf-u-pt-lg pf-u-pb-lg">
                <ListItem icon={<PrimaryCheckIcon />}>
                  Instant access to a free pre-configured for learning and experimenting with
                  OpenShift, Kubernetes, and containers.
                </ListItem>
                <ListItem icon={<PrimaryCheckIcon />}>
                  Built in, pre-configured, developer tooling combined with a set of sample
                  applications enables immediate productivity with minimal effort.
                </ListItem>
                <ListItem icon={<PrimaryCheckIcon />}>
                  Includes Kubernetes-hosted Jupyter Notebooks for Python-based AI/ML modeling.
                </ListItem>
                <ListItem icon={<PrimaryCheckIcon />}>
                  Learn how to use OpenShift with guided tutorials and sample applications.
                </ListItem>
                <ListItem icon={<PrimaryCheckIcon />}>
                  Includes an instance of Red Hat OpenShift Dev Spaces, a cloud hosted IDE, to
                  enable a consistent, rapid application development experience, all within the
                  browser.
                </ListItem>
              </List>
              <AnalyticsButton
                isDisabled={state.status === 'pending-approval'}
                onClick={() => setShowUserSignup(true)}
                className="pf-u-w-100 pf-u-w-initial-on-sm"
                analytics={{
                  event: 'DevSandbox Signup Start',
                }}
              >
                {state.status === 'pending-approval' ? 'Pending approval' : 'Get started'}
              </AnalyticsButton>
              <AnalyticsButton
                variant={ButtonVariant.link}
                component="a"
                href="https://developers.redhat.com/developer-sandbox"
                target="_blank"
                rel="noopener"
                className="pf-u-w-100 pf-u-w-initial-on-sm"
                style={{
                  display: 'inline-block',
                  whiteSpace: 'initial',
                }}
                analytics={{
                  event: 'DevSandbox Learn More',
                }}
              >
                Learn more about the Developer Sandbox
              </AnalyticsButton>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default GetStartedCard;
