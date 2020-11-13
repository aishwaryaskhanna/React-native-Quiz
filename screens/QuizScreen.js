import React, { useState } from 'react';
import {StyleSheet,View,AsyncStorage} from 'react-native';
import {FAB,RadioButton,Text } from 'react-native-paper';

const questions = require('../quizData.json');
let score = 0;

const QuizScreen = ({navigation}) => {        
  const [questionSNo,setQuestionSerialNumber] = useState(0);
  const [answerSNo,setAnswerSerialNumber] = useState(questions[0].submittedAnswerOption);
  const [buttonLabel,changeButtonLabel] = useState('Next');
  const currentQuestion = questions[questionSNo];
  changeQuestion = (navigation) => {                
    const currentQuestion = questions[questionSNo];        
    if(answerSNo === currentQuestion.correctAnswer)
        score = score+1;            
    if(buttonLabel === 'End Quiz') {                    
        navigation.navigate('PersonalInformationScreen',{'currentScore':score});
    }
    else {            
      if(questionSNo == questions.length -2)
          changeButtonLabel('End Quiz');                
      setQuestionSerialNumber(questionSNo+1);
      setAnswerSerialNumber('');
    }                
  }

  React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        score = 0;
      });
      return unsubscribe;
    }, [navigation]);

  return(
    <>
    <View style={styles.container}>
      <Text style={styles.fontStyle}>{"\n"}{currentQuestion.questionText}{"\n"}</Text>
    </View>
    <RadioButton.Group onValueChange={(value) => setAnswerSerialNumber(value)}  value={answerSNo}>
      {currentQuestion.choices.map((value,index)=>{
        return <RadioButton.Item style={styles.fontStyle} key={index} value={value.answerSerialNumber} label={value.answerText} />
      })}
    </RadioButton.Group>
    <FAB style={styles.buttonStyle} label={buttonLabel} onPress={() => changeQuestion(navigation)}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#110457',
    margin: 10,
    padding: 7,
    flexDirection:"row",
    alignItems: 'center',
  },
  fontStyle: {
    fontSize: 20,
    color: 'white',
  },
  buttonStyle: {
    borderRadius: 30,
    width:150,
    justifyContent:'center',
    alignContent:'center',
    marginLeft:118,
    marginTop:50,
    alignItems: 'center',
    backgroundColor: '#110457',

  }
});


export default QuizScreen;