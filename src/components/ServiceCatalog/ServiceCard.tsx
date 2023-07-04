import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  TextContent,
} from '@patternfly/react-core';
import * as React from 'react';

type Props = {
  title: string;
  subtitle: string;
  description: string;
  iconUrl: string;
  learnMoreUrl: string;
  launchUrl?: string;
};

const ServiceCard = ({ title, subtitle, description, iconUrl, learnMoreUrl, launchUrl }: Props) => (
  <Card className="pf-u-h-100">
    <CardHeader>
      <img src={iconUrl} style={{ width: 48 }} className="pf-u-mr-md" />
      <TextContent>
        <h2>{title}</h2>
        {subtitle}
      </TextContent>
    </CardHeader>
    <CardBody>{description}</CardBody>
    <CardFooter>
      {launchUrl ? (
        <Button component="a" href={launchUrl} className="pf-u-mr-md">
          Launch
        </Button>
      ) : null}
      <Button
        variant={ButtonVariant.link}
        component="a"
        href={learnMoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        isInline
      >
        Learn more
      </Button>
    </CardFooter>
  </Card>
);

export default ServiceCard;
