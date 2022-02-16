import React from 'react';
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  TextContent,
  Text,
  TextVariants,
  Flex,
  Button,
} from '@patternfly/react-core';

const DescriptionCard = () => {
  return (
    <>
      <Card className="pf-u-mb-xl">
        <CardBody>
          <Grid>
            <GridItem
              md={6}
              lg={8}
              component={TextContent}
              className="pf-u-pr-3xl-on-md"
            >
              <Text component={TextVariants.h2} className="pf-u-mb-md">
                What is Developer Sandbox for Red Hat OpenShift?
              </Text>
              <Text
                component={TextVariants.p}
                className="pf-u-color-200 pf-u-mb-lg"
              >
                The sandbox provides you with a private OpenShift environment in
                a shared, multi-tenant OpenShift cluster that is pre-configured
                with a set of developer tools. You can easily create containers
                from your source code or Dockerfile, build new applications
                using the samples and stacks provided, add services such as
                databases from our templates catalog, deploy Helm charts, and
                much more. Discover the rich capabilities of the full developer
                experience on OpenShift with the sandbox.
              </Text>
              <Flex className="pf-u-flex-direction-column pf-u-flex-direction-row-on-md pf-u-mt-xl pf-u-mt-0-on-md">
                <Button
                  variant="secondary"
                  component="a"
                  className="pf-u-flex-grow-1 pf-u-mb-md pf-u-mb-0-on-lg"
                  href="https://developers.redhat.com/developer-sandbox"
                  isLarge
                >
                  Learn more
                </Button>
                <Button
                  variant="tertiary"
                  className="sbx-c-card__button pf-u-flex-grow-1"
                  isLarge
                >
                  Try it/Launch Sandbox
                  {/* This button is pending chage. We are still waiting for the correct link that is supposed to go here. */}
                </Button>
              </Flex>
            </GridItem>
            <GridItem md={6} lg={4} className="pf-u-h-50">
              <img
                className="sbx-sandbox-graphic pf-u-pt-md pf-u-pt-0-on-md"
                src="https://console.redhat.com/apps/frontend-assets/background-images/developer-sandbox-ui/sandbox-diagram.png"
              />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default DescriptionCard;
