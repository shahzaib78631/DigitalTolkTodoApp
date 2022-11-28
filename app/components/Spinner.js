import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";


const Center = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default function LoadingSpinner({color = "black"}) {
  return (
    <Center>
      <ActivityIndicator size={"small"} color={color} />
    </Center>
  );
}