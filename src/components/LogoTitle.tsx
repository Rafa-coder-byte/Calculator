import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';


interface LogoTitleProps {
    tintColor?: string; 
  }

const LogoTitle : React.FC<LogoTitleProps> = ({ tintColor }) => {
    return (
      
      <View style = {styles.header}>
      
            <View style = {styles.headerIcon}>
                <Ionicons name ='calculator' size = {32} color = {"green"} />
            </View>

            <View style = {styles.headerText}>
                <Text style = {{fontSize: 30, fontFamily: 'Arial', color: tintColor || "white" }} >Calculator</Text>
            </View>
      </View>
    );
  }

 const styles = StyleSheet.create({
    header : {
        backgroundColor: '#808080',
        flexDirection: 'row',
        alignItems: 'center',
        borderEndEndRadius: 10,
        borderStartEndRadius: 10,
        width: '100%',
    },

    headerIcon : {
        marginRight: 4,
        marginBottom: 4,
        marginTop: 4,

    },

    headerText : {
        marginBottom: 4,
        marginTop: 4,
    },
});

  export default LogoTitle