import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import AppText from './Text'
import { useNavigation } from '@react-navigation/native'


const Title = styled.Text`
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #000000;
    margin-bottom: 10px;
    text-align: center;
    flex: 1;
`

const Container = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    margin-top: 20px;
`

const BackTitle = styled.View`
    position: absolute;
    padding-left: 10px;
    padding-top: 5px;
    z-index: 1000;
    /* background-color: red; */
`

const Header = ({title, showBack}) => {
    
    const navigation = useNavigation ()

    return (
        <Container>
            {
                showBack
                &&
                <BackTitle>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AppText size={14} >Back</AppText>
                    </TouchableOpacity>
                </BackTitle>
            }
            <Title>{title}</Title>
        </Container>
    )
}

export default Header

const styles = StyleSheet.create({
    container:
    {
    
    }
})