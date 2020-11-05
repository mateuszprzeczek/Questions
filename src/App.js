import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import React, { useEffect, Suspense } from 'react'

import Layout from './components/Layout/Layout'
import Home from './containers/Home/Home'
import Logout from './containers/Login/Logout/Logout'

import * as actions from './store/actions/index'

const Login = React.lazy(() => {
  return import("./containers/Login/Login.js");
});

const Questions = React.lazy(() => {
  return import('./containers/Questions/Questions.js')
})

const NewQuestion = React.lazy(() => {
  return import('./containers/NewQuestion/NewQuestion.js')
})
const FullQuestion = React.lazy(() => {
  return import('./containers/FullQuestion/FullQuestion.js')
})

const App = (props) => {
  const { onTryAutoSignin } = props;

  useEffect(() => {
    onTryAutoSignin();
  }, [onTryAutoSignin])

  let routes = (
    <Switch>
      <Route path='/login' render={(props) => <Login {...props} />} />
      <Route path='/questions/:id' render={(props) => <FullQuestion {...props} />} />
      <Route path='/questions'  render={(props) => <Questions {...props} />} />
      <Route path='/' component={Home} />
      <Redirect to='/' />
    </Switch>
  )

  if (props.isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/questions/:id' render={(props) => <FullQuestion {...props} />} />
        <Route path='/questions'  render={(props) => <Questions {...props} />} />
        <Route path='/question' render={(props) => <NewQuestion {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/' component={Home} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <div className="App">
      <Layout>
          <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onTryAutoSignin: () => dispatch(actions.loginCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

