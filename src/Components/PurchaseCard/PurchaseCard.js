import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core';

const PurchaseCard = () => {
  return (
    <>
      <Card className="sbx-c-card--main">
        <CardBody>
          <Grid hasGutter className="sbx-c-purchaseCard">
            <GridItem span={7}>
              <Flex direction={{ defautl: 'column' }}>
                <FlexItem className="sbx-c-card__header pf-u-mb-sm">
                  Start your OpenShift experience with Red Hat OpenShift
                  Dedicated
                </FlexItem>
                <FlexItem className="sbx-c-card__text pf-u-mb-lg">
                  Managed Red Hat OpenShift clusters on AWS or Google Cloud
                  backed by 24x7 Premium support and a 99.95% uptime SLA.
                </FlexItem>
                <FlexItem>
                  <img
                    src="https://raw.githubusercontent.com/RedHatInsights/frontend-assets/9a08a79fddd4a15dc075b33ea849f212c15ec23c/src/console-logos/Logo-Red_Hat-Hybrid_Cloud_Console-B-Standard-RGB.svg"
                    height="256px"
                    width="128px"
                  />
                </FlexItem>
              </Flex>
            </GridItem>
            <GridItem span={5}>
              <Flex direction={{ default: 'row' }} flex={{ default: 'flex_1' }}>
                <FlexItem>
                  <Button isLarge className="sbx-c-main-btn btn--purchase">
                    Purchase
                  </Button>
                </FlexItem>
                <FlexItem>
                  <Button className="sbx-c-main-btn" variant="tertiary" isLarge>
                    Free Trial
                  </Button>
                </FlexItem>
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
