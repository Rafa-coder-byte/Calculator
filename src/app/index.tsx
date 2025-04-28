import React, { useEffect, useState, ReactNode } from 'react';
import { StyleSheet, View} from 'react-native'
import  NumButton  from '../components/NumButton';
import IconButton from '@/components/IconButton';
import OperationInput from '@/components/OperationInput';
import { RepeatedSigns } from '@/helpers/RepeatedSigns';
import { Calculator } from '@/helpers/Calculator'; 

const  HomeScreen = () => {

    const [expression, setExpression] = useState('')
    const [result, setResult] = useState('')

    useEffect(() => {
      setResult(expression)
    }, [expression])

    var newExpression : string 

     const numberBotons = (num: ReactNode) => {
        setExpression(expression + num)
     }

     const extendKeyboard = () => {
               
     }

     const equalOperation = () => {
      try {
      
         let finalExpression = expression.replace(/÷/g, '/')
             finalExpression = finalExpression.replace(/x/g, '*')

         const tokenizeExpression = Calculator.tokenize(finalExpression);
         
         if(!Calculator.validateParentheses(tokenizeExpression)){
            throw new Error("Mismatched parentheses");
         }
         
         const postfix = Calculator.infixToPostfix(tokenizeExpression);

          setResult(Calculator.evaluatePostfix(postfix))
      }
      catch (error){
         alert('Error: ${error.message}');
      }

   }

     const pointBoton = () => {
      if(!expression.length)
         return
      
      newExpression = RepeatedSigns.eviteRepeatedSigns(expression, '.')
      setExpression(newExpression)
     }

     const percentOperation = () => {
      if(!expression.length)
         return
      
      newExpression = RepeatedSigns.eviteRepeatedSigns(expression, '%')
      setExpression(newExpression)
     }

     const addOperation = () => {
      if(!expression.length)
         return
         
         newExpression = RepeatedSigns.eviteRepeatedSigns(expression, '+')
         setExpression(newExpression)
      }

     const minusOperation = () => {
      
      newExpression = RepeatedSigns.eviteRepeatedSigns(expression, '-')
      setExpression(newExpression)
     }

     const mulOperation = () => {
      if(!expression.length)
         return
      
      newExpression = RepeatedSigns.eviteRepeatedSigns(expression, 'x')
      setExpression(newExpression)
     }

     const divOperation = () => {
      if(!expression.length)
         return
      
      newExpression = RepeatedSigns.eviteRepeatedSigns(expression, '÷')
      setExpression(newExpression)
     }

     const eraseAllOperation = () => {
        setExpression('')
     }

     const deleteOperation = () => {
        newExpression = expression.slice(0,-1)
        setExpression(newExpression)
     }


    return <View style={styles.main}>

        <View style = {styles.body}>

          <OperationInput value={expression} onChangeText={setExpression} children={result}>
            
          </OperationInput>

            <View style = {styles.keyboard}>
            <IconButton onPress={eraseAllOperation} iconName = 'eraser'  iconColor= 'white'/> 
                <IconButton onPress={deleteOperation} iconName = 'delete-left'  iconColor= 'white'/> 
                <IconButton onPress={percentOperation} iconName = 'percent' iconColor= 'white'/> 
                <IconButton onPress={divOperation} iconName = 'divide' iconColor= 'white' style = {{backgroundColor : '#9e9fa0'}} />

                <NumButton onPress={numberBotons}>7</NumButton>
                <NumButton onPress={numberBotons}>8</NumButton>
                <NumButton onPress={numberBotons}>9</NumButton>
                <IconButton onPress={mulOperation} iconName = 'xmark' iconColor= 'white' style = {{backgroundColor : '#9e9fa0'}} />

                <NumButton onPress={numberBotons}>4</NumButton>
                <NumButton onPress={numberBotons}>5</NumButton>
                <NumButton onPress={numberBotons}>6</NumButton>
                <IconButton onPress={minusOperation} iconName = 'minus' iconColor= 'white' style = {{backgroundColor : '#9e9fa0'}} />
               
                <NumButton onPress={numberBotons}>1</NumButton>
                <NumButton onPress={numberBotons}>2</NumButton>
                <NumButton onPress={numberBotons}>3</NumButton>
                <IconButton onPress={addOperation} iconName = 'add' iconColor= 'white' style = {{backgroundColor : '#9e9fa0'}} />
            
                <IconButton onPress={extendKeyboard} iconName = 'crop' iconColor= 'white' />
                <NumButton onPress={numberBotons}>0</NumButton>
                <NumButton onPress={pointBoton}>.</NumButton>
                <IconButton onPress={equalOperation} iconName = 'equals' iconColor= 'white' style = {{backgroundColor : '#556c7a'}} />
            </View>

        </View>

    </View>

 }

 const styles= StyleSheet.create(
    {
        main : {
             flex: 1,
             backgroundColor: 'white',
        },

        body : {
           flexDirection: 'column',
           flex: 1,
           backgroundColor: 'black',
        },

        input : {
           marginRight: 5,
           fontSize: 24,
           
        },

        inputBox : {
           height: 315,
           backgroundColor: '#808080',
           flexDirection: 'row',
           justifyContent: 'flex-end',
           borderEndEndRadius: 15,
           borderStartEndRadius: 15,
        },

        keyboard : {
            backgroundColor: 'black',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 17,
            marginRight: 14,
            marginLeft: 6,
        },

    }
 )

 export default HomeScreen