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

import { actionCreators } from './postsRedux'

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error,
    posts: state.posts,
});

class Feed extends Component {

    componentDidMount() {
        Font.loadAsync({
            'playfair-black': require('../assets/fonts/Domine-Bold.ttf')
        });
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

    renderPost = ({_id, title, summary,  description, image, link}) => {
        return (
            <View
                key={_id}
                style={styles.post}
            >
                <TouchableOpacity onPress={this._openPostInWebView.bind(this, link)}>
                    <View style={styles.header}>
                        <View style={styles.title}>
                            <Text style={{fontFamily: 'playfair-black',fontSize: 16, lineHeight: 22}}>{title}</Text>
                        </View>
                        <FadeIn placeholderStyle={{backgroundColor: Platform.OS === 'android' ? 'transparent' : '#fff'}} style={styles.fadeInPlaceholder}>
                            <Image style={styles.box} source={{ uri: image ? image : "https://facebook.github.io/react-native/img/header_logo.png"}} />
                        </FadeIn>
                    </View>
                    <View style={styles.body}>
                        <Text numberOfLines={3}>
                            {summary ? summary : description}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
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
            <View style={styles.container}>
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
        margin: 5
    },
    post: {
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingVertical: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 5
    },
    box: {
        flexBasis: 80,
        height: 80,
        //backgroundColor: 'steelblue',

        flexGrow: 0,
    },
    fadeInPlaceholder: {
        flexBasis: 80,
        height: 80,
    },
    title: {
        flex: 1,
    },
    body:{
        flex: 0,
        margin: 5,
        overflow: 'hidden',
        paddingVertical: 5,
    },

    postNumber: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postContent: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingVertical: 25,
        paddingRight: 15,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    }
});

export default connect(mapStateToProps)(Feed)
