/**
 * Created by nemethzsolt on 11/30/16.
 */
import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet , Image} from 'react-native'
import { connect } from 'react-redux'
import Exponent from 'exponent';
import { Font } from 'exponent';


import { actionCreators } from './postsRedux'

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error,
    posts: state.posts,
});

class Feed extends Component {

    componentDidMount() {
        Font.loadAsync({
            'playfair-black': require('../assets/fonts/PlayfairDisplay-Black.ttf')
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

    renderPost = ({_id, title, summary,  description, image}) => {
        return (
            <View
                key={_id}
                style={styles.post}
            >

                <View style={styles.postContent}>
                    <Text style={{ fontFamily: 'playfair-black', fontSize: 16 }}>
                        {title}
                    </Text>
                    <Text style={styles.postBody}>
                        {summary ? summary : description}
                    </Text>
                </View>
                <View style={styles.postNumber}>
                    <Image style={styles.cardImage} source={{ uri: image ? image : "https://facebook.github.io/react-native/img/header_logo.png"}} />
                </View>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.refresh}
                >
                    <Text>
                        Refresh
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    post: {
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
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
    postBody: {
        marginTop: 10,
        fontSize: 12,
        color: 'lightgray',
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
    },
    cardImage: {
        height: 100,
        width: 100,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3
    },
});

export default connect(mapStateToProps)(Feed)
