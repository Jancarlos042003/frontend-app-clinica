import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

type IconProps = {
  size: number;
  color: string;
  style?: object;
};

export const Home = ({ size, color, style }: IconProps) => {
  return <Feather name="home" size={size} color={color} style={style} />;
};

export const Calendar = ({ size, color, style }: IconProps) => {
  return <Feather name="calendar" size={size} color={color} style={style} />;
};

export const Message = ({ size, color, style }: IconProps) => {
  return <Feather name="message-circle" size={size} color={color} style={style} />;
};

export const UserLarge = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="user-large" size={size} color={color} />;
};

export const ArrowBack = ({ size, color }: IconProps) => {
  return <Feather name="arrow-left" size={size} color={color} />;
};

export const Shield = ({ size, color }: IconProps) => {
  return <Ionicons name="shield-checkmark" size={size} color={color} />;
};

export const Eye = ({ size, color }: IconProps) => {
  return <Ionicons name="eye" size={size} color={color} />;
};

export const EyeOff = ({ size, color }: IconProps) => {
  return <Ionicons name="eye-off" size={size} color={color} />;
};

export const LockClosed = ({ size, color }: IconProps) => {
  return <Ionicons name="lock-closed" size={size} color={color} />;
};

export const LoginIcon = ({ size, color }: IconProps) => {
  return <Ionicons name="log-in" size={size} color={color} />;
};

export const LogoIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="heart-pulse" size={size} color={color} />;
};
