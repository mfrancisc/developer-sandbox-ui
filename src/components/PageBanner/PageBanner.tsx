import * as React from 'react';
import {
  Divider,
  Flex,
  FlexItem,
  PageSection,
  PageSectionVariants,
  TextContent,
} from '@patternfly/react-core';

type Props = {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
};

const PageBanner = ({ children, icon, title }: Props) => (
  <PageSection variant={PageSectionVariants.light} className="pf-u-p-xl">
    <Flex
      direction={{ default: 'column', sm: 'row' }}
      spaceItems={{ default: 'spaceItemsMd', sm: 'spaceItemsXl' }}
      alignItems={{ sm: 'alignItemsFlexStart' }}
      flexWrap={{ default: 'nowrap' }}
    >
      <FlexItem style={{ flexShrink: 0 }}>{icon}</FlexItem>
      <Divider orientation={{ default: 'horizontal', sm: 'vertical' }} />
      <FlexItem>
        <TextContent>
          <h1>{title}</h1>
          <p>{children}</p>
        </TextContent>
      </FlexItem>
    </Flex>
  </PageSection>
);

export default PageBanner;
