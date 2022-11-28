import React, { useEffect, useState } from 'react'
import { DeviceEventEmitter, StyleSheet, Text, TextInput, View } from 'react-native'
import styled from 'styled-components/native'
import DescriptionIcon from '../assets/DescriptionIcon'
import DueDateIcon from '../assets/DueDateIcon'
import SummaryIcon from '../assets/SummaryIcon'
import httpRequest from '../utils/httpRequest'
import AppButton from '../components/Button'
import Header from '../components/Header'

import * as Location from 'expo-location';

const Container = styled.View`
    display: flex;
    padding: 10px;
    flex-direction: column;
    flex: 1;
`

const ButtonsContainer = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-top: auto;
    align-self: center;
    justify-content: flex-end;
    align-items: center;
`

const FieldsContainer = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
`

const TextInputContainer = styled.View`
    display: flex;
    flex-direction: row;
`

const Title = styled.Text`
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 10px;
    text-align: center;
`

const Seperator = styled.View`
    width: auto;
    height: 0px;
    margin-bottom: 32px;
    background-color: ${props => props.error ? "#cb3837" : "rgba(189, 189, 189, 0.8)"};
    border: ${props => props.error ? 1 : 0.5}px solid ${props => props.error ? "#cb3837" : "rgba(189, 189, 189, 0.8)"};
`

function NewLocation({navigation, route}) {

    
    const [selectedCheckin, setSelectedCheckin] = useState (route.params?.selectedCheckin)

    const [address, setAddress] = useState("")

    // ERRORS
    const [errors, setErrors] = useState({address: false})

    // LOADING
    const [loading, setLoading] = useState(false);


    useEffect(() => 
    {
        // IF SELECTED TASK
        if (selectedCheckin)
        {
            setAddress (selectedCheckin.address)
        }

    }, [selectedCheckin])

    const getUserCoordinates = async () => 
    {
        
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
    
        let location = await Location.getCurrentPositionAsync({});

        handleSaveCheckIn(location);
      
    }
    

    // FUNCTION FOR SAVING THE NEW TASK
    const handleSaveCheckIn = async (position) =>
    {
        // IF VALIDATION FAILES THEN DO NOT PROCEED FURTHER
        if (!validateTask ()) return 

        const userCoordinates = position.coords;

        // START THE LOADING
        setLoading (true)
        
        // BUILD THE PAYLOAD
        const payload = 
        {
            "address": address,
            "latitude": userCoordinates.latitude,
            "longitude": userCoordinates.longitude
        }

        // SEND THE HTTP REQUEST
        const response = await httpRequest ("/checkins", "POST", payload);

        // IF RESPONSE IS SUCCESS
        if (response.code === 201)
        {
            setAddress ("");
            
            DeviceEventEmitter.emit("refreshCheckins")
        }

        // STOP THE LOADING
        setLoading (false)

    }
      
    const positionErrors = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // FUNCTION FOR SAVING THE NEW TASK
    const handleUpdate = async () =>
    {
        // IF VALIDATION FAILES
        if (!validateTask ()) return 

        // START THE LOADING
        setLoading (true)
        
        // BUILD THE PAYLOAD
        const payload = 
        {
            ...selectedCheckin,
            "address": address,
        }

        // SEND THE HTTP REQUEST
        const response = await httpRequest (`/checkins/${selectedCheckin.id}`, "PUT", payload);

        // IF RESPONSE IS SUCCESS
        if (response.code === 201)
        {
            setAddress ("");
            
            DeviceEventEmitter.emit('refreshCheckins');
            navigation.goBack()
        }

        // STOP THE LOADING
        setLoading (false)
    }

    const validateTask = () => 
    {
        if (address.trim() === "")
        {
            setErrors ((prev) => ({prev, address: true}))
            return false;
        }
        else if (errors.address)
        {
            setErrors ((prev) => ({prev, address: false}))
        }

        return true
    }

    return (
        <Container>
            <Header showBack={true} title={"New Checkin"} />
            <Container>
                <FieldsContainer>
                <TextInputContainer>
                    <View style={{marginTop: 5}}>
                        <Text>📍</Text>
                    </View>
                    <TextInput 
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                        placeholder={"Address"} 
                        multiline
                        style={[style.textArea, {height: 80}]}
                    />
                    </TextInputContainer>
                    <Seperator error={errors.address} />
                </FieldsContainer>
            </Container>
            <ButtonsContainer>
                <AppButton 
                    title={selectedCheckin ? "Update" : "Save"} 
                    loading={loading}
                    loadingText={selectedCheckin ? "Updating..." : "Saving..."}
                    onClick={selectedCheckin ? handleUpdate : getUserCoordinates}
                />
            </ButtonsContainer>
        </Container>
    )
}

const style = StyleSheet.create({
    textInput: 
    {
        border: 0,
        /* padding-inline: 1rem; */
        height: 30,
        flex: 1,
        textAlign: "left",
        marginLeft: 15,
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
    },
    textArea:
    {
        border: 0,
        /* padding-inline: 1rem; */
        height: 30,
        flex: 1,
        textAlign: "left",
        fontWeight: "500",
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 15,
        textAlignVertical: 'top'
    }
})

export default NewLocation