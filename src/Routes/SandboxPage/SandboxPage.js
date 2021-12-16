import React from 'react';
// import { Stack, StackItem } from '@patternfly/react-core';
import DescriptionCard from '../../Components/PresentationalCard/DescriptionCard';
import PurchaseCard from '../../Components/PurchaseCard/PurchaseCard';
import TopBanner from '../../Components/TopBanner/TopBanner';
import './SandboxPage.scss';

const SandboxPage = () => {
  return (
    <div className="sbx-c-main">
      <TopBanner className="sbx-c-topBanner" />
      <DescriptionCard className="ins-sa-card" />
      <PurchaseCard className="ins-sa-card" />
    </div>
  );
};

export default SandboxPage;
