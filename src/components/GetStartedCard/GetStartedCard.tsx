import * as React from 'react';
import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  Grid,
  GridItem,
  List,
  ListItem,
  TextContent,
} from '@patternfly/react-core';
import CheckIcon from '@patternfly/react-icons/dist/esm/icons/check-icon';
import heroImg from '../../images/sandbox-hero-graphic.svg';
import { useRegistrationContext } from '../../hooks/useRegistrationContext';

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
              <TextContent>
                <h1>Start exploring in the Developer Sandbox for free</h1>
              </TextContent>
              <List isPlain className="pf-u-p-md pf-u-pt-lg pf-u-pb-lg">
                <ListItem icon={<PrimaryCheckIcon />}>
                  Access the browser-based Red Hat OpenShift Dev Spaces
                </ListItem>
                <ListItem icon={<PrimaryCheckIcon />}>Deploy applications</ListItem>
                <ListItem icon={<PrimaryCheckIcon />}>
                  Guided tutorials to experience and run sample applications
                </ListItem>
                <ListItem icon={<PrimaryCheckIcon />}>
                  GitHub integration to your source code
                </ListItem>
              </List>
              <Button
                isDisabled={state.status === 'pending-approval'}
                onClick={() => setShowUserSignup(true)}
              >
                {state.status === 'pending-approval' ? 'Pending approval' : 'Get started'}
              </Button>{' '}
              <Button
                variant={ButtonVariant.link}
                component="a"
                href="https://developers.redhat.com/developer-sandbox"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more about the Developer Sandbox
              </Button>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default GetStartedCard;
