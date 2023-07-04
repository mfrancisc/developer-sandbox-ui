import { Button } from '@patternfly/react-core';
import * as React from 'react';

const FooterButton = (
  props: Pick<
    React.ComponentProps<typeof Button>,
    'children' | 'onClick' | 'isDisabled' | 'isLoading'
  >,
) => (
  <div className="pf-u-pt-xl pf-u-pt-md pf-u-text-align-center">
    <Button {...props} />
  </div>
);

export default FooterButton;
