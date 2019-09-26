import * as React from 'react';
import providers from './providers';

// 数据 Provider 组合器
const ProvidersComposer = (props: any) => {
  return props.providers.reduceRight((children: any, Parent: any) => <Parent>{children}</Parent>, props.children);
};

const Provider = (props: any) => {
  return <ProvidersComposer providers={providers}>{props.children}</ProvidersComposer>;
};

export default Provider;
