import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, TextInput, StyleSheet, Pressable } from 'react-native';
import supabase from '../utils/supabase';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

export default function SignIn(){
    const navigation = useNavigation();
    const [Loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.replace('Home')}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <Pressable style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Image source={require('../assets/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Don’t have an account?{' '}
          <Text style={styles.footerLink} onPress={() => navigation.navigate('SignUp')}> Create one</Text>
        </Text>
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
  input: {
    backgroundColor: '#1F2937',
    borderColor: '#374151',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#F3F4F6',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 16,
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
  footerText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 16,
  },
  footerLink: {
    color: '#93C5FD',
    fontWeight: '600',
  },
});
