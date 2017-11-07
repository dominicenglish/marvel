import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { createStore, applyMiddleware, compose  } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';

import '../App.css';
import rootReducer from '../redux/reducers';
import sagas from '../redux/sagas.js';
import Character from './Character.js';
import SingleSeries from './SingleSeries.js';
import Search from './Search.js';
import Comic from './Comic.js';
import Creator from './Creator.js';
import Footer from './Footer.js';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(sagas);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <header className="Header">
              <h1 className="Header_title">Marvel Universe</h1>
              <Link to="/">
                <div className="MenuSearch">
                  <i class="fa fa-search fa-lg" aria-hidden="true"></i>
                </div>
              </Link>
            </header>
            <section className="Content">
              <Switch>
                <Route exact path="/characters/:id" component={Character}/>
                <Route path="/series/:id" component={SingleSeries}/>
                <Route path="/comics/:id" component={Comic}/>
                <Route path="/creators/:id" component={Creator}/>
                <Route exact path="/" component={Search}/>
              </Switch>
            </section>
            <Footer/>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
