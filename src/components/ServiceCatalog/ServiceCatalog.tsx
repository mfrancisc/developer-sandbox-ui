import * as React from 'react';
import {Gallery, GalleryItem} from '@patternfly/react-core/dist/dynamic/layouts/Gallery';
import {HelperText, HelperTextItem} from '@patternfly/react-core/dist/dynamic/components/HelperText';
import {useFlag} from '@unleash/proxy-client-react';
import {OPENSHIFT_AI_ID, useSandboxServices} from '../../hooks/useSandboxServices';
import ServiceCard from './ServiceCard';
import AAPModal from "../AAPModal/AnsibleAutomationPlatformModal";

type Props = {
    isDisabled?: boolean;
};

const ServiceCatalog = ({isDisabled}: Props) => {
    const [showAAPModal, setShowAAPModal] = React.useState(false);
    const handleShowAAPModal = () => {
        setShowAAPModal(true)
    }
    const handleCloseAAPModal = () => {
        setShowAAPModal(false)
    }
    const services = useSandboxServices(handleShowAAPModal);
    const disableAI = useFlag('platform.sandbox.openshift-ai-disabled');


    return (
        <>
            {showAAPModal ? (
                    <AAPModal
                        initialStatus="unknown"
                        onClose={handleCloseAAPModal}
                    />
                ) : null }
                <Gallery hasGutter minWidths={{default: '330px'}}>
                    {services.map((service) => {
                        const shouldDisableAI = service.id === OPENSHIFT_AI_ID && disableAI;
                        return (
                            <GalleryItem key={service.id}>
                                <ServiceCard
                                    {...service}
                                    launchUrl={isDisabled ? undefined : service.launchUrl}
                                    onClickFunc={service.onClickFunc}
                                    showDisabledButton={shouldDisableAI}
                                    {...(shouldDisableAI
                                        ? {
                                            helperText: (
                                                <HelperText>
                                                    <HelperTextItem variant="indeterminate" className="pf-v5-u-mb-lg">
                                                        OpenShift AI is temporarily unavailable, but&nbsp;will return
                                                        soon.
                                                    </HelperTextItem>
                                                </HelperText>
                                            ),
                                        }
                                        : {})}
                                />
                            </GalleryItem>
                        );
                    })}
                </Gallery>
        </>
    );
};
export default ServiceCatalog;
