/**
 * Created by nemethzsolt on 11/30/16.
 */
import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet , Image, Platform} from 'react-native'
import { connect } from 'react-redux'
import Exponent from 'exponent';
import { Font } from 'exponent';
import { Actions } from 'react-native-router-flux';
import FadeIn from '@exponent/react-native-fade-in-image';
import Colors from './constants/Colors'

import { actionCreators } from './postsRedux'

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error,
    posts: state.posts,
});

Font.loadAsync({
    'domine': require('../assets/fonts/SofiaProLight-webfont.ttf')
});

class Feed2 extends Component {

    componentDidMount() {

    }

    componentWillMount() {
        const {dispatch} = this.props;

        dispatch(actionCreators.fetchPosts())
    }

    refresh = async () => {
        const {dispatch} = this.props;

        // We can await the completion of dispatch, so long as we returned a promise.
        await dispatch(actionCreators.clearPosts());

        dispatch(actionCreators.fetchPosts())
    };

    _openPostInWebView = (link) => {
        console.log('---LINK----')
        console.log(link)
        Actions.pageOne({postUrl: link});
    }

    renderPost = ({_id, title, summary,  description, feed, diff, image, link}) => {
        return (
            <View key={_id} style={[styles.layout]}>
                <FadeIn placeholderStyle={{backgroundColor: '#fff',
                    width: null,
                    height: 200}}>
                    <Image style={styles.image} source={{uri: image}}/>
                </FadeIn>
                <TouchableOpacity style={styles.title} onPress={this._openPostInWebView.bind(this, link)}>
                    <View>
                        <Text style={styles.titletext}
                              numberOfLines={3}
                              ellipsizeMode='tail'>{title}</Text>
                    </View>
                    <View style={styles.meta}>
                        <Text style={styles.feedname}>{feed}</Text>
                        <Text style={styles.diff}>{diff} ago</Text>
                    </View>
                </TouchableOpacity>
            </View>
/*
                    <View  key={_id} style={styles.header}>
                        <FadeIn placeholderStyle={{backgroundColor: Platform.OS === 'android' ? 'transparent' : '#fff'}} style={styles.fadeInPlaceholder}>
                            <Image style={styles.image} source={{ uri: image ? image : "https://facebook.github.io/react-native/img/header_logo.png"}} />
                        </FadeIn>
                        <View style={styles.title}>
                            <TouchableOpacity style={styles.container} onPress={this._openPostInWebView.bind(this, link)}>
                                <View>
                                <Text
                                    style={styles.titletext}
                                    numberOfLines = {3}
                                    ellipsizeMode = 'tail'
                                >{title}</Text>
                                </View>
                                <View tyle={styles.meta}>
                                    <Text style={styles.feedname}>{feed}</Text>
                                    <Text style={styles.diff}>{diff.substring(0,3)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>*/
        )
    }


    render() {
        const {posts, loading, error} = this.props

        if (loading) {
            return (
                <View style={styles.center}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        }

        if (error) {
            return (
                <View style={styles.center}>
                    <Text>
                        Failed to load posts!
                    </Text>
                </View>
            )
        }

        return (
            <View style={[styles.container, styles.viewcont]}>
                <ScrollView style={styles.container}>
                    {posts.map(this.renderPost)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewcont: {
        marginLeft: 15,
        marginRight: 15
    },
    layout: {
        marginBottom: 50
    },
    title: {
        backgroundColor: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5
    },
    titletext: {
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
        fontFamily: 'domine',fontSize: 18, lineHeight: 22
    },
    fadeInPlaceholder: {
        flex: 1,
        width: null,
        height: 200
    },
    image: {
        flex: 1,
        width: null,
        height: 200,
    },
    meta: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    feedname: {
        fontSize: 12,
        marginRight: 5,
        color: "#dc8a8a",
    },
    diff: {
        fontSize: 12,
        color: '#A8ACB5'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default connect(mapStateToProps)(Feed2)
