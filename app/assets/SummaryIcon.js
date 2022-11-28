import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SummaryIcon = (props) => (
  <Svg
    width={21}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.028 7h-10a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2Zm-4 4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2Zm-1-11a10 10 0 0 0-10 10 9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09 1 1 0 0 0 .95.58h9a10 10 0 0 0 0-20Zm0 18h-6.59l.93-.93a1 1 0 0 0 0-1.41 8 8 0 1 1 5.66 2.34Z"
      fill="#575767"
    />
  </Svg>
)

export default SummaryIcon
