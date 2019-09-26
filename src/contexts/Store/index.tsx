import * as React from 'react';
import { createContainer } from 'unstated-next';
import { log } from '@Utils';

const useStore = () => {
  // default current is equal to storeList.length - 1
  // and use it as storeState.storeList[storeState.current]
  const [storeState, setStore] = React.useState({
    storeList: [],
    current: -1
  });

  const pushStore = (newStore: any, setMethod: (state: any) => void) => {
    if (storeState.current === storeState.storeList.length - 1) {
      setStore({
        storeList: [...storeState.storeList, newStore],
        current: storeState.current + 1
      });
    } else {
      let tmp = storeState.storeList.slice(0, storeState.current + 1);

      setStore({
        storeList: [...tmp, newStore],
        current: storeState.current + 1
      });
    }

    setMethod(newStore);
  };

  const toPrevStore = (setMethod: (state: any) => void) => {
    if (storeState.current > 0) {
      setStore({
        storeList: storeState.storeList,
        current: storeState.current - 1
      });

      setMethod(storeState.storeList[storeState.current - 1]);
    } else {
      log.dev({
        title: 'toPrevStore',
        text: 'is at the beginning'
      });
    }
  };

  const toNextStore = (setMethod: (state: any) => void) => {
    if (storeState.current + 1 < storeState.storeList.length) {
      setStore({
        storeList: storeState.storeList,
        current: storeState.current + 1
      });

      setMethod(storeState.storeList[storeState.current + 1]);
    } else {
      log.dev({
        title: 'toNextStore',
        text: 'is the latest'
      });
    }
  };

  return {
    storeState,
    pushStore,
    toPrevStore,
    toNextStore
  };
};

export default createContainer(useStore);
