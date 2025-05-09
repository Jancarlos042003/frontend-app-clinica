import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */
const MedicalCalendar = (props: SvgProps) => (
  <Svg id="Calendars" viewBox="0 0 32 32" {...props}>
    <Path
      d="M2 11.97v13.96C2 28.18 3.82 30 6.07 30h19.86c2.25 0 4.07-1.82 4.07-4.07V11.97H2zm14 14.515a6.508 6.508 0 0 1-6.5-6.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5z"
      fill="#e4edf2"
    />
    <Path d="M16 13.485a6.508 6.508 0 0 0-6.5 6.5c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm1 9.25a1 1 0 1 1-2 0v-1.75h-1.75a1 1 0 1 1 0-2H15v-1.75a1 1 0 0 1 2 0v1.75h1.75a1 1 0 1 1 0 2H17v1.75z" />
    <Path
      d="M19.75 19.985a1 1 0 0 0-1-1H17v-1.75a1 1 0 0 0-2 0v1.75h-1.75a1 1 0 1 0 0 2H15v1.75a1 1 0 1 0 2 0v-1.75h1.75a1 1 0 0 0 1-1z"
      fill="#fff"
    />
    <Path d="M29 3.96h-3.875v2.959a1 1 0 1 1-2 0V3.96H17v2.959a1 1 0 0 1-2 0V3.96H8.875v2.959a1 1 0 0 1-2 0V3.96H3c-.55 0-1 .45-1 1v7.01h28V4.96c0-.55-.45-1-1-1z" />
    <Path
      d="M7.875 7.919a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v3.919a1 1 0 0 0 1 1zm16.25 0a1 1 0 0 0 1-1V3a1 1 0 1 0-2 0v3.919a1 1 0 0 0 1 1zm-8.125 0a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v3.919a1 1 0 0 0 1 1z"
      fill="#393b3d"
    />
  </Svg>
);
export default MedicalCalendar;
