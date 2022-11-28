import React, { useState } from 'react'
import styled from 'styled-components/native'
import TasksIcon from '../assets/TasksIcon'
import LocationsIcon from '../assets/LocationsIcon'

// CONSTANTS 
import * as Constants from "expo-constants"

// import Sidebar from '../components/sidebar/Sidebar'

// import Locations from './Locations'
import Tasks from './Tasks'
import { Platform, SafeAreaView, StyleSheet } from 'react-native'

// import Remainder from '../components/Remainder'


const Container = styled.View`
  display: flex;
  flex: 1;
  width: auto;
  /* margin-left: 256px; */
  position: relative;
  /* padding: 0 4rem; */
  flex-direction: row;
`

const Section = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: 48px;
    margin-bottom: 48px;
    padding-left: 10%;
`

const MenuItems = 
[
  {
    id: "0", 
    label: "Tasks", 
    icon: (color) => <TasksIcon color={color} />
  }, 
  {
    id: "1", 
    label: "Locations",
    icon: (color) => <LocationsIcon color={color} />
  }
]

function Dashboard() {

    const [selectedMenuItem, setSelectedMenuItem] = useState (MenuItems[0])
    
    return (
      <SafeAreaView style={styles.container}>
        <Container>
            {/* <Sidebar 
              menuItems={MenuItems}
              selectedMenuItem={selectedMenuItem} 
              setSelectedMenuItem={setSelectedMenuItem} 
            /> */}
            <Section>
              <Tasks display={selectedMenuItem.id === "0"}/>
              {/* <Locations display={selectedMenuItem.id === "1"}/> */}
            </Section>
            {/* <Remainder /> */}
        </Container>
      </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
  flex:
  {
    flex: 1
  },
  container:
  {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "ios" ? 0 : Constants.default.statusBarHeight
  }
})