import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { theme } from '../constants/theme';

const Container = styled.View`
  background-color: ${props => props.bg};
  color: ${props => props.titleColor ? props.titleColor : theme.colors.secondary};
  width: ${props => props.buttonSize}px;
  height: 50px;
  border-radius: 100px;
  border-width: 0px;
  margin: 10px 0px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const TitleContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: ${props => props.center ? "center" : "flex-start"};
`

const Text = styled.Text`
  color: ${props => props.color ? props.color : "white"};
  font-size: ${props => props.size ? props.size : 16}px;
  text-align: center;
`

function AppButton({onClick, title, buttonSize,  size, loadingText = "", loading = false, center = true, borderLeftRounded = true, titleColor, bgColor}) {
  return (
    <TouchableOpacity onPress={onClick}>
      <Container
        buttonSize={buttonSize ? buttonSize : 340}
        bg={bgColor ? bgColor : theme.colors.primary}
        borderLeftRounded={borderLeftRounded ? true : false}
        titleColor={titleColor ? titleColor : theme.colors.white}
      >
        <TitleContainer center={center} >
          <Text size={size} color={titleColor ? titleColor : theme.colors.white}>
            {
              loading 
              ?
              loadingText
              :
              title
            }
          </Text>
        </TitleContainer >
      </Container>
    </TouchableOpacity>
  )
}

export default AppButton