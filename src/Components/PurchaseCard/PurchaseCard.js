import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';

const PurchaseCard = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Grid>
            <GridItem md={6} lg={7} className="pf-u-pr-2xl-on-md">
              <TextContent>
                <Text component={TextVariants.h2} className="pf-u-mb-md">
                  Start your OpenShift experience with Red Hat OpenShift
                  Dedicated
                </Text>
                <Text className="pf-u-color-200">
                  Managed Red Hat OpenShift clusters on AWS or Google Cloud
                  backed by 24x7 Premium support and a 99.95% uptime SLA.
                </Text>
              </TextContent>
            </GridItem>
            <GridItem md={6} lg={5}>
              <Flex className="pf-u-flex-direction-column pf-u-flex-direction-row-on-md pf-u-mt-lg pf-u-mt-0-on-md">
                <Button
                  isLarge
                  className="pf-m-danger pf-u-flex-grow-1 pf-u-mb-md"
                >
                  Purchase
                </Button>
                <Button
                  isLarge
                  variant="tertiary"
                  className="pf-u-flex-grow-1 pf-u-mb-md"
                >
                  Free Trial
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
    </>
  );
};

PurchaseCard.propTypes = {
  title: PropTypes.string,
};

export default PurchaseCard;
