import * as React from "react"
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"

const CheckboxChecked = (props) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={1.5} y={1} width={22} height={22} rx={5} fill="url(#a)" />
    <Path
      d="m8.5 13 2.917 3L16.5 8"
      stroke="#575767"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x={1.5}
      y={1}
      width={22}
      height={22}
      rx={5}
      stroke="#DADADA"
      strokeWidth={2}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={12.5}
        y1={0}
        x2={12.5}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FCFCFC" />
        <Stop offset={1} stopColor="#F8F8F8" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default CheckboxChecked
