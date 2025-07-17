import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

export const PlusCircleIcon = ({ size, color }: IconProps) => {
  return <Feather name="plus-circle" size={size} color={color} />;
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

export const ActivityIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="activity" size={size} color={color} style={style} />;
};

export const ClockIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="clock" size={size} color={color} style={style} />;
};

export const TargetIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="target" size={size} color={color} style={style} />;
};

export const FaceSadTearIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="face-sad-tear" size={size} color={color} />;
};

export const FaceMehIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="face-meh" size={size} color={color} />;
};

export const FaceGrimaceIcon = ({ size, color }: IconProps) => {
  return <FontAwesome6 name="face-grimace" size={size} color={color} />;
};

export const CameraIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="camera" size={size} color={color} style={style} />;
};

export const ImageIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="image" size={size} color={color} style={style} />;
};

export const PaperClipIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="paperclip" size={size} color={color} style={style} />;
};

export const ArrowUpIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="arrow-up" size={size} color={color} style={style} />;
};

export const PlusIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="plus" size={size} color={color} style={style} />;
};

export const LoaderIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="loader" size={size} color={color} style={style} />;
};

export const SetttingsIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="settings" size={size} color={color} style={style} />;
};

export const BellIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="bell" size={size} color={color} style={style} />;
};

export const ContactsIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="users" size={size} color={color} style={style} />;
};

export const ChevronRightIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="chevron-right" size={size} color={color} style={style} />;
};

export const ChevronLeftIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="chevron-left" size={size} color={color} style={style} />;
};

export const SquareIcon = ({ size, color, style }: IconProps) => {
  return <FontAwesome6 name="square" size={size} color={color} style={style} />;
};

export const SquareCheckIcon = ({ size, color, style }: IconProps) => {
  return <FontAwesome6 name="square-check" size={size} color={color} style={style} />;
};

export const CheckV2Icon = ({ size, color, style }: IconProps) => {
  return <Feather name="check" size={size} color={color} style={style} />;
};

export const AlignLeftIcon = ({ size, color, style }: IconProps) => {
  return <Feather name="align-left" size={size} color={color} style={style} />;
};

export const SosIcon = ({ size, color, style }: IconProps) => {
  return <MaterialIcons name="sos" size={size} color={color} style={style} />;
};

export const WarningIcon = ({ size, color }: IconProps) => {
  return <Ionicons name="warning" size={size} color={color} />;
};

export const TrashIcon = ({ size, color }: IconProps) => {
  return <Feather name="trash-2" size={size} color={color} />;
};
