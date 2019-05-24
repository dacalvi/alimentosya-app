import React from 'react';
import {View, Text, Image } from 'react-native';


export default AYTitleIcon = (props) => {
    
    return (
        <View
          style={{            
            flex: 1,
            flexDirection: 'row',
            minHeight: 60,
            marginLeft: 10,
            marginVertical: 10
          }}
        >
          <View style={{ }}>
            <Image style={{width: 45, height: 45}} source={props.imageIcon}/>
          </View>
          <View style={{ paddingTop: 5, paddingLeft: 10 }}>
            <Text style={{ marginBottom: 10, fontSize: 24, fontWeight: 'bold' }} numberOfLines={4} childrenString={props.text} >
              {props.text}
            </Text>
          </View>
        </View>
)};