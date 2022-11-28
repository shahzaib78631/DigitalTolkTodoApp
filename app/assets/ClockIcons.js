import * as React from "react"

const ClockIcon = (props) => (
  <svg
    width={52}
    height={52}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M40.444 52H11.556C5.17 52 0 46.829 0 40.444V11.556C0 5.17 5.171 0 11.556 0h28.888C46.83 0 52 5.171 52 11.556v28.888C52 46.83 46.829 52 40.444 52Z"
        fill="#FABB18"
      />
      <path
        d="M26 36c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 20v6l4 2"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h52v52H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default ClockIcon
