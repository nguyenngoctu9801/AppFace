import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserDetailScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Face', { user }); // Điều hướng sang màn Face, truyền user
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={handlePress}>
        <Image
          source={user.avatarUrl ? { uri: user.avatarUrl } : require('../public/Image/face.png')}
          style={styles.avatar}
        />
        <Text style={styles.text}>Đăng ký khuôn mặt</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    elevation: 2, // đổ bóng Android
    shadowColor: '#000', // đổ bóng iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserDetailScreen;
