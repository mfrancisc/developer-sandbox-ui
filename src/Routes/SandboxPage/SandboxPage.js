import React from 'react';
import DescriptionCard from '../../Components/PresentationalCard/DescriptionCard';
import PurchaseCard from '../../Components/PurchaseCard/PurchaseCard';
import TopBanner from '../../Components/TopBanner/TopBanner';
import Main from '@redhat-cloud-services/frontend-components/Main';
import './SandboxPage.scss';

const SandboxPage = () => {
  return (
    <>
      <TopBanner />
      <Main className="pf-u-pt-xl pf-u-px-2xl pf-u-pb-2xl">
        <DescriptionCard />
        <PurchaseCard />
      </Main>
    </>
  );
};

export default SandboxPage;
