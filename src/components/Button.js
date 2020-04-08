import React from 'react'

import { StyleSheet, Dimensions, Text, TouchableHighlight, Button } from 'react-native'

import { RFValue } from "react-native-responsive-fontsize"

const styles = StyleSheet.create({
    buttons: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        padding: 20,
        fontSize: RFValue(30, Dimensions.get('window').height),
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888'
    },
    double:{
        width: (Dimensions.get('window').width / 4) * 2,
    },
    operation:{
        backgroundColor:'orange'
    }
})


export default ({ label, double, operation, onClick }) => {

    const buttonStyle = [styles.buttons]
    if(double) buttonStyle.push(styles.double)
    if(operation) buttonStyle.push(styles.operation)

    if(!onClick){
        onClick = () => {}
    }

    return (
        <TouchableHighlight onPress={() => onClick(label)} >
            <Text style={buttonStyle}>{label}</Text>
        </TouchableHighlight>
    )
}