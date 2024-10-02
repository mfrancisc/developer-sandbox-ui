import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import * as React from 'react';

const FooterButton = (
  props: Pick<
    React.ComponentProps<typeof Button>,
    'children' | 'onClick' | 'isDisabled' | 'isLoading'
  >,
) => (
  <div className="pf-v5-u-pt-xl pf-v5-u-pt-md pf-v5-u-text-align-center">
    <Button {...props} className="pf-v5-u-w-100 pf-v5-u-w-initial-on-sm" />
  </div>
);

export default FooterButton;
