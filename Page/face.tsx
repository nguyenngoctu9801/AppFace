import React, { useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';

const Face = ({ route }) => {
  const { user } = route.params;

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Quyền truy cập camera',
            message: 'Ứng dụng cần quyền truy cập camera để quét khuôn mặt.',
            buttonPositive: 'Đồng ý',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('Quyền camera bị từ chối');
        }
      }
    };

    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.codeText}>Mã định danh: {user.accessCode}</Text>

      <View style={styles.cameraWrapper}>
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
        />
        <View style={styles.overlayCircle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  cameraWrapper: {
    width: 250,
    height: 250,
    borderRadius: 125,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  overlayCircle: {
    ...StyleSheet.absoluteFillObject,
    borderColor: '#4a90e2',
    borderWidth: 4,
    borderRadius: 125,
  },
});

export default Face;
