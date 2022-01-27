import React from 'react';
import {
  Button,
  Card,
  CardBody,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import '../../Routes/SandboxPage/SandboxPage.scss';

const TopBanner = () => {
  return (
    <>
      <Card
        className="sbx-c-card-banner pf-u-px-lg pf-u-pt-0 pf-u-pb-md"
        isPlain
      >
        <CardBody className="pf-u-w-66-on-md">
          <TextContent>
            <Text component={TextVariants.h1} className="pf-u-color-light-100">
              Get started with the Developer Sandbox for Red Hat OpenShift
            </Text>
            <Text className="pf-u-color-light-200">
              If you&#39;re exploring how to run your code in containers, our
              Developer Sandbox makes it simple. Not only can you easily deploy
              your application from a Git repo, youcan also set up a cloude IDE
              for your entire team.
            </Text>
          </TextContent>
          <Button className="pf-u-mt-2xl" isLarge>
            Learn more about Sandbox for Red Hat OpenShift
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default TopBanner;
