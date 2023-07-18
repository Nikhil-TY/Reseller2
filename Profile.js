import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const Container = styled.View`
  padding-horizontal: 20px;
  padding-top: 20px;
  color: #005DA9;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${props => (props.grey ? 'grey' : '#005DA9')};
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: ${props => (props.error ? 'red' : 'grey')};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
  color: ${props => (props.grey ? 'grey' : 'black')};
  font-size: 17px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 220px;
`;

const ButtonContainer1 = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-right: 20px;
  margin-top: 20px;
  background-color: #005DA9;
  border-radius: 30px;
`;

const ButtonContainer2 = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-top: 20px;
  background-color: #005DA9;
  border-radius: 30px;
`;

const StyledButton = styled(Button)`
  flex: 1;
  background-color: ${props => (props.disabled ? 'red' : '#005DA9')};
  border-radius: 30px;
  color: ${props => (props.disabled ? '#000' : '#fff')};
`;

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Loader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#005DA9',
})``;

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [mobileNumberFocus, setMobileNumberFocus] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const mobileNumberRef = useRef(null);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userId);

    userRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const userDetails = doc.data();
          setUserDetails(userDetails);
          setFirstName(userDetails.firstName);
          setLastName(userDetails.lastName);
          setMobileNumber(userDetails.mobileNumber);
        } else {
          console.log('User details not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  useEffect(() => {
    if (firstNameError || lastNameError || mobileNumberError) {
      setFirstNameFocus(false);
      setLastNameFocus(false);
      setMobileNumberFocus(false);
    }
  }, [firstNameError, lastNameError, mobileNumberError]);

  const handleFirstNameChange = text => {
    setFirstName(text);
    setIsSaveEnabled(true);
  };

  const handleLastNameChange = text => {
    setLastName(text);
    setIsSaveEnabled(true);
  };

  const handleMobileNumberChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const truncatedValue = numericValue.slice(0, 10);
    setMobileNumber(truncatedValue);
    setIsSaveEnabled(true);
  };

  const handleSave = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setMobileNumberError(false);

    if (!firstName) {
      setFirstNameError(true);
    }
    if (!lastName) {
      setLastNameError(true);
    }
    if (!mobileNumber) {
      setMobileNumberError(true);
    }

    if (!firstName || !lastName || !mobileNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert(
        'Error',
        'Make sure your Mobile number consists only of numerals and is 10 digits long.'
      );
      setMobileNumberError(true);
      return;
    }

    setIsLoading(true);

    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userId);

    userRef
      .update({
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
      })
      .then(() => {
        setIsSaveEnabled(false);
        setIsLoading(false);
        Alert.alert('Success', 'User details saved successfully');

        // Reset focus and border color
        setFirstNameFocus(false);
        setLastNameFocus(false);
        setMobileNumberFocus(false);

        // Blur the input fields
        firstNameRef.current.blur();
        lastNameRef.current.blur();
        mobileNumberRef.current.blur();

      })
      .catch(error => {
        setIsSaveEnabled(false);
        setIsLoading(false);
        Alert.alert(
          'Error',
          'An unexpected error occurred while saving, please try again later.'
        );
        console.error('Error updating user details:', error);
      });
  };

  const handleCancel = () => {
    setFirstName(userDetails.firstName);
    setLastName(userDetails.lastName);
    setMobileNumber(userDetails.mobileNumber);
    setIsSaveEnabled(false);

    // Reset focus and border color
    setFirstNameFocus(false);
    setLastNameFocus(false);
    setMobileNumberFocus(false);

    // Blur the input fields
    firstNameRef.current.blur();
    lastNameRef.current.blur();
    mobileNumberRef.current.blur();

    //turning off Red colour highlight
        setFirstNameError(false);
        setLastNameError(false);
        setMobileNumberError(false);
  };

  return (
    <ScrollView>
      <Container>
        {isLoading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}

        {userDetails && (
          <View>
            <Label>First Name:</Label>
            <Input
              value={firstName}
              onChangeText={handleFirstNameChange}
              onFocus={() => setFirstNameFocus(true)}
              onBlur={() => setFirstNameFocus(false)}
              error={firstNameError}
              style={firstNameFocus ? { borderColor: '#005DA9' } : null}
              ref={firstNameRef}
            />

            <Label>Last Name:</Label>
            <Input
              value={lastName}
              onChangeText={handleLastNameChange}
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
              error={lastNameError}
              style={lastNameFocus ? { borderColor: '#005DA9' } : null}
              ref={lastNameRef}
            />

            <Label>Mobile Number:</Label>
            <Input
              value={mobileNumber}
              onChangeText={handleMobileNumberChange}
              onFocus={() => setMobileNumberFocus(true)}
              onBlur={() => setMobileNumberFocus(false)}
              error={mobileNumberError}
              style={mobileNumberFocus ? { borderColor: '#005DA9' } : null}
              ref={mobileNumberRef}
            />

            <Label grey>Email:</Label>
            <Input grey value={userDetails.email} editable={false} />
            <ButtonContainer>
              <ButtonContainer1>
                <StyledButton onPress={handleSave} disabled={!isSaveEnabled} title="Save" />
              </ButtonContainer1>
              <ButtonContainer2>
                <StyledButton onPress={handleCancel} disabled={!isSaveEnabled} title="Cancel" />
              </ButtonContainer2>
            </ButtonContainer>
          </View>
        )}
      </Container>
    </ScrollView>
  );
};

export default ProfilePage;
