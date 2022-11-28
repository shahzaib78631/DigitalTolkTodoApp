import React from 'react'
import { StyleSheet, Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    /* min-height: 60px; */
    /* width: 100%; */
    user-select: none;
`

const SubText = styled.Text`
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #B9B9BE;
    margin-bottom: 10px;
`

const TextContainer = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px 15px;
    gap: 4px;
    min-width: 302px;
    min-height: 45px;
`

function LocationListItem({text, subtext}) {

  return (
    <Container>
        <Text>📍</Text>
        <TextContainer>
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.text]}>{text}</Text>
            <SubText>{subtext}</SubText>
        </TextContainer>
    </Container>
  )
}

const styles = StyleSheet.create({
    text: 
    {
        fontWeight: "500",
        fontSize: 16,
        color: "#575767",
        marginBottom: 5
    }
})

export default LocationListItem