import React, { PropTypes, Component } from 'react';
import {
    ListView,
    Platform,
    RefreshControl,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image
} from 'react-native';

import { connect } from 'react-redux';
import ProgressBar from './utils/ProgressBar';
import FadeIn from '@exponent/react-native-fade-in-image';


import { actionCreators } from './postsRedux'

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged})

const mapStateToProps = (state) => ({
    loading: state.loading,
    error: state.error,
    photos: state.photos,
    isRefreshing: state.isRefreshing,
    photosCurrentPage: state.photosCurrentPage,
    dataSource: ds.cloneWithRows(state.photos)
});

class Inspiration extends Component {


    componentWillMount() {
        const {dispatch} = this.props;

        dispatch(actionCreators.retrievePhotos(0))
    }

    _retrievePhotoList(isRefreshed) {

        const {dispatch} = this.props;

        dispatch(actionCreators.retrievePhotos(this.state.photosCurrentPage))

        if(isRefreshed && this.setState({ isRefreshing: false }));
    }

    _retrieveNextPage() {
        const {dispatch, photosCurrentPage} = this.props;

        dispatch(actionCreators.retrievePhotos(photosCurrentPage))
    }

    _onRefresh() {
        this.setState({ isRefreshing: true });
        this._retrievePhotoList('isRefreshed');
    }

    renderRow = (rowData) => {
        //console.log("from renderrow: ", rowData)
        return (
            <Text>
                {rowData.date}
            </Text>
        )
    }


    render() {
        const {photos, loading, error, dataSource} = this.props

        //console.log("photos from render", photos)

        return (
            loading ? <View style={styles.progressBar}><ProgressBar /></View> :
                <View style={{flex: 1, marginTop: 20}}>
                    <ListView
                        style={styles.container}
                        contentContainerStyle={{
                            paddingTop: Platform.OS === 'android' ? 15 : 0
                        }}
                        enableEmptySections
                        onEndReached={type => this._retrieveNextPage()}
                        onEndReachedThreshold={1200}
                        dataSource={dataSource}
                        renderRow={rowData => <Image source={{ uri: rowData.display_src }} style={styles.castImage}/>}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
                        renderFooter={() => <View style={{ height: 50 }}><ProgressBar /></View>}
                    />

                   {/* <ListView
                        style={styles.container}
                        contentContainerStyle={{
                            paddingTop: Platform.OS === 'android' ? 15 : 0
                        }}
                        enableEmptySections
                        onEndReached={type => console.log('End reached')}
                        onEndReachedThreshold={1200}
                        dataSource={this.state.dataSource}
                        renderRow={rowData => <Text>{rowData}</Text>}
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
                        renderFooter={() => <View style={{ height: 50 }}><ProgressBar /></View>}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                                colors={['#EA0000']}
                                tintColor="white"
                                title="loading..."
                                titleColor="white"
                                progressBackgroundColor="white"
                            />
                        }
                    />

                    <StatusBar
                        showHideTransition="fade"
                        hidden={false}
                        barStyle="light-content"
                        animated
                    />*/}
                </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    progressBar: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperator: {
        marginTop: 30,
        backgroundColor: '#8E8E8E'
    },
    castImage: {
        marginLeft: 30,
        marginRight: 30,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
});


export default connect(mapStateToProps)(Inspiration)
