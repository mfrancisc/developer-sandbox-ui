import { AAPData, StatusCondition } from '../services/kube-api';

/**
 * provisioning status indicates that the AAP instance is still provisioning/booting.
 */
export const ANSIBLE_PROVISIONING_STATUS = 'provisioning';
/**
 * the unknown status might indicate that the AAP instance is still provisioning/booting and, it doesn't have a status condition yet.
 */
export const ANSIBLE_UNKNOWN_STATUS = 'unknown';
/**
 * the ready status indicates that the AAP instance is ready to be used.
 */
export const ANSIBLE_READY_STATUS = 'ready';
/**
 * the ready status indicates that the AAP instance is ready to be used.
 */
export const ANSIBLE_IDLED = 'idled';

export const getReadyCondition = (
  data: AAPData | undefined,
  setError: (errorDetails: string) => void,
): string => {
  /**
   * Those are the types of conditions you can find in the AAP CR
   *
   * Type       Status  Updated                Reason     Message
   * Successful True    * 23 Dec 2024, 23:56   * - -
   * Failure    False    * 27 Dec 2024, 18:21  * Failed   unknown playbook failure
   * Running    False     * 27 Dec 2024, 18:37 * Running  Running reconciliation
   */
  if (data == undefined || data.items.length == 0) {
    return '';
  }

  if (data.items[0].status == undefined || data.items[0].status.conditions.length == 0) {
    return ANSIBLE_UNKNOWN_STATUS;
  }

  // check if instance is idled
  if (data.items[0].spec != undefined && data.items[0].spec.idle_aap) {
    return ANSIBLE_IDLED;
  }

  // we can assume that there will be only one aap instance
  const conditions = data.items[0].status.conditions;

  // if the Successful condition is set to true it means the instance is ready
  const [isSuccessful, conditionSuccessful] = isConditionTrue('Successful', conditions);
  if (isSuccessful && conditionSuccessful?.reason == 'Successful') {
    return ANSIBLE_READY_STATUS;
  }

  // If the Failure condition is set to True, then we need to return the error
  const [hasFailed, condition] = isConditionTrue('Failure', conditions);
  if (hasFailed) {
    if (condition) {
      setError(condition.message);
    }
    return ANSIBLE_UNKNOWN_STATUS;
  }

  // If the Running condition is set to true it means that the instance it's still provisioning
  const [isStillRunning] = isConditionTrue('Running', conditions);
  if (isStillRunning) {
    return ANSIBLE_PROVISIONING_STATUS;
  }

  // unable to find the ready condition
  return ANSIBLE_UNKNOWN_STATUS;
};

// isConditionTrue checks if a given condition type exists and it's status is set to True
const isConditionTrue = (
  condType: string,
  conditions: StatusCondition[],
): [boolean, StatusCondition | null] => {
  for (const condition of conditions) {
    if (condition.type == condType && condition.status == 'True') {
      return [true, condition];
    }
  }
  return [false, null];
};
