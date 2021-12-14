import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardBody,
  CardActions,
  CardHeader,
  // CardHeaderMain,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core';

const PurchaseCard = () => {
  return (
    <>
      <Card style={{ margin: '32px' }}>
        <CardHeader>
          <CardActions>
            <Flex
              justifyContent={{ default: 'justifyContentFlexEnd' }}
              flex={{ default: 'flex_1' }}
              direction={{ defautl: 'row' }}
              style={{ marginTop: '8px' }}
            >
              <FlexItem>
                <Button isLarge>Purchase</Button>
              </FlexItem>
              <FlexItem>
                <Button variant="tertiary" isLarge>
                  Free Trial
                </Button>
              </FlexItem>
            </Flex>
          </CardActions>
          <CardTitle style={{ marginBottom: '16px' }}>
            {' '}
            Start your OpenShift experience with Red Hat OpenShift Dedicated{' '}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Flex>
            <Flex
              direction={{ default: 'column' }}
              flex={{ default: 'flex_1' }}
            >
              <FlexItem style={{ width: '60%' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                quis vulputate massa, et gravida magna. Morbi sodales ante est,
                condimentum mattis lacus interdum id. Nam euismod ligula sit
                amet pretium imperdiet. Pellentesque faucibus nisi ex,
                consectetur ullamcorper elit convallis ac.
              </FlexItem>
              <FlexItem>
                <img
                  src="https://raw.githubusercontent.com/RedHatInsights/frontend-assets/9a08a79fddd4a15dc075b33ea849f212c15ec23c/src/console-logos/Logo-Red_Hat-Hybrid_Cloud_Console-B-Standard-RGB.svg"
                  height="256px"
                  width="128px"
                />
              </FlexItem>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

PurchaseCard.propTypes = {
  title: PropTypes.string,
};

export default PurchaseCard;
