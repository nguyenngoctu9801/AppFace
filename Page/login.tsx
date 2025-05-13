import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { Alert } from 'react-native';
import { login } from '../Component/utils/requestUltils';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('iviwork2023aA@');
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'Vui lòng nhập username';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập password';
      isValid = false;
    } else if (password.length <= 5) {
      newErrors.password = 'Mật khẩu phải nhiều hơn 5 ký tự';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const FaceLogin = async () => {
    try {
       await login(username, password);
      navigation.navigate('Guide');
    } catch (error: any) {
      let message = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          message = error.response.data.message;
        } else if (error.response?.status === 400) {
          message = 'Thông tin đăng nhập không hợp lệ.';
        }
      }
      Alert.alert('Lỗi đăng nhập', message);
    }
  };

  const handleLogin = () => {
    if (validate()) {
      FaceLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors((prev) => ({ ...prev, username: '' }));
        }}
        style={styles.input}
      />
      {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prev) => ({ ...prev, password: '' }));
        }}
        secureTextEntry
        style={styles.input}
      />
      {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    marginLeft: 4,
  },
});

export default LoginScreen;
