import React, {useState} from 'react'; 
import {StyleSheet,View,ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB,TextInput,Text} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';


const fileSystem = require('react-native-fs');
const scoreFilePath = fileSystem.DocumentDirectoryPath+'/score.txt';
const home = ({route, navigation}) =>{   

  const [score,setScore] = useState(0);  
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [nickName,setNickName] = useState('');
  const [age,setAge] = useState('');
  
  savePersonalInformation = (key,value) => {
    try{
      AsyncStorage.setItem(key,value).then(() => {
      });
    }catch(error){
      console.log(error)
    }
  }

  getPersonalInformation = () => {
    AsyncStorage.getItem('personalInformation',(error,result)=>{
      personalinformation = JSON.parse(result);
      if(personalinformation.firstName != null)
        setFirstName(personalinformation.firstName);
      if(personalinformation.lastName != null)
        setLastName(personalinformation.lastName);
      if(personalinformation.nickName != null)
        setNickName(personalinformation.nickName);
      if(personalinformation.age != null)
        setAge(personalinformation.age);
    });    
}

  navigateToQuiz = (navigation) => {
    navigation.navigate('QuizScreen')
  }

  storeScore = (value) =>{
    fileSystem.writeFile(scoreFilePath,value+'','utf8').then((response) => {
    }).catch((err) => {});          
  }
  
  retrieveScore = () =>{
    fileSystem.exists(scoreFilePath).then((result) =>{
      if(result){
        fileSystem.readFile(scoreFilePath,'utf8').then((response)=>{
          setScore(response);
        })
      }
    })    
  }

  const onFocus = useIsFocused();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(onFocus){
        if(route.params){
          let personalInformation = {};
          personalInformation.firstName = firstName;
          personalInformation.lastName = lastName;
          personalInformation.nickName = nickName;
          personalInformation.age = age;
          const personalInformationJSON = JSON.stringify(personalInformation);
          setScore(route.params.currentScore);
          savePersonalInformation('personalInformation',personalInformationJSON);   
          storeScore(route.params.currentScore);       
        }
        else {
          getPersonalInformation();       
          retrieveScore();   
        }
      }     
    });    
    return unsubscribe;
  }, [onFocus]);

  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}> 
      <View style={styles.container}>
        <TextInput
          value={firstName ? firstName : ''}
          onChangeText={(firstName) => {setFirstName(firstName)}}
          placeholder={'Enter your first Name'}
          style={styles.input}
        />
        <TextInput
          value={lastName ? lastName : ''}
          onChangeText={(lastName) => {setLastName(lastName)}}
          placeholder={'Enter your last Name'}
          style={styles.input}
        />
        <TextInput
          value={nickName ? nickName : ''}
          onChangeText={(nickName) => {setNickName(nickName)}}
          placeholder={'Enter your nickname'}
          style={styles.input}
        />
        <TextInput
          value={age ? age : ''}
          onChangeText={(age) => {setAge(age)}}
          placeholder={'Enter your age'}
          style={styles.input}
          keyboardType={'numeric'}
        />
        <FAB style={styles.buttonStyle}
          label="Start the Quiz"
          onPress={() => navigateToQuiz(navigation)}
        />
        <Text style={styles.fontStyle}>Score : {score ? score : 0}/4</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#110457',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 180,
    borderColor: '#080808',
    marginBottom: 10,
    borderRadius: 30,
    padding: 8,
    borderWidth: 2,
    

  },
  fontStyle:{
    marginTop:20,
    padding: 12,
    fontSize: 20,
    color: 'white',
  },
  buttonStyle:{
    marginTop:20,
  }
});

export default home;
