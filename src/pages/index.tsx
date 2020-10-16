import 'react-native-gesture-handler';
import * as React from 'react';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App(): React.ReactNode {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home as React.FC} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}