import React from 'react'
import { View, Animated, Easing } from 'react-native'
import { Audio } from 'expo-av'

class Pop extends React.PureComponent {

    constructor() {
        super()
        this.state = {
        }
    }

    async playSound() {

        if (this.props.diameter === null) {
            return
        }

        const pitchConstant = this.props.diameter / 120
        const soundObject = new Audio.Sound()

        try {
            await soundObject.loadAsync(require('../../assets/sounds/pop.mp3'))
            this.pop = soundObject
                this.pop.setPositionAsync(0)
                this.pop.setRateAsync(2 - pitchConstant, false, Audio.PitchCorrectionQuality.High)
                this.pop.playAsync()
                //The below occasionally mutes pops, so commenting out but keeping it for reference
                // .then(async playbackStatus => {
    			// 	setTimeout(() => {
    			// 		soundObject.unloadAsync()
    			// 	}, playbackStatus.playableDurationMillis)
    			// })
    			// .catch(error => {
    			// 	console.log(error)
    			// })
        } catch (error) {
              console.log(error)
        }
    }

    render() {

        this.playSound()

        let initialOpacity = new Animated.Value(.5)
        let initialScale = new Animated.Value(.001)
        let initialOpacitySnowflake = new Animated.Value(.5)
        let initialScaleSnowflake = new Animated.Value(.001)

        Animated.timing(
          initialScaleSnowflake,
          { toValue: 100,
            duration: 1000,
            easing: Easing.bezier(0, 0, 0, 1),
            userNativeDriver: true //this needs to be added for Android
        }).start()

        Animated.timing(
          initialOpacitySnowflake,
          { toValue: 0,
            duration: 1000,
            easing: Easing.bezier(0, 0, 1, 1),
            userNativeDriver: true //this needs to be added for Android
        }).start()

        Animated.timing(
          initialScale,
          { toValue: 2,
            duration: 100,
            easing: Easing.bezier(0, 0, 1, 1), //this is linear because the default apparently isn't
            userNativeDriver: true //this needs to be added for Android
        }).start()

        Animated.timing(
          initialOpacity,
          { toValue: 0,
            duration: 125,
            easing: Easing.bezier(0, 0, 1, 1), //this is linear because the default apparently isn't
            userNativeDriver: true //this needs to be added for Android
        }).start()

        return(
            <Animated.View style={{opacity: this.props.snowflake ? initialOpacitySnowflake : initialOpacity, left: this.props.x - this.props.diameter/2, top: this.props.y - this.props.diameter/2, width: this.props.diameter, height: this.props.diameter, borderRadius: this.props.diameter/2, backgroundColor: this.props.snowflake ? 'rgb(255,0,0)' : this.props.balloonColor, shadowOpacity: 1, shadowColor: this.props.snowflake ? 'rgb(255,0,0)' : this.props.balloonColor, shadowOffset: {width: 0, height: 0}, shadowRadius: 10, elevation: 1, transform: [ {scale: this.props.snowflake ? initialScaleSnowflake : initialScale} ] }}></Animated.View>
        )
    }
}

export default Pop
