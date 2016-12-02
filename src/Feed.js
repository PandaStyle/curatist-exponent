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

    renderPost = ({_id, title, summary,  description, image}) => {
        return (
            <View
                key={_id}
                style={styles.post}
            >

                <View style={styles.header}>
                    <View style={styles.title}>
                        <Text style={{fontFamily: 'playfair-black',fontSize: 16, lineHeight: 22}}>{title}</Text>
                    </View>
                    <View style={styles.box} />
                </View>
                <View style={styles.body}>
                    <Text>
                        {summary ? summary : description}
                    </Text>
                </View>
                   {/* <View style={styles.postHeader}>
                        <View style={styles.postNumber}>
                            <Text style={{ fontFamily: 'playfair-black', fontSize: 16 }}>
                                {title}
                            </Text>
                        </View>
                        <View style={styles.postNumber}>
                            <Image style={styles.cardImage} source={{ uri: image ? image : "https://facebook.github.io/react-native/img/header_logo.png"}} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.postBody}>
                            {summary ? summary : description}
                        </Text>
                    </View>*/}

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
        margin: 5
    },
    post: {

    },
    header: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 5
    },
    box: {
        flexBasis: 100,
        height: 100,
        backgroundColor: 'steelblue',

        flexGrow: 0,
    },

    title: {
        flex: 1,
    },
    body:{
        flex: 0,
        margin: 5,
        height: 40,
        overflow: 'hidden'
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
    postHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postBody: {
        marginTop: 10,
        fontSize: 12,
        color: 'lightgray',
        height: 50
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
