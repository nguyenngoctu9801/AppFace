import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Định nghĩa type cho navigation
type RootStackParamList = {
  Login: undefined;
  Guide: undefined;
  User: undefined;
};

type GuideScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Guide'>;

const GuideScreen = () => {
  const [isAgreed, setAgreed] = useState(false);
  const navigation = useNavigation<GuideScreenNavigationProp>();

  const onCheck = (value: boolean) => {
    setAgreed(value);
    if (value) {
      navigation.navigate('User');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>📷 Quét Khuôn Mặt</Text>
      <Text style={styles.text}>1. Mở ứng dụng và chọn chức năng "Quét khuôn mặt".</Text>
      <Text style={styles.text}>2. Đưa khuôn mặt của bạn vào khung hình sao cho toàn bộ khuôn mặt nằm trong khung.</Text>
      <Text style={styles.text}>3. Giữ yên khuôn mặt và đảm bảo ánh sáng đầy đủ, không bị ngược sáng.</Text>
      <Text style={styles.text}>4. Hệ thống sẽ tự động nhận dạng và xác thực khuôn mặt trong vài giây.</Text>
      <Text style={styles.text}>5. Nếu nhận diện thành công, bạn sẽ được chuyển sang màn hình tiếp theo.</Text>

      {/* Checkbox đồng ý */}
      <View style={styles.agreeContainer}>
  <CheckBox

    onClick={() => onCheck(!isAgreed)}
    isChecked={isAgreed}
    leftText={" "}
    checkBoxColor="#444"
  />
  <Text style={styles.label}>Tôi đồng ý với các hướng dẫn trên</Text>
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 15,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
    color: '#444',
  },
  agreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
  },
});

export default GuideScreen;
