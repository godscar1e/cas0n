import * as React from "react"
const SvgMark = ({ fill = "#000", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill={fill}
      d="M6.557 8.653a1 1 0 0 1-1.414 0L3.149 6.659a.5.5 0 0 1 0-.708l.202-.202a.5.5 0 0 1 .708 0L5.85 7.54l5.46-5.46C10.075.845 8.385 0 6.5 0 2.925 0 0 2.925 0 6.5S2.925 13 6.5 13 13 10.075 13 6.5c0-1.235-.325-2.34-.91-3.38z"
    />
  </svg>
)
export default SvgMark
