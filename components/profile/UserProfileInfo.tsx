import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ProfileDisplayProps = {
  icon: ReactNode;
  title: string;
  content: string;
};

const UserProfileInfo = ({ icon, title, content }: ProfileDisplayProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>
          {content.toLowerCase() === 'null' ? 'No registrado' : content}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#32729F',
  },
  content: {
    fontSize: 16,
  },
});

export default UserProfileInfo;
