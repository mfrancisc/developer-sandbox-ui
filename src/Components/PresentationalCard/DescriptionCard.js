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
      <Card className="sbx-c-main-descriptionCard">
        <CardBody className="sbx-c-card">
          <Grid hasGutter className="sbx-c-main-descriptionCard">
            <GridItem sm={7} xs={5}>
              <Flex direction={{ default: 'column' }}>
                <FlexItem className="sbx-c-card__text text--header">
                  What is the Sandbox?
                </FlexItem>
                <FlexItem className="sbx-c-card__text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus quis vulputate massa, et gravida magna. Morbi sodales
                  ante est, condimentum mattis lacus interdum id. Nam euismod
                  ligula sit amet pretium imperdiet. Pellentesque faucibus nisi
                  ex, consectetur ullamcorper elit convallis ac.
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
