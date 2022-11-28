import React, { useState } from 'react'
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import styled from 'styled-components';
import AppText from './Text';

const Container = styled.View`
    position:relative;
`

const TextInputContainer = styled.View`
    box-sizing: border-box;
    background: #F6F6F6;
    border: 2px solid ${props => props.error ? "#cb3837" : "#E8E8E8"};
    border-radius: 8px;
    width: 340px;
    font-size: 16px;
    margin: 8px 0;
    padding: ${props => props.size ? props.size : 16}px;
    flex-direction: row;
`

const ShowContainer = styled.View`
    border-width: 0;
    font-weight: 400;
    background-color: transparent;
    /* left: 50%; */
    justify-content: center;
    align-items: center;
`

function AppTextInput({placeholder, type, error, onChange, value, ...otherProps}) {
    
    // STATE FOR SHOW/HIDE PASSWORD
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Container>
            <TextInputContainer error={error}>
                <TextInput 
                    {...otherProps} 
                    value={value} 
                    onChangeText={(text) => onChange(text)} 
                    placeholder={placeholder} 
                    type={showPassword ? "text" : type}
                    style={[styles.textinput, {paddingRight: type === "password" ? 10 : 0}]}
                    secureTextEntry={ type === "password" ? !showPassword : false}
                />
                {
                    type === "password"
                    &&
                    <ShowContainer>
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <AppText weight="500" size={16}>Show</AppText>
                        </TouchableOpacity>
                    </ShowContainer>
                }
            </TextInputContainer>
            
        </Container>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    textinput:
    {
        flex: 1
    }
})