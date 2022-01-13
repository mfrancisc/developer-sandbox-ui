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
      <Card className="sbx-c-main-descriptionCard">
        <CardBody>
          <Grid hasGutter className="sbx-c-purchaseCard">
            <GridItem span={7}>
              <Flex
                direction={{ defautl: 'column' }}
                flex={{ default: 'flex_1' }}
              >
                <FlexItem className="sbx-c-card__text text--header">
                  Start your OpenShift experience with Red Hat OpenShift
                  Dedicated
                </FlexItem>
                <FlexItem className="sbx-c-card__text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus quis vulputate massa, et gravida magna. Morbi sodales
                  ante est, condimentum mattis lacus interdum id. Nam euismod
                  ligula sit amet pretium imperdiet. Pellentesque faucibus nisi
                  ex, consectetur ullamcorper elit convallis ac.
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
                  <Button
                    className="sbx-c-main-btn btn--outline"
                    variant="tertiary"
                    isLarge
                  >
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
