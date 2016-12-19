import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
    Dimensions,
    WebView,
    TouchableOpacity,
    ScrollView,
    Image,
    DrawerLayoutAndroid
} from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { Ionicons, SimpleLineIcons } from '@exponent/vector-icons';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Drawer from './src/Drawer'

import { reducer } from './src/postsRedux'

import Feed from './src/Feed'
import Feed2 from './src/Feed2'
import Inspiration from './src/Inspiration'

import PageOne from './src/PageOne';
import PageTwo from './src/PageTwo';

import FacebookTabBar from './src/FacebookTabBar';

// Add the thunk middleware to our store
const logger = createLogger();
const store = createStore(reducer, applyMiddleware(thunk,  promise, logger))


const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 3},
}

class App extends React.Component {


    render() {

        return (
            <Provider store={store}>
                <Router>
                <Scene key="drawer" component={Drawer} open={false} >

                        <Scene key="root" style={{marginTop: 30}}>
                            <Scene
                                hideNavBar={false}
                                key="scrollabletabview"
                                component={Scroll}
                                navBar = {MainTopNavbar}
                                navigationBarStyle={{backgroundColor: '#213421'}}
                            />
                            <Scene hideNavBar={false} key="pageOne"  component={PageOne} title="PageOne"  />
                        </Scene>
                </Scene>
                </Router>
            </Provider>
        )
    }
}

class MainTopNavbar extends React.Component  {
    _openDrawer = () => {
        Actions.refresh({key: 'drawer', open: value => !value })
    }

    render() {
        return (
            <View style={{position: 'absolute', top: 0,left: 0, right: 0, height: 10, flex: 1,  flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                <TouchableOpacity onPress={this._openDrawer}  style={{position: 'absolute', left: 15, top: 0}}>
                    <SimpleLineIcons name="menu" size={18} color="black"/>
                </TouchableOpacity>
                <Image style={{width: 100, height: 30}} source={require('./src/img/logo.png')} />
                <SimpleLineIcons name="login" size={18} color="black" style={{position: 'absolute', right: 15, top: 0}}/>
            </View>
        )
    }
}

class Scroll extends React.Component  {
    render() {
        return (

            <ScrollableTabView  style={{marginTop: 40, }}
                                initialPage={1}
                                renderTabBar={() => <FacebookTabBar />}
                                tabBarPosition = "bottom">

                <Feed  tabLabel="feed" />
                <Feed2 tabLabel="user"/>
                <Inspiration tabLabel="picture" />

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
