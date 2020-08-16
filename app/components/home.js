import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator, TouchableHighlight } from 'react-native';
import { Card, Avatar,SearchBar,Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { addData } from "../actions";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 

export default function Home(props) {
    //1 - DECLARE VARIABLES
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isFetching, setIsFetching] = useState(false);
    const [isSeaching, setIsSeaching] = useState(false);
    const [stateText,setStateText] = useState('');
    const [stateData,setStateData] = useState([]);
    //Access Redux Store State
    const dataReducer = useSelector((state) => state.dataReducer);
    const {data} = dataReducer;   
    
    var arrayholder = [];
    arrayholder = data;

    //MAIN CODE BEGINS HERE
    useEffect(() => getData(), []);
    function searchData(text) {
    const newData = arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
    setStateData(newData);
    setIsSeaching(true);
    setStateText(text);
    }


    //GET FLATLIST DATA
    const getData = () => {
        setIsFetching(true);

        let url = "https://jsonplaceholder.typicode.com/posts/1/comments";
        axios.get(url)
            .then(res => res.data)	
            .then((data) => {dispatch(addData(data));})
            .catch(error => alert(error.message))
            .finally(() => setIsFetching(false));
    };
   
    //Create Profile Tab
    const profileTitle = (name)=>{
        return (
        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{margin:'8px'}}>
        <Avatar
        rounded
        source={{
        uri:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        />
        </View>
        <View>
    <Text style={{marginTop: 14}}>{name}</Text>
        </View>
    </View> 
    )};

    //RENDER FLATLIST ITEM
    const renderItem = ({item, index, separators}) => {
        return (

            <TouchableHighlight
                    key={item.key}
                    style = {styles.container}
                    onPress={() => {}}
                    onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Card title={profileTitle(item.name)}  
                    >
                    <Text style={{marginBottom: 10}}>
                    {item.body}
                    </Text>
                </Card>
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
            marginTop:'8px',
            margin:'12px'}}>
            <Button
        title="Post"
        onPress={() => {    
            setStateData([]);
            setIsSeaching(false);
            navigation.navigate('Post')}}
        />
        <SearchBar
         onChangeText={(text) => searchData(text)}
         value={stateText}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />

                <FlatList
                data={isSeaching?stateData:data}
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
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: 'white',

     },
});