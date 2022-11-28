import React from 'react'

// IMPORT CREATE NATIVE BOTTOM NAVIGATOR
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// CUSTOM SCREENS
import Dashboard from '../screens/Dashboard';
import Tasks from '../screens/Tasks';
import NewTask from '../screens/NewTask';
import TasksIcon from '../assets/TasksIcon';
import LocationIcon from '../assets/LocationsIcon';

//ICON
import { AntDesign } from '@expo/vector-icons';
import Locations from '../screens/Locations';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewLocation from '../screens/NewLocation';

// CREATE A NATIVE STACK NAVIGATOR
const Tab = createBottomTabNavigator ();

// BUILD THE SCREEN OPTIONS
const screenOptions = {
    headerShown: false,
    tabBarStyle:
    {
        height: 70
    },
}

// AUTH NAVIGATION
const AppNavigtaion = () => {
    
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name="Tasks" 
                component={TasksStack} 
                options={{
                    tabBarIcon: ({color}) => <TasksIcon color={color} />,
                    tabBarActiveTintColor: "black",
                    tabBarLabelStyle: {fontSize: 12, top: -5},
                    tabBarInActiveTintColor: "#C4C4C4",
                }}
            />
            <Tab.Screen 
                name="NewTask" 
                component={NewTask} 
                options={{
                    tabBarIconStyle: {
                        position: "absolute",
                        bottom: 0,
                        top: 0,
                        left: 0,
                        right: 0,
                        // zIndex: 10000
                    },
                    tabBarIcon: ({color}) => <AntDesign name="pluscircle" size={60} color="black" />,
                    tabBarLabel: "",
                }}
            />
            <Tab.Screen 
                name="Locations" 
                component={LocationsStack} 
                options={{
                    tabBarIcon: ({color}) => <LocationIcon color={color} />,
                    tabBarActiveTintColor: "black",
                    tabBarLabelStyle: {fontSize: 12, top: -5},
                    tabBarInactiveTintColor: "#C4C4C4",
                    tabBarLabel: "Locations",
                }}
            />
        </Tab.Navigator>
    )
}

const Stack = createNativeStackNavigator ();

const LocationsStack = () => 
{
    return <Stack.Navigator initialRouteName='LocationsScreen' screenOptions={{headerShown: false}} >
        <Stack.Screen name="LocationsScreen" component={Locations} />
        <Stack.Screen name="NewLocation" component={NewLocation} />
    </Stack.Navigator>
}

const TasksStack = () => 
{
    return <Stack.Navigator initialRouteName='TasksScreen' screenOptions={{headerShown: false}} >
        <Stack.Screen name="TasksScreen" component={Tasks} />
        <Stack.Screen name="NewTaskScreen" component={NewTask} />
    </Stack.Navigator>
}

export default AppNavigtaion