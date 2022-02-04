import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  Flex,
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
            <GridItem
              md={6}
              lg={7}
              component={TextContent}
              className="pf-u-pr-2xl-on-md"
            >
              <Text component={TextVariants.h2} className="pf-u-mb-md">
                Start your OpenShift experience with Red Hat OpenShift Dedicated
              </Text>
              <Text component={TextVariants.p} className="pf-u-color-200">
                Managed Red Hat OpenShift clusters on AWS or Google Cloud backed
                by 24x7 Premium support and a 99.95% uptime SLA.
              </Text>
            </GridItem>
            <GridItem md={6} lg={5}>
              <Flex className="pf-u-flex-direction-column pf-u-flex-direction-row-on-md pf-u-mt-lg pf-u-mt-0-on-md">
                <Button
                  className="pf-m-danger pf-u-flex-grow-1 pf-u-mb-md"
                  isLarge
                >
                  Purchase
                </Button>
                <Button
                  variant="tertiary"
                  className="pf-u-flex-grow-1 pf-u-mb-md"
                  isLarge
                >
                  Free Trial
                </Button>
              </Flex>
            </GridItem>
            <GridItem className="pf-u-mt-lg">
              <img
                className="sbx-osd-logo"
                src="https://console.redhat.com/apps/frontend-assets/background-images/developer-sandbox-ui/Logo-Red_Hat-OpenShift_Dedicated-A-Standard-RGB.png"
              />
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
