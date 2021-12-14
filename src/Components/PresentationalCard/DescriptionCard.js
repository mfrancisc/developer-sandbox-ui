import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
} from '@patternfly/react-core';

const DescriptionCard = () => {
  return (
    <>
      <Card style={{ margin: '32px' }} className="sbx-c-main__banner">
        <CardTitle>What is the Sandbox?</CardTitle>
        <CardBody>
          <Flex direction={{ default: 'row' }}>
            <Flex direction={{ default: 'column' }}>
              <FlexItem style={{ width: '60%', verticalAlign: 'top' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                quis vulputate massa, et gravida magna. Morbi sodales ante est,
                condimentum mattis lacus interdum id. Nam euismod ligula sit
                amet pretium imperdiet. Pellentesque faucibus nisi ex,
                consectetur ullamcorper elit convallis ac.
              </FlexItem>
            </Flex>
            <Flex justifyContent={{ default: 'justifyContentFlexStart' }}>
              <FlexItem>
                <img
                  src="https://raw.githubusercontent.com/RedHatInsights/frontend-assets/9a08a79fddd4a15dc075b33ea849f212c15ec23c/src/background-images/fedora-background.svg"
                  width="390"
                />
              </FlexItem>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default DescriptionCard;
