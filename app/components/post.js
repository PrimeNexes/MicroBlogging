import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Button,Input } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import {addData} from "../actions";
import { useNavigation } from '@react-navigation/native';

export default function Post(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const dataReducer = useSelector((state) => state.dataReducer);
    const { data } = dataReducer;
    //1 - DECLARE VARIABLES
    const [value, onChangeText] = React.useState('');

    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    const post = () =>{
        if(value){
        const postData = {
            "name": "Dave",
            "body": value
          };
          data.unshift(postData)
        dispatch(addData(data));

        //Post API
        //axios.post("https://urlhere.com", {
	    //    headers: postData
        //})
    
        }
        navigation.pop()
    }

    //==================================================================================================
   

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM

    //==================================================================================================

    //5 - RENDER
    return (
        <View style={styles.container}>
             <Card
  title="New Post"  
    >
    <Input
            onChangeText={text => onChangeText(text)}
            placeholder='Type your Post'
            value={value}
            />
            
        <Button
        title="Post !"
        type="outline"
        onPress={() => post()}
        />
    </Card>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {backgroundColor: '#F5F5F5',flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop:'8px',
    alignItems:'center'},


});