import React, {ReactNode} from 'react';
import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';


interface Props {
  onPress: (value: ReactNode) => void;  
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; 
  textStyle?: StyleProp<TextStyle>;
}

const NumButton: React.FC<Props> = ({ onPress, children, style, textStyle }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          // transitionDelay: 2,
          backgroundColor: pressed ? '#808080' : 'black', 
          opacity: pressed ? 0.6 : 1,
        },
        style,
      ]}
      onPress={() => onPress(children)}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 65,
    width: 65,
    padding: 10,
    borderRadius: 32,
    marginTop: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    flexDirection: 'row',
  },

  buttonText: {
    color: 'white',
    fontSize: 26,
  },
});

export default NumButton;
