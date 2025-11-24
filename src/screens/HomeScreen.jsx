import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({route}){

    const {user} = route.params;
    const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex:1}}>
    <StatusBar backgroundColor="transparent"  barStyle="light-content" />
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'#000000ff',fontSize:24}}>Welcome {user.email}</Text>
    </View>
    </SafeAreaView>
  )
}
