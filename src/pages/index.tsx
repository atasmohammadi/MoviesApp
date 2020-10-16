import 'react-native-gesture-handler';
import * as React from 'react';

import Home from './Home';
import Details from './Details';
import type { Movie } from './Home/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ title: 'Home' }} component={Home as React.ComponentClass} />
                <Stack.Screen name="Details" options={({ route }) => ({ title: route.params.movie.Title })} component={Details as React.FC} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}