import React from 'react';
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Flex,
  FlexItem,
} from '@patternfly/react-core';

const DescriptionCard = () => {
  return (
    <>
      <Card className="sbx-c-card--main">
        <CardBody>
          <Grid hasGutter>
            <GridItem sm={7} xs={5}>
              <Flex direction={{ default: 'column' }}>
                <FlexItem className="sbx-c-card__header">
                  What is the Sandbox?
                </FlexItem>
                <FlexItem className="sbx-c-card__text">
                  The sandbox provides you with a private OpenShift environment
                  in a shared, multi-tenant OpenShift cluster that is
                  pre-configured with a set of developer tools. You can easily
                  crete containers from your source code or Dockerfile, build
                  new applications using the samples and stacks provided, add
                  services such as databases from our templates catalog, deploy
                  Helm charts, and much more. Discover the rich capabilities of
                  the full developer experience on OpneShift with the sandbox.
                </FlexItem>
              </Flex>
            </GridItem>
            <GridItem sm={5} xs={7}>
              <img
                src="https://raw.githubusercontent.com/RedHatInsights/frontend-assets/9a08a79fddd4a15dc075b33ea849f212c15ec23c/src/background-images/fedora-background.svg"
                className="sbx-c-main-descriptionImg"
              />
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

export default DescriptionCard;
