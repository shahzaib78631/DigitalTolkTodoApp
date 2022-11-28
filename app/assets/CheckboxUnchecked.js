import * as React from "react"
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg"

const CheckboxUnchecked = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect x={1} y={1} width={22} height={22} rx={5} fill="url(#a)" />
    <Rect
      x={1}
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
        x1={12}
        y1={0}
        x2={12}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FCFCFC" />
        <Stop offset={1} stopColor="#F8F8F8" />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default CheckboxUnchecked
