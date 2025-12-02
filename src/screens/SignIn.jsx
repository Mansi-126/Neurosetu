import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, Pressable } from 'react-native';
import supabase from '../utils/supabase';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

export default function SignIn(){
    const navigation = useNavigation();

    useEffect(()=>{
        GoogleSignin.configure({
              // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
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
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <View style={styles.card}>
        <Text style={styles.title}>Neurosetu</Text>
        <Text style={styles.subtitle}>Sign in with Google to continue</Text>

        <Pressable style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image source={require('../assets/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>

        
     </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 24,
    elevation: 3,
  },
  title: {
    color: '#F9FAFB',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  
});
