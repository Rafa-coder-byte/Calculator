import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';


//Option 1: Setting the onpress to be a function that returns void
interface Props {
    onPress: () => void;
    style?: StyleProp<ViewStyle>; 
  textStyle?: StyleProp<TextStyle>;
  iconName?: keyof typeof FontAwesome6.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const IconButton: React.FC<Props> = ({ onPress, style, textStyle, iconName, iconSize= 16, iconColor='white' }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? '#808080' : 'black', // Change color when pressed
          opacity: pressed ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
    >

      <View style={styles.contentContainer}>
          <FontAwesome6 name={iconName} size={iconSize} color={iconColor} style={[styles.icon, textStyle]} iconStyle = 'regular' />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
  },
   icon: {
   },
});

export default IconButton;
