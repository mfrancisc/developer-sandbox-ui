import {getDeployments, getAAP, getSecret} from '../services/kube-api';
import useAxios, { InstanceAPI } from './useAxios';

const useKubeApi = () => {
  const axiosInstance = useAxios(InstanceAPI.KUBE_API);

  return {
    getDeployments: (namespace: string) => getDeployments(axiosInstance, namespace),

    getAAPData: (namespace: string) => getAAP(axiosInstance, namespace),

    getSecret: (namespace: string, secretName: string) => getSecret(axiosInstance, namespace, secretName),
  };
};

export default useKubeApi;
