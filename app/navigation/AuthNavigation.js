import React from 'react'

// IMPORT CREATE NATIVE STACK NAVIGATOR
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// CUSTOM SCREENS
import Login from '../screens/Login';

// CREATE A NATIVE STACK NAVIGATOR
const Stack = createNativeStackNavigator();

// BUILD THE SCREEN OPTIONS
const screenOptions = {
    headerShown: false
}

// AUTH NAVIGATION
const AuthNavigation = () => {
    
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

export default AuthNavigation