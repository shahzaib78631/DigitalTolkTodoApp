import { Platform } from "react-native";

// NOTIFICATIONS
import * as Notifications from 'expo-notifications';

// DEVICE
import * as Device from 'expo-device';


async function schedulePushNotification({task, seconds = 2}) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: task.title,
            body: task.description,
        },
        trigger: 
        { 
            seconds: seconds
        },
    });
}
  
async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', 
        {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
    } 
    else 
    {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}

export {registerForPushNotificationsAsync, schedulePushNotification}