import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DescriptionIcon = (props) => (
  <Svg
    width={20}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 2h18a1 1 0 1 0 0-2H1a1 1 0 0 0 0 2Zm18 14H9a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2Zm0-8H1a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2Zm0 4H1a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Zm0-8H1a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2Z"
      fill="#575767"
    />
  </Svg>
)

export default DescriptionIcon
