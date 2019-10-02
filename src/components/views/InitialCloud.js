import React from 'react'
import { View, Animated, Easing } from 'react-native'
import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import config from '../../config'

//This entirely new component had to be created because when I tired to pass a property to Cloud.js designating that the cloud to be rendered was initial vs not initial it erased all initial clouds as soon as initial went from true to false in the state of Home.js. Even after a setTimeout of 20000, Cloud.js's rendered with this.props.initialCloud === true disappeared as soon as this.props.initialCloud became false. After many failed workarounds the only thing that worked was to clone and rename Cloud.js in this manner.

//AndDesign - cloud
//Entypo - cloud
//FontAwesome - cloud
//Foundation - cloud
//Ionicons - ios-cloud, ios-cloudy, md-cloud
//MaterialIcons - cloud
//MaterialIcons - wb-cloudy
//MaterialCommunityIcons - apple-icloud, cloud

class InitialCloud extends React.PureComponent {

    constructor() {
        super()
        this.state = {
        }
        this.clouds = [{suite: AntDesign, name: 'cloud'}, {suite: Entypo, name: 'cloud'}, {suite: FontAwesome, name: 'cloud'}, {suite: Ionicons, name: 'ios-cloud'}, {suite: Ionicons, name: 'ios-cloudy'}, {suite: Ionicons, name: 'md-cloud'}, {suite: MaterialIcons, name: 'cloud'}, {suite: MaterialIcons, name: 'wb-cloudy'}, {suite: MaterialCommunityIcons, name: 'apple-icloud'}, {suite: MaterialCommunityIcons, name: 'cloud'}]
    }

    render() {

        const selection = Math.floor(Math.random() * 10)

        let IconComponent = this.clouds[selection].suite
        let name = this.clouds[selection].name

        let color = Math.floor(Math.random() * 360)
        let size = 3 + Math.floor(Math.random() * 4)
        let opacity = .5 + Math.random() * .5
        let left = new Animated.Value(config.screenWidth * Math.random())

        Animated.timing(
          left,
          { toValue: 0 - config.screenWidth/size,
            duration: 50000 + Math.random() * 50000,
            easing: Easing.bezier(0, 0, 1, 1), //this is linear because the default apparently isn't
            userNativeDriver: true //this needs to be added for Android
        }).start()

        return(
            <Animated.View style={{left: left, position: 'absolute', width: 100 + '%', height: 100 + '%', justifyContent: 'flex-end'}}>
                <IconComponent name={name} size={config.screenWidth/size} style={{bottom: config.screenWidth * .25, color: `hsl(${color}, 100%, 97%))`, opacity: opacity, shadowColor: 'rgb(255,255,255)', shadowOpacity: 1, shadowOffset: {width: 0, height: 0}, shadowRadius: 10}}/>
            </Animated.View>
        )
    }
}

export default InitialCloud
