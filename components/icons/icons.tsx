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

export const Health = ({ size, color, style }: IconProps) => {
  return <FontAwesome6 name="hand-holding-medical" size={size} color={color} style={style} />;
};

export const UserLarge = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="user-large" size={size} color={color} />;
};

export const UserCircle = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="user-circle" size={size} color={color} />;
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

export const EditIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="edit" size={size} color={color} />;
};

export const CancelIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="circle-xmark" size={size} color={color} />;
};

export const SaveIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="save" size={size} color={color} />;
};

export const CheckIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="check-circle" size={size} color={color} />;
};

export const UserIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="user" size={size} color={color} />;
};

export const DniIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="vcard" size={size} color={color} />;
};

export const PhoneIcon = ({ size, color }: IconProps) => {
  return <Feather name="phone" size={size} color={color} />;
};

export const MailIcon = ({ size, color }: IconProps) => {
  return <Feather name="mail" size={size} color={color} />;
};

export const GenderIcon = ({ size, color }: IconProps) => {
  return <Ionicons name="male-female" size={size} color={color} />;
};

export const LogoutIcon = ({ size, color }: IconProps) => {
  return <Ionicons name="log-out-outline" size={size} color={color} />;
};

export const ActivityIcon = ({ size, color }: IconProps) => {
  return <Feather name="activity" size={size} color={color} />;
};

export const FaceSmileIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="face-smile" size={size} color={color} />;
};

export const FaceMehIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="face-meh" size={size} color={color} />;
};

export const FaceFrownIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="face-frown" size={size} color={color} />;
};
