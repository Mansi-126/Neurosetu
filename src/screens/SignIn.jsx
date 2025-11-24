import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import supabase from '../utils/supabase';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

export default function SignIn(){
    const navigation = useNavigation();
    const [Loading, setLoading] = useState(true);

    useEffect(()=>{
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '928257764666-1iee88dk07nekt7s35s1js4rgub4njvg.apps.googleusercontent.com',
        });
    },[])

    const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("userInfo:",userInfo);
         
            if(userInfo.data.idToken){
               const {data,error} = await supabase.auth.signInWithIdToken({
                    provider: 'google',
                    token: userInfo.data.idToken,
                });
                console.log("supabase Auth Response:",{data,error});
                if(error){
                    Alert.alert('Error:', error.message);
                }else{
                    console.log("userInfo:",userInfo);
                    navigation.replace('Home',{user:userInfo.data.user});
                }
            }

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('SignIn Cancelled', 'User cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('SignIn In Progress', 'Please wait while we sign you in');
            } else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Play Services Not Available', 'Please update your play services');
            }else{
                Alert.alert('SignIn Failed', 'Please try again');
            }
        }
    }
    
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
        <View>
            <TouchableOpacity onPress={handleGoogleSignIn} style={{backgroundColor: '#000', padding: 10, borderRadius: 5, flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/google.png')} style={{width: 20, height: 20, marginRight: 10}} />
                <Text style={{color: '#fff'}}>SignIn with Google</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}