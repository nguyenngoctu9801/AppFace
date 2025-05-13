import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './Page/login';
import GuideScreen from './Page/GuideScreen';
import UserScreen from './Page/UserScreen'; 
import { StatusBar } from 'react-native';
import UserDetail from './Page/UserDetail';
import face from './Page/face';


const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <Stack.Navigator initialRouteName="Login">

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Guide"
              component={GuideScreen}
              options={{ title: 'Hướng dẫn sử dụng' }}
            />
              <Stack.Screen name="User"  component={UserScreen} options={{ headerShown: false }} />  
              <Stack.Screen name="UserDetail" component={UserDetail} options={{ headerShown: false }} />
              <Stack.Screen
                name="Face"
                component={face}
                options={{ headerShown: false }}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
