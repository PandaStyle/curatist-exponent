import React, { Component } from 'react'
import { Platform,
    Switch,
    Text,
    View, Image} from 'react-native';


export default class extends Component {
    state = {
        siwtch1: true,
        siwtch2: false,
    }

    render(){
        return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex: 1, margin: 30}}>
                        <Image style={{width: 100, height: 30}} source={require('./img/logo.png')} />
                    </View>
                    <View st>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{flex: 1}}> Switch 1</Text>
                            <Switch
                                onValueChange={(value) => this.setState({siwtch1: value})}
                                onTintColor="#00ff00"
                                style={{marginBottom: 10, height: 20, flex: 1}}
                                thumbTintColor="#0000ff"
                                tintColor="#ff0000"
                                value={this.state.siwtch1} />
                        </View>
                        <View style={{flex: 1}}>
                            <Text> Switch 2</Text>
                            <Switch
                                onValueChange={(value) => this.setState({siwtch2: value})}
                                value={this.state.siwtch2}
                                onTintColor="#00ff00"
                                thumbTintColor="#0000ff"
                                tintColor="#ff0000"/>
                        </View>
                    </View>


                </View>
        )
    }
}
