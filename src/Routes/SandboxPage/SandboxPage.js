import React from 'react';
// import { Stack, StackItem } from '@patternfly/react-core';
import DescriptionCard from '../../Components/PresentationalCard/DescriptionCard';
import PurchaseCard from '../../Components/PurchaseCard/PurchaseCard';
import TopBanner from '../../Components/TopBanner/TopBanner';
import Main from '@redhat-cloud-services/frontend-components/Main';
import './SandboxPage.scss';

const SandboxPage = () => {
  return (
    <>
      <TopBanner />
      <Main className="sbx-c-page__main-section pf-u-pt-xl pf-u-px-2xl pf-u-pb-2xl">
        <DescriptionCard />
        <PurchaseCard />
      </Main>
    </>
  );
};

export default SandboxPage;
