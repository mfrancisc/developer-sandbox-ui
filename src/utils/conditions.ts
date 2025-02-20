import { AAPData, StatusCondition } from '../services/kube-api';

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
    return 'unknown';
  }

  // check if instance is idled
  if (data.items[0].spec != undefined && data.items[0].spec.idle_aap) {
    return 'idled';
  }

  // we can assume that there will be only one aap instance
  const conditions = data.items[0].status.conditions;

  // if the Successful condition is set to true it means the instance is ready
  const [isSuccessful, conditionSuccessful] = isConditionTrue('Successful', conditions);
  if (isSuccessful && conditionSuccessful?.reason == 'Successful') {
    return 'ready';
  }

  // If the Failure condition is set to True, then we need to return the error
  const [hasFailed, condition] = isConditionTrue('Failure', conditions);
  if (hasFailed) {
    if (condition) {
      setError(condition.message);
    }
    return 'unknown';
  }

  // If the Running condition is set to true it means that the instance it's still provisioning
  const [isStillRunning] = isConditionTrue('Running', conditions);
  if (isStillRunning) {
    return 'provisioning';
  }

  // unable to find the ready condition
  return 'unknown';
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
