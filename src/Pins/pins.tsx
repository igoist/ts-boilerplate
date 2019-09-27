import * as React from 'react';

import { Store } from '@Contexts';
import { log } from '@Utils';

const { useState, useEffect } = React;

interface PinProps {
  id: number;
  top: number;
  left: number;
  height: number;
  bgColor: string;
  setLayer?: (id: number) => void;
}

const Pin = (props: PinProps) => {
  const { id, top, left, height, bgColor, setLayer } = props;

  return (
    <div
      className='wfc'
      style={{
        top: top + 'px',
        left: left + 'px',
        height: height + 'px',
        lineHeight: height + 'px',
        backgroundColor: bgColor
      }}
    >
      {id + 'x'}
    </div>
  );
};

const o = {
  cellWidth: 236,
  cellSpace: 16,
  containerSelectorOffset: 50,
  hibernate: 5000
  // maxCol: 0,
  // minCol: 0,
  // height: 0,
};

interface WFCell {
  id: number;
  col: number;
  top: number;
  left: number;
  height: number;
  bgColor: string;
}

type handlePosConfig = {
  cell: WFCell,
  hs: Array<number>
};

const handlePos = (config: handlePosConfig) => {
  const { cell, hs } = config;

  let cols = 4 - 0;
  let col = 0;

  if (0) {
  } else {
    for (let i = 0; i < cols; i++) {
      if (hs[i] < hs[col]) {
        col = i;
      }
    }
  }

  let left = col * (o.cellWidth + o.cellSpace);
  let top = hs[col];

  // o.hs
  hs[col] += cell.height + o.cellSpace;

  let max = 0;
  let min = 0;

  for (let i = 0; i < cols; i++) {
    if (hs[i] < hs[min]) min = i;
    if (hs[i] > hs[max]) max = i;
  }

  // o.maxCol = max;
  // o.minCol = min;

  let tmpWrapHeight = hs[max] + o.containerSelectorOffset;
  // o.height = tmpWrapHeight;

  return {
    cell: {
      ...cell,
      col,
      top,
      left
    },
    wrapHeight: tmpWrapHeight,
    hs: hs
  };
};

const usePageStatus = () => {
  const store = Store.useContainer();

  const [pageState, setPageState] = useState({
    wrapHeight: 0,
    cols: 4,
    hs: [0, 0, 0, 0],
    pins: [],
    globalPins: []
  });

  const { storeState, pushStore, toPrevStore, toNextStore } = store;

  useEffect(() => {
    if (store.storeState.storeList.length > 0) {
      setPageState(storeState.storeList[storeState.current]);
      return;
    }
    log.dev({
      title: 'usePageStatus',
      text: 'Init'
    });
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', '/map/map-pins.json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        let tmpGlobalPins = JSON.parse(xhr.response);

        let tmpPins = [];

        tmpPins = tmpGlobalPins.slice(0, 20);

        let tmpWrapHeight = 0;
        let tmpHs = [0, 0, 0, 0];
        tmpPins = tmpPins.map((pin: WFCell) => {
          const { cell, wrapHeight, hs } = handlePos({
            cell: pin,
            hs: tmpHs
          });
          tmpWrapHeight = wrapHeight;
          tmpHs = hs;
          return cell;
        });

        pushStore(
          {
            wrapHeight: tmpWrapHeight,
            cols: 4,
            hs: tmpHs,
            pins: tmpPins,
            globalPins: tmpGlobalPins
          },
          setPageState
        );
      }
    };
    xhr.send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRandomPin = () => {
    let randomPin: WFCell = pageState.globalPins[pageState.pins.length];

    // [...pageState.hs] is really important
    // parse a new copy, or you parse the old array's ref, and the old array would be changed
    const { cell, wrapHeight, hs } = handlePos({
      cell: randomPin,
      hs: [...pageState.hs]
    });

    pushStore(
      {
        ...pageState,
        wrapHeight: wrapHeight,
        hs,
        pins: [...pageState.pins, cell]
      },
      setPageState
    );
  };

  const toPrevPage = () => {
    toPrevStore(setPageState);
  };

  const toNextPage = () => {
    toNextStore(setPageState);
  };

  return {
    pageState,
    addRandomPin,
    toPrevPage,
    toNextPage
  };
};

const App = () => {
  const { pageState, addRandomPin, toPrevPage, toNextPage } = usePageStatus();

  return (
    <React.Fragment>
      <div
        className={`waterfall-wrap cols-${pageState.cols}`}
        style={{
          height: pageState.wrapHeight
        }}
      >
        {pageState.pins.map((pin, index) => {
          return <Pin id={pin.id} top={pin.top} left={pin.left} height={pin.height} bgColor={pin.bgColor} key={index.toString()} />;
        })}
      </div>

      <button id='addPin' onClick={addRandomPin}>
        AddRandomPin
      </button>
      <button id='toPrevPage' onClick={toPrevPage}>
        toPrevPage
      </button>
      <button id='toNextPage' onClick={toNextPage}>
        toNextPage
      </button>
    </React.Fragment>
  );
};

export default App;
