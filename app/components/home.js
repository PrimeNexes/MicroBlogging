import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, TouchableHighlight} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import {addData} from "../actions";
import axios from 'axios'; 

export default function Home(props) {
    const dispatch = useDispatch();

    //1 - DECLARE VARIABLES
    const [isFetching, setIsFetching] = useState(false);

    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const { data } = dataReducer;


    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);

    //==================================================================================================

    //3 - GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        //OPTION 1 - LOCAL DATA using instructions.json file
        //delay the retrieval [Sample reasons only]
        // setTimeout(() => {
        //     const data  = Data;
        //     console.log(data)
        //     dispatch(addData(data));
        //     setIsFetching(false);
        // }, 2000);

        //OPTION 2 - API CALL
        let url = "https://jsonplaceholder.typicode.com/posts/1/comments";
        axios.get(url)
            .then(res => res.data)	
            .then((data) => {dispatch(addData(data))})
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };
   

    //==================================================================================================

    //4 - RENDER FLATLIST ITEM
    const renderItem = ({item, index, separators}) => {
        return (
            <TouchableHighlight
                    key={item.key}
                    onPress={() => {}}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Text style={styles.title}>
                    {item.name}
                </Text>
                <Text style={styles.description}>
                    {item.body}
                </Text>
                    </View>
                    </TouchableHighlight>
        )
    };

    //==================================================================================================

    //5 - RENDER
    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true}/>
            </View>
        );
    } else{
        return (
            <View style={{backgroundColor: '#F5F5F5',flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop:'8px',
            alignItems:'center'}}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => `flat_${index}`}
                />
            </View>
        );
    }
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