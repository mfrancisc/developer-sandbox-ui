import { AxiosInstance } from 'axios';
import {SignupData} from "../types";

function projectDeploymentUrl(namespace: string) {
  return `/apis/apps/v1/namespaces/${namespace}/deployments `;
}

export type DeploymentItem = {
  status: {
    conditions: {
      type: string;
      status: string;
    }[];
  };
  spec: {
    replicas: number;
    template: {
      metadata: {
        labels: {
          app: string;
          deployment: string;
        };
      };
    };
  };
  metadata: {
    name: string;
    uuid: string;
    creationTimestamp: string;
    labels: {
      app: string;
    };
  };
};

export type DeploymentData = {
  items: DeploymentItem[];
};

export const getDeployments = async (axiosInstance: AxiosInstance, namespace: string) => {
  const url = projectDeploymentUrl(namespace);
  const { data } = await axiosInstance.get<DeploymentData>(url);
  return data;
};


function projectAAPUrl(namespace: string) {
  return `/apis/aap.ansible.com/v1alpha1/namespaces/${namespace}/ansibleautomationplatforms`;
}

export type StatusCondition = {
  type: string;
  status: string;
  reason: string;
  message: string;
}
export type AAPItem = {
  status: {
    conditions: StatusCondition[];
    URL: string;
    adminPasswordSecret: string;
    adminUser: string;
  };
  spec: {};
  metadata: {
    name: string;
    uuid: string;
    creationTimestamp: string;
  };
};

export type AAPData = {
  items: AAPItem[];
};


export const getAAP = async (axiosInstance: AxiosInstance, namespace: string) : Promise<AAPData | undefined> => {
  const url = projectAAPUrl(namespace);
  const { data } = await axiosInstance.get<AAPData>(url);
  return data;
};


function projectSecretURL(namespace: string, secretName: string) {
  return `/api/v1/namespaces/${namespace}/secrets/${secretName}`;
}

export type SecretItem = {
  data: {
    password: string
  };
  metadata: {
    name: string;
    uuid: string;
    creationTimestamp: string;
  };
};

export const getSecret = async (axiosInstance: AxiosInstance, namespace: string, secretName: string) : Promise<SecretItem | undefined> => {
  const url = projectSecretURL(namespace, secretName);
  const { data } = await axiosInstance.get<SecretItem>(url);
  return data;
};
