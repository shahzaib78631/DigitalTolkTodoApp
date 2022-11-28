import React, { useEffect, useState } from 'react'
import { DeviceEventEmitter, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

// CUSTOM COMPONENTS
import AppSwipeableList from '../components/AppSwipeableList'
import LocationListItem from '../components/LocationListItem'
import LoadingSpinner from '../components/Spinner'
import AppText from '../components/Text'
import httpRequest from '../utils/httpRequest'

// LOCATIONS
import * as Location from 'expo-location';

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 20px;
`

const Text = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #575767;
  margin-bottom: 10px;
`

const Section = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 16px;
`

const CurrentLocationContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 16px;
`

const TitleContainer = styled.View`
  margin-bottom: 20px;
`


// const Section = styled.View`
//   display: flex;
//   /* max-height: 250px; */
//   flex-direction: column;
//   margin-top: 48px;
// `

function Locations({navigation, route}) {

  // STATE FOR SHOW HIDE LOADER
  const [loading, setLoading] = useState(false);

  const [checkins, setCheckins] = useState([])

  const [currentLocation, setCurrentLocation] = useState(null)

  const [selectedCheckin, setSelectedCheckin] = useState(null)

  useEffect (() => 
  {

    (async () => {
      
      await Location.requestForegroundPermissionsAsync();

    })();
    
    DeviceEventEmitter.addListener("refreshCheckins", (event) => { getUserCheckins(true) })

    getUserCheckins();

    return () => DeviceEventEmitter.removeAllListeners("refreshCheckins");

  }, [])

  // FUNCTION FOR GETTING THE CHECKINS
  const getUserCheckins = async (loadSilently = false) => 
  {

    if (!loadSilently)
      setLoading (true)

    // SEND HTTP REQUEST
    const response = await httpRequest ("/checkins", "GET");

    // IF RESPONSE IS SUCCESSFULL
    if (response.code === 200)
    {
      setCurrentLocation (response.checkins.pop())
      setCheckins (response.checkins.reverse())
    }

    if (!loadSilently)
      setLoading (false)
  }

  // FUNCTION FOR REMOVING THE CHECKIN
  const removeFromCheckins = (checkin) => 
  {
    // REMOVE THE CHECKIN FROM CHECKINS ARRAY
    const filteredCheckins = checkins.filter(i => i.id !== checkin.id)

    // UPDATE THE CHECKINS
    setCheckins (filteredCheckins);
  }

  const handleDelete = async (checkin) =>
  {
    setLoading (true);

    // SEND THE HTTP REQUEST
    const response = await httpRequest (`/checkins/${checkin.id}`, "DELETE")

    // IF TASK IS SUCCESSFULLY DELETED
    if (response.code === 204)
    {
      removeFromCheckins(checkin)
    }

    setLoading (false)
  }
  
  const handleEdit = (checkin) =>
  {
    navigation.navigate("NewLocation", {selectedCheckin: checkin, showHeader: true})
  }

//   IF LOADING IS TRUE
  if (loading) 
  {
    return <LoadingSpinner />
  }

  return (
    <Container>
        <TitleContainer>
            <AppText size={30}>Locations</AppText>
        </TitleContainer>
        <TouchableOpacity onPress={() => navigation.navigate("NewLocation")}>
            <Text>+ Check In</Text>
        </TouchableOpacity>
      <CurrentLocationContainer>
        <Text>Current Location</Text>
        {
          currentLocation 
          &&
          <LocationListItem subtext={`${currentLocation.latitude}° N, ${currentLocation.longitude}° E`} text={currentLocation.address} />
        }
      </CurrentLocationContainer>
      <Section>
        <Text>Previous Locations</Text>
        <AppSwipeableList
          data={checkins}
          handleDelete={(checkin) => handleDelete(checkin)}
          handleEdit={(checkin) => handleEdit(checkin)}
          renderItem=
          {
            (checkin) => 
            <LocationListItem subtext={`${checkin.latitude}° N, ${checkin.longitude}° E`} text={checkin.address} />
          }
        />
      </Section>
    </Container>
  )
}

export default Locations