import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  AppState,
  Platform
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { mediaDevices } from 'react-native-webrtc';

const HomeScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const [meetingId, setMeetingId] = useState('');

  const createMeeting = () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    const newMeetingId = uuidv4().substring(0, 8);
    navigation.navigate('Meeting', {
      meetingId: newMeetingId,
      displayName,
      isNewMeeting: true,
    });
  };

  const joinMeeting = () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    if (!meetingId.trim()) {
      Alert.alert('Error', 'Please enter a meeting ID');
      return;
    }

    navigation.navigate('Meeting', {
      meetingId: meetingId.trim(),
      displayName,
      isNewMeeting: false,
    });
  };

  useEffect(() => {
    const cleanup = async () => {
      console.log('Home screen mounted - checking for any active media');
      try {
        const devices = await mediaDevices.enumerateDevices();
        console.log('Current media devices:', devices.length);
        
        if (Platform.OS === 'android') {
          const allTracks = await mediaDevices.getUserMedia({ audio: true, video: true })
            .then(stream => {
              const tracks = stream.getTracks();
              console.log(`Found ${tracks.length} active tracks, stopping them`);
              tracks.forEach(track => track.stop());
              return tracks;
            })
            .catch(err => {
              console.log('No active tracks or error getting them:', err);
              return [];
            });
        }
      } catch (error) {
        console.error('Error during media cleanup:', error);
      }
    };
    
    cleanup();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Video Meeting App</Text>
        <Text style={styles.subtitle}>Connect with anyone, anywhere</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#95a5a6"
          value={displayName}
          onChangeText={setDisplayName}
        />

        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={createMeeting}
        >
          <Text style={styles.buttonText}>Create New Meeting</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Meeting ID"
          placeholderTextColor="#95a5a6"
          value={meetingId}
          onChangeText={setMeetingId}
        />

        <TouchableOpacity
          style={[styles.button, styles.joinButton]}
          onPress={joinMeeting}
        >
          <Text style={styles.buttonText}>Join Meeting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e272e',
    padding: 20,
  },
  titleContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#bdc3c7',
    marginTop: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    color: '#ecf0f1',
    padding: 16,
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#2ecc71',
  },
  joinButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    color: '#95a5a6',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default HomeScreen;
