import React, { Component } from 'react';
import { View, Text, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PageOne extends Component {
    componentDidMount() {
       console.log("comp did mount")
    }

    render() {
        return (
        <WebView
            onLoad={console.log("onload")}
            onLoadStart={console.log("onloadstart")}
            onLoadEnd={console.log("onloadend")}
            source={{uri: this.props.postUrl}}
            style={{marginTop: 20}}
        />
        )
    }
}