import { useAtom } from 'jotai';
import React, { useState } from 'react'
import styled from 'styled-components/native'
import AppButton from '../components/Button'
import AppText from '../components/Text';
import AppTextInput from '../components/TextInput';
import { loggedInStatus } from '../utils/store';

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const TitleContainer = styled.View`
  margin-bottom: 30px;
`

const Section = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;

`

const ForgetPassword = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
`

const Footer = styled.View`
  /* margin-top: auto; */
`

function Login() {
  const [, setLoggedIn] = useAtom (loggedInStatus)

  const [errors, setErrors] = useState ({email: false, password: false});

  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState ("")

  // FUNCTION FOR VALIDATING THE EMAIL ADDRESS
  const validateEmail = () =>
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      {
        return (true)
      }
        
      alert("You have entered an invalid email address!")
      setErrors ((prev) => ({...prev, email: true}))

      return (false)
  }

  // FUNCTION FOR VALIDATING THE PASSWORD
  const validatePassword = () =>
  {
    if (password.length > 5)
      {
        return (true)
      }
        
      alert("Password Must Of 5 Character long!")

      setErrors ((prev) => ({...prev, password: true}))

      return (false)
  }

  const handleLogin = () =>
  {
      if (validateEmail() && validatePassword())
      {
        setLoggedIn (true)
      }
  }

  return (
    <Container>
        <Section>
          <TitleContainer>
            <AppText size={30} >Log In</AppText>
          </TitleContainer>
          <AppTextInput 
            value={email} 
            keyboardType="email-address"
            textContentType="emailAddress"
            onChange={(text) => setEmail(text)} 
            error={errors.email} 
            placeholder={"Email"} 
          />
          <AppTextInput 
            value={password} 
            onChange={(text) => setPassword(text)}  
            error={errors.password} 
            placeholder={"Password"} 
            type="password" 
          />
        </Section>
        <Footer>
          <AppButton title={"Log In"} onClick={handleLogin} />
          <ForgetPassword>
            <AppText size={16} >Forgot your password?</AppText>
          </ForgetPassword>
        </Footer>
    </Container>
  )
}

export default Login