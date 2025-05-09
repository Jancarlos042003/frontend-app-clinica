import * as React from 'react';
import Svg, { Circle, Defs, Path, Rect, SvgProps } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */
const SvgComponent = (props: SvgProps) => (
  <Svg id="Layer_1" data-name="Layer 1" viewBox="0 0 48 48" {...props}>
    <Defs />
    <Rect width={35.25} height={45.04} x={0.5} y={2.46} rx={1.96} />
    <Path d="M3.44 5.4h29.38v39.17H3.44z" fill="#edebf2" />
    <Circle cx={18.13} cy={16.17} r={5.88} fill="#fff" />
    <Path
      d="M10.29 1.48v5.87a1 1 0 0 0 1 1H25a1 1 0 0 0 1-1V1.48a1 1 0 0 0-1-1H11.27a1 1 0 0 0-.98 1ZM24 6.37H12.25V2.46H24Z"
      fill="#c6c3d8"
    />
    <Path d="M7.35 24.98h5.88v5.88H7.35zm0 8.81h5.88v5.88H7.35z" />
    <Path
      d="M16.17 24.98H28.9v1.96H16.17zm0 3.92H28.9v1.96H16.17zm0 4.89H28.9v1.96H16.17zm0 3.92H28.9v1.96H16.17z"
      fill="#a9a5c4"
    />
    <Path d="M14.21 15.19h7.83v1.96h-7.83z" />
    <Path d="M19.1 12.25v7.83h-1.96v-7.83z" />
    <Path d="m8.213 28.206 1.386-1.386 2.771 2.772-1.386 1.386z" />
    <Path d="m9.597 29.587 4.122-4.123 1.386 1.386-4.122 4.122zm-1.385 7.429 1.386-1.386 2.772 2.772-1.386 1.386z" />
    <Path d="m9.596 38.396 4.123-4.122 1.386 1.386-4.123 4.122z" />
    <Path d="m44.28 10.58 1.26 1.26 2 2v7.26a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-6.48L42.89 12Z" />
    <Path d="m38.69 35.75 2 4.9h2l2-4.9V11.27a1 1 0 0 0-1-1h-4.02a1 1 0 0 0-1 1Z" />
    <Path d="M40.65 40.65h2v1a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-1Z" />
    <Path d="M43.58 10.29h-3.92V6.38a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3.91Z" />
  </Svg>
);
export default SvgComponent;
