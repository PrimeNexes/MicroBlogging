import React, {useEffect, useState} from 'react';
import { StyleSheet, View, TextInput, Button} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import {addData} from "../actions";
import Data from "./instructions.json";
import { useNavigation } from '@react-navigation/native';

export default function Post(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const dataReducer = useSelector((state) => state.dataReducer);
    const { data } = dataReducer;
    //1 - DECLARE VARIABLES
    const [value, onChangeText] = React.useState('Type your Post');

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    const post = () =>{
        const postData = {
            "name": "Dave",
            "body": value
          };
          data.unshift(postData)
        dispatch(addData(data));
        navigation.pop()
    }

    //==================================================================================================
   

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM

    //==================================================================================================

    //5 - RENDER
    return (
        <View style={styles.row}>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => onChangeText(text)}
            value={value}
            />
        <Button
        title="Go Back"
        onPress={() => post()}
        />
        </View>
    )
};

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    title:{
        fontSize: 15,
        fontWeight: "600"
    },

    description:{
        marginTop: 5,
        fontSize: 14,
    }
});