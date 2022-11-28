
import { useEffect, useRef, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { DeviceEventEmitter, Platform, SafeAreaView, StyleSheet, View, } from 'react-native';
import { useAtom } from 'jotai';

// NOTIFICATIONS
import * as Notifications from 'expo-notifications';

// STYLED COMPONENT
import styled from 'styled-components/native';

// CONSTANTS
import * as Constants from "expo-constants"

// NAVIGTAIONS
import AuthNavigation from './app/navigation/AuthNavigation';
import AppNavigation from './app/navigation/AppNavigation';

// STORE
import { loggedInStatus, pushToken } from './app/utils/store';

// CUSTOM COMPONENTS
import Remainder from './app/components/Remainder';
import { registerForPushNotificationsAsync, schedulePushNotification } from './app/utils/notifications';

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-grow: 1;
`


const theme = 
{
    ...DefaultTheme,
    colors:
    {
        ...DefaultTheme.colors,
        background: "white"
    }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [loggedIn] = useAtom (loggedInStatus);

  const [showRemainder, setShowRemainder] = useState ({task: null, display: false});

  const [expoPushToken, setExpoPushToken] = useAtom(pushToken);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect (() => 
  {

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // REGISTER THE EVENT LISTENER
    DeviceEventEmitter.addListener("showRemainder", handleRemainder);

    return () => {
      DeviceEventEmitter.removeAllListeners("showRemainder")
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, [])

  const handleRemainder = (task) => 
  {
    setShowRemainder({task: task.task, display: true})
    schedulePushNotification(task)
  }

  return (
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <NavigationContainer theme={theme}>
          <Container>
          <Remainder visible={showRemainder.display} setVisible={(type) => setShowRemainder((prev) => ({...prev, display: false}))}  task={showRemainder.task} />
            {
              loggedIn
              ?
              <AppNavigation />
              :
              <AuthNavigation />
            }
          </Container>
        </NavigationContainer>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: 
  {
    flex: 1
  },
  container:
  {
    paddingTop: Platform.OS === "android" ? Constants.default.statusBarHeight : 0,
    flex: 1,
  }
})
