import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
    Dimensions,
    WebView,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { Router, Scene } from 'react-native-router-flux';
import { Ionicons } from '@exponent/vector-icons';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { reducer } from './src/postsRedux'

import Feed from './src/Feed'
import Inspiration from './src/Inspiration'

import PageOne from './src/PageOne';
import PageTwo from './src/PageTwo';

import FacebookTabBar from './src/FacebookTabBar';

// Add the thunk middleware to our store
const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk,  promise, logger))

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const DEFAULT_URL = 'https://facebook.github.io/react-native/'

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root">
                        <Scene hideNavBar={true} key="scrollabletabview" component={Scroll}>

                        </Scene>
                        <Scene hideNavBar={false} key="pageOne"  component={PageOne} title="PageOne"  />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}

class Scroll extends React.Component  {
    render() {
        return (
            <ScrollableTabView  style={{marginTop: 20, }}
                                initialPage={1}
                                renderTabBar={() => <FacebookTabBar />}>

                <Feed  tabLabel="ios-list-box" />

                <Inspiration tabLabel="ios-image" />
            </ScrollableTabView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: '#222',
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    tabBarStyle: {
        borderTopWidth : .5,
        borderColor    : '#b7b7b7',
        backgroundColor: 'white',
        opacity        : 1
    },

    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        borderWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'rgba(0,0,0,0.1)',
        margin: 5,
        height: 150,
        padding: 15,
        shadowColor: '#ccc',
        shadowOffset: { width: 2, height: 2, },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },

});

Exponent.registerRootComponent(App);
