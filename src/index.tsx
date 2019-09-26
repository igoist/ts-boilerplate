import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { log } from '@Utils';
import Pins from './Pins';

import { Provider } from '@Contexts';
import { Counter } from '@Components';
// import CustomHooks from './CustomHooks';

import '../public/css/main.css';

const Test = (props: any) => {
  log.dev({
    title: 'App Test: ',
    text: props
  });
  const handleClick = () => {
    props.history.push('/pins');
  };
  return <div onClick={handleClick}>toPins</div>;
};

const WTest = withRouter(Test);

const TestDiv = (props: any) => {
  const handleClick = () => {
    props.history.push('/');
  };
  return <div onClick={handleClick}>toHomePage</div>;
};

const WTestDiv = withRouter(TestDiv);

ReactDOM.render(
  <AppContainer>
    <Provider>
      <Router>
        <React.Fragment>
          <WTest />
          <WTestDiv />
          <Switch>
            <Route key={'homepage'} exact path={'/'} component={Counter} />
            <Route key={'pins'} path={'/pins'} component={Pins} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  log.dev({
    title: 'module.hot',
    text: 'should be accepted'
  });
  module.hot.accept();
}
