import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose  } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import sagas from './redux/sagas.js';
import Characters from './Characters.js';
import Character from './Character.js';
import Series from './Series.js';
import SingleSeries from './SingleSeries.js';
import Comics from './Comics.js';
import Comic from './Comic.js';
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
            <header className="App-header">
              <h1 className="App-title">Marvel Universe</h1>
            </header>
            <section className="Content">
              <Switch>
                <Route exact path="/characters" component={Characters}/>
                <Route exact path="/characters/:id" component={Character}/>
                <Route exact path="/series" component={Series}/>
                <Route path="/series/:id" component={SingleSeries}/>
                <Route exact path="/comics" component={Comics}/>
                <Route path="/comics/:id" component={Comic}/>
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
