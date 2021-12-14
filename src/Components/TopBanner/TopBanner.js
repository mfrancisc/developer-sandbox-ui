import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core';

const TopBanner = () => {
  return (
    <>
      <Card isPlain style={{ background: 'gray' }}>
        <Flex style={{ marginTop: '16px', marginLeft: '16px' }}>
          <CardTitle>
            Get started with the Developer Sandbox for Red Hat OpenShift
          </CardTitle>
          <CardBody>
            <Flex
              direction={{ default: 'column', lg: 'row' }}
              style={{ width: '60%' }}
              flex={{ default: 'flex_1' }}
            >
              <FlexItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                quis vulputate massa, et gravida magna. Morbi sodales ante est,
                condimentum mattis lacus interdum id. Nam euismod ligula sit
                amet pretium imperdiet. Pellentesque faucibus nisi ex,
                consectetur ullamcorper elit convallis ac.
              </FlexItem>
              <FlexItem style={{ marginTop: '32px' }}>
                <Button isLarge>
                  Learn more about Sandbox for Red Hat OpenShift
                </Button>
              </FlexItem>
            </Flex>
          </CardBody>
        </Flex>
      </Card>
    </>
  );
};

export default TopBanner;
