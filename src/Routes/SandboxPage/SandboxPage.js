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
      <TopBanner className="sbx-c-topBanner" />
      <Main className="sbx-c-main">
        <DescriptionCard className="ins-sa-card" />
        <PurchaseCard className="ins-sa-card" />
      </Main>
    </>
  );
};

export default SandboxPage;
