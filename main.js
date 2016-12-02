import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
    Dimensions,
    WebView,
    TouchableOpacity
} from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { Ionicons } from '@exponent/vector-icons';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// Import the reducer and create a store
import { reducer } from './src/postsRedux'


import Feed from './src/Feed'


// Add the thunk middleware to our store
const store = createStore(reducer, applyMiddleware(thunk))

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};



class App extends React.Component {

    static title = 'Icon only top bar';
    static appbarElevation = 0;

    static propTypes = {
        style: View.propTypes.style,
    };

    state = {
        index: 0,
        routes: [
            { key: '1', icon: 'md-restaurant' },
            { key: '2', icon: 'md-bicycle' },
            { key: '3', icon: 'md-color-palette' },
        ],
    };

    _handleChangeTab = (index) => {
        this.setState({
            index,
        });
    };

    _handleNavigate = index => {
        this.setState({
            index,
        });
    };


    _renderIcon = ({ route }) => {
        return (
            <Ionicons
                name={route.icon}
                size={24}
                color='white'
            />
        );
    };

    _renderHeader = (props) => {
        return (
            <TabBarTop
                {...props}
                indicatorStyle={styles.indicator}
                renderIcon={this._renderIcon}
                style={styles.tabbar}
            />
        );
    };

    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <Provider store={store}><Feed/></Provider>;
            case '2':
                return  <WebView
                    source={{uri: 'https://github.com/facebook/react-native'}}
                    style={{marginTop: 20}}
                />;
            case '3':
                return <View style={[ styles.page, { backgroundColor: '#4caf50' } ]}>
                    <TouchableOpacity
                        onPress={() => this._handleNavigate(0)}
                    ><Text>Go to 0</Text></TouchableOpacity>
                    </View>
            default:
                return null;
        }
    };

    render() {
        return (
            <TabViewAnimated
                style={[ styles.container, this.props.style ]}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderHeader={this._renderHeader}
                onRequestChangeTab={this._handleChangeTab}
                initialLayout={initialLayout}
            />
        );
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
});

Exponent.registerRootComponent(App);
