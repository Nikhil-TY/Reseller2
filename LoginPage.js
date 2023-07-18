import React, { useState } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { SvgUri } from 'react-native-svg';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [highlightedField, setHighlightedField] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailFocus = () => {
    setHighlightedField('email');
  };

  const handlePasswordFocus = () => {
    setHighlightedField('password');
  };

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setIsLoading(false);
         navigation.navigate('Home');
       })
      .catch((error) => {
        setErrorMessage('Invalid credentials. Please check your email and password.');
        setIsLoading(false);
      });
  };


  return (
    <Container>
      <LogoImage
        uri="https://www.coats.com/Content/Coats/assets/img/logo.svg"
        width={100} // Adjust the width as needed
        height={100} // Adjust the height as needed
      />

      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <Input
        placeholder="Username: @coats.com"
        placeholderTextColor="#aaa"
        onChangeText={handleEmailChange}
        onFocus={handleEmailFocus}
        highlighted={highlightedField === 'email'}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={handlePasswordChange}
        onFocus={handlePasswordFocus}
        highlighted={highlightedField === 'password'}
      />

<ButtonContainer onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <ButtonText>Submit</ButtonText>
        )}
      </ButtonContainer>

      <SignupLinkText onPress={handleSignupPress}>Sign up</SignupLinkText>
    </Container>
  );
};


const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled(SvgUri)`
margin-top: 50px; 
margin-bottom: 100px;
`;

const ErrorMessage = styled.Text`
  color: red;
  text-align: center;
  /* Add other styles as needed */
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  background-color: ${(props) => (props.highlighted ? '#f5f5f5' : '#f9f9f9')};
  margin-top: 20px;
  padding-horizontal: 10px;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${(props) => (props.highlighted ? '#005DA9' : '#aaa')};
  color: #000;
`;

const ButtonContainer = styled(TouchableOpacity)`
  background-color: #005DA9;
  margin-top: 50px;
  border-radius: 30px;
  padding-vertical: 10px;
  padding-horizontal: 130px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const SignupLinkText = styled.Text`
  color: #005DA9;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 70px;
  text-decoration-line: underline;
`;

export default LoginPage;
