import React, { Component } from 'react'
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

export default class extends Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="overlay"
                content={<SideMenu />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-10}
                negotiatePan={true}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
const drawerStyles = {
    drawer: { shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10},
    main: {paddingLeft: 10},
}
