import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator,Image,TouchableOpacity   } from 'react-native';
import { getApi } from '../Component/utils/apiService';
import { useNavigation } from '@react-navigation/native';

const UserScreen = () => {
    const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Gọi API mỗi khi từ khoá thay đổi
  useEffect(() => {
    if (!keyword.trim()) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
        try {
          setLoading(true);
          console.log('Đang tìm với keyword:', keyword);
      
          const response = await getApi(
            `https://central.basesystem.one/iam/api/v0/users/search?keyword=${encodeURIComponent(keyword)}`
          );
      
          const data = response.data?.data?.rows;
          console.log(data, 'Kết quả người dùng từ API');
          setUsers(data || []);
        } catch (error) {
          console.error('Lỗi khi tìm kiếm người dùng:', error);
          setUsers([]);
        } finally {
          setLoading(false);
        }
      };
      
      

    const timeout = setTimeout(fetchUsers, 500); 
    return () => clearTimeout(timeout);
  }, [keyword]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mã người dùng</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã người dùng"
        value={keyword}
        onChangeText={setKeyword}
      />

      {loading && <ActivityIndicator style={{ marginTop: 10 }} />}

      <FlatList
  data={users}
  keyExtractor={(item) => item.userId?.toString() || item.username}
  renderItem={({ item }) => (
    <TouchableOpacity
    onPress={() => navigation.navigate('UserDetail', { user: item })}
  >
    <View style={styles.userItemContainer}>
      <Image
        source={item.avatarUrl ? { uri: item.avatarUrl } : require('../public/Image/user.jpg')}
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userText}>{item.fullName}</Text>
        <Text style={styles.subText}>{item.email}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )}
  ListEmptyComponent={
    !loading && keyword.trim() ? (
      <Text style={{ marginTop: 10 }}>Không tìm thấy người dùng</Text>
    ) : null
  }
  style={{ marginTop: 10, width: '100%' }}
/>




    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
statusText: {
  fontSize: 14,
  color: '#007BFF',
  marginTop: 4,
},

  userItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Bo tròn
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  userInfo: {
    flex: 1,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserScreen;
