import React from 'react';
import { View, Text, StatusBar, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ route }) {
  const { user } = route.params || {};
  const navigation = useNavigation();

  return (
    <SafeAreaView style={homeStyles.screen}>
      <StatusBar backgroundColor="#0F172A" barStyle="light-content" />
      <View style={homeStyles.card}>
        {user?.photo ? (
          <Image source={{ uri: user.photo }} style={homeStyles.avatar} />
        ) : (
          <View style={homeStyles.avatarPlaceholder} />
        )}
        <Text style={homeStyles.title}>Welcome</Text>
        <Text style={homeStyles.subtitle}>{user?.email || 'User'}</Text>
      </View>
    </SafeAreaView>
  );
}

const homeStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '92%',
    maxWidth: 420,
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 30,
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1F2937',
  },
  title: {
    color: '#F9FAFB',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});
