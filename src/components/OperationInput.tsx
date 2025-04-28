import React, {useEffect, useState} from "react";
import { Animated, TextInput, View, Text, StyleSheet, useAnimatedValue,} from "react-native";



interface OperationInputProps {
    value: string;
    onChangeText: (text: string) => void;
    children?: React.ReactNode;
  }

const OperationInput : React.FC<OperationInputProps>  = ({ value, onChangeText, children }) => {

        // fadeAnim will be used as the value for opacity. Initial Value: 0
      const fadeAnim = useAnimatedValue(0);

      const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };

      const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start();
      };

      useEffect(()=>{
        if(!value)
          fadeIn();
          else
          fadeOut();
      },[value])


    return(
           <View style = {styles.inputBox}>
              <Animated.View style = { {opacity: fadeAnim} }>

                <Text style= {{fontSize: 36, color: 'white', marginTop: 110, marginLeft: 20, textAlign: 'left'}} >     
                    Calculadora
                </Text>
             
             </Animated.View>
             
             <TextInput
                style={styles.input}
                value={value}
                onChangeText= {onChangeText}
                placeholder= ""
                editable= {false}
                multiline 
                numberOfLines={1}
                maxLength={200}
                textAlignVertical='bottom'
                textAlign="right"
                />

              <Text style={styles.result}>
                {children}
              </Text>

            </View>
    )
}


const styles = StyleSheet.create({
    
    input : {
        marginRight: 5,
        fontSize: 24,
        marginTop: 30,
        color: 'white',
        marginBottom: 0,
     },

     inputBox : {
        height: 315,
        backgroundColor: '#3d4955',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderEndEndRadius: 15,
        borderStartEndRadius: 15,
     },
     
     result : { 
      fontSize: 18,
      color: '#808080', 
      marginRight: 9,
      textAlign: 'right',  
     }
})

export default OperationInput