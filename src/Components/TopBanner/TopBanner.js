import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Button,
} from '@patternfly/react-core';
import '../../Routes/SandboxPage/SandboxPage.scss';

const TopBanner = () => {
  return (
    <>
      <Card isPlain className="sbx-c-banner">
        <Flex>
          <CardTitle className="sbx-c-banner__header">
            Get started with the Developer Sandbox for Red Hat OpenShift
          </CardTitle>
          <CardBody>
            <Flex
              direction={{ default: 'column', lg: 'row' }}
              style={{ width: '60%' }}
              flex={{ default: 'flex_1' }}
            >
              <FlexItem className="sbx-c-banner__text">
                If you're exploring how to run your code in containers, our
                Developer Sandbox makes it simple. Not only can you easily
                deploy your application from a Git repo, youcan also set up a
                cloude IDE for your entire team.
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
