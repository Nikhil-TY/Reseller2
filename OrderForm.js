import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import ModalDropdown from 'react-native-modal-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useNavigation } from '@react-navigation/native';

const shadeCardsData = [
  {
    ticket: '8850060',
    shadeCard: 'J87Spadepoly8850',
    shades: ['Shade 1', 'Shade 2', 'Shade 3', 'Shade 4', 'Shade 5', 'Shade 6', 'Shade 7', 'Shade 8', 'Shade 9', 'Shade 10', 'Shade 11', 'Shade 12', 'Shade 13', 'Shade 14', 'Shade 15'],
  },
  {
    ticket: '8851060',
    shadeCard: 'Spadepoly_8851',
    shades: ['Shade A', 'Shade B', 'Shade C', 'Shade D', 'Shade E', 'Shade F', 'Shade G', 'Shade H', 'Shade I', 'Shade J'],
  },
  {
    ticket: '844B008',
    shadeCard: 'COLOUR ATLAS',
    shades: ['Shade X', 'Shade Y', 'Shade Z', 'Shade P', 'Shade Q', 'Shade R', 'Shade S', 'Shade T', 'Shade U', 'Shade V', 'Shade W', 'Shade M', 'Shade N', 'Shade O', 'Shade L', 'Shade K', 'Shade J', 'Shade I', 'Shade H', 'Shade G', 'Shade F', 'Shade E', 'Shade D', 'Shade C'],
  },
  {
    ticket: '8971T37',
    shadeCard: 'MCL/TLR cut rolls',
    shades: ['Shade T1', 'Shade T2', 'Shade T3', 'Shade T4', 'Shade T5'],
  },
  {
    ticket: '8860000',
    shadeCard: 'J33_8860',
    shades: ['Shade 001', 'Shade 002', 'Shade 003'],
  },
  {
    ticket: '8800060',
    shadeCard: 'SPADE8800',
    shades: ['Shade M01', 'Shade M02', 'Shade M03', 'Shade M04', 'Shade M05', 'Shade M06', 'Shade M07'],
  },
  {
    ticket: '8801060',
    shadeCard: 'SPADE_8801',
    shades: ['Shade 1', 'Shade 2', 'Shade 3', 'Shade 4'],
  },
];

const OrderForm = () => {
  const [articleTicket, setArticleTicket] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [shadeSets, setShadeSets] = useState([{ shadeNumber: '', quantity: '' }]);
  const [selectedBuyer, setSelectedBuyer] = useState(''); 
  const [selectedPO, setSelectedPO] = useState(''); 
  const navigation = useNavigation();


  const allOptions = ['8850060', '8851060', '844B008', '8971T37', '8860000', '8800060', '8801060'];
  const articleTicketToShadeCardMap = new Map([
    ['8850060', 'J87Spadepoly8850'],
    ['8851060', 'Spadepoly_8851'],
    ['844B008', 'COLOUR ATLAS'],
    ['8971T37', 'MCL/TLR cut rolls'],
    ['8860000', 'J33_8860'],
    ['8800060', 'SPADE8800'],
    ['8801060', 'SPADE_8801'],
  ]);

   
  const handleProceedButtonPress = () => {
    if (!articleTicket) {
      Alert.alert('Error', 'Please enter the Article number.');
      return;
    }
    const selectedShadeCard = getShadeCardForArticleTicket(selectedOption);
    if (!selectedShadeCard) {
      Alert.alert('Error', 'Please select a valid Shade Card.');
      return;
    }
  
    // Check and handle missing or undefined values in shadeSets
  const validShadeSets = shadeSets.map((shadeSet) => {
    if (!shadeSet) {
      // If the element is undefined, return an object with default values
      return { shadeNumber: '', quantity: '' };
    }

    // Set default values if 'shadeNumber' or 'quantity' is missing
    const validShadeNumber = shadeSet.shadeNumber || '';
    const validQuantity = shadeSet.quantity || '';
    return { shadeNumber: validShadeNumber, quantity: validQuantity };
  });

  // Save the data to Firestore
  firebase
    .firestore()
    .collection('orderFormData')
    .add({
      articleTicket: articleTicket,
      selectedShadeCard: selectedShadeCard,
      shadeSets: validShadeSets,
    })
    .then(() => {
      console.log('Data saved successfully to Firestore from OrderForm page.');
      console.log('Proceeding...');

      // Navigate to ConfirmationPage and pass necessary data as route parameters
      navigation.navigate('ConfirmationPage', {
        orderData: {
          selectedStatus: selectedOption,
          selectedBuyer: selectedBuyer, // <-- Pass selectedBuyer
          selectedPO: selectedPO, // <-- Pass selectedPO
        },
        formData: {
          articleTicket,
          selectedShadeCard,
          shadeSets: validShadeSets, // <-- Pass validShadeSets
        },
      });
    })
    .catch((error) => {
      console.error('Error saving data to Firestore from OrderForm page:', error);
    });
};

  

  const handleShadeSetChange = (index, key, value) => {
    const updatedShadeSets = [...shadeSets];
    if (!updatedShadeSets[index]) {
      updatedShadeSets[index] = {};
    }
    updatedShadeSets[index][key] = value;
    setShadeSets(updatedShadeSets);
  
    if (key === 'shadeNumber') {
      return;
    }

  };
  
  const handleArticleTicketChange = (text) => {
    setArticleTicket(text);
    const filteredOptions = allOptions.filter((option) => {
      const lowerCaseOption = option.toLowerCase();
      const lowerCaseText = text.toLowerCase();
      return lowerCaseOption.includes(lowerCaseText);
    });
    setFilteredOptions(filteredOptions);
    setSelectedOption('');
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setArticleTicket(option);
    setFilteredOptions([]);
    // Reset the selectedBuyer and selectedPO when the option is selected
    setSelectedBuyer('');
    setSelectedPO('');
  };
  const getShadesForSelectedOption = () => {
    const selectedShadeCardData = shadeCardsData.find((data) => data.ticket === selectedOption);
    return selectedShadeCardData ? selectedShadeCardData.shades : [];
  };

  const renderShadeCardDropdown = () => {
    if (selectedOption !== '') {
      const shadeCard = getShadeCardForArticleTicket(articleTicket);
      return (
        <DropdownContainer>
          <ModalDropdown
            options={[shadeCard]}
            dropdownTextStyle={{ fontSize: 16, color: 'black' }}
            textStyle={{ fontSize: 16, color: 'black' }}
            defaultValue="Select an option"
          />
        </DropdownContainer>
      );
    }
    return null;
  };

  const getShadeCardForArticleTicket = (ticket) => {
    return articleTicketToShadeCardMap.get(ticket) || '';
  };

  const renderShadeSetsTable = () => {
    const shades = getShadesForSelectedOption();
    const selectedShadeCardData = shadeCardsData.find((data) => data.ticket === selectedOption);


    return (
      <ShadeSetsTable>
        <ShadeSetHeader>
          <HeaderText>Shade Number</HeaderText>
          <HeaderText>Quantity</HeaderText>
        </ShadeSetHeader>
        <ShadeSetContainer>
          <ScrollView>
            {shades.map((shade, index) => (
              <ShadeSetRow key={index}>
                <ShadeSetInput
                  value={shadeSets[index]?.shadeNumber || selectedShadeCardData?.shades[index] || ''}
                  onChangeText={(value) => handleShadeSetChange(index, 'shadeNumber', value)}
                  inputTextColor="#000000"
                />
                <ShadeSetInput
                  placeholder="Quantity"
                  value={shadeSets[index]?.quantity || ''}
                  onChangeText={(value) => handleShadeSetChange(index, 'quantity', value)}
                  inputTextColor="#000000"
                />
              </ShadeSetRow>
            ))}
          </ScrollView>
        </ShadeSetContainer>
      </ShadeSetsTable>
    );
  };

  return (
    <Container>
      <Row>
        <Label>Article Ticket</Label>
        <CustomTextInput
          placeholder="Enter text"
          value={articleTicket}
          onChangeText={handleArticleTicketChange}
          placeholderTextColor="#666" // Set placeholder text color
        />
      </Row>
      {filteredOptions.length > 0 && (
        <OptionsContainer>
          <FlatList
            data={filteredOptions}
            renderItem={({ item }) => (
              <OptionItem onPress={() => handleOptionSelect(item)}>
                <OptionText>{item}</OptionText>
              </OptionItem>
            )}
            keyExtractor={(item) => item}
            initialScrollIndex={0}
          />
        </OptionsContainer>
      )}
      <Row>
        <Label>Shade Card:</Label>
        {renderShadeCardDropdown()}
      </Row>
      {renderShadeSetsTable()}
      <ProceedButton onPress={handleProceedButtonPress}>
        <ProceedButtonText>Proceed</ProceedButtonText>
      </ProceedButton>
    </Container>
  );
};
const Container = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: #ffffff;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin-right: 8px;
`;

const CustomTextInput = styled(TextInput)`
  height: 40px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  color: black;
`;

const OptionsContainer = styled(View)`
  position: absolute;
  top: 80px;
  left: 16px;
  right: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #ffffff;
  z-index: 1;
`;

const OptionItem = styled.TouchableOpacity`
  padding: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const OptionText = styled(Text)`
  font-size: 16px;
  color: black;
`;

const DropdownContainer = styled(View)`
  height: 40px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  margin-left: 10px;
  z-index: 2;
`;

const ShadeSetsTable = styled(View)`
  margin-top: 10px;
`;

const ShadeSetHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  background-color: #005da9;
  padding: 16px;
`;

const HeaderText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const ShadeSetRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const ShadeSetContainer = styled(View)`
  background-color: #E6F2FF; 
  border-radius: 4px;
  height: 420px;
`;

const ShadeSetInput = styled(TextInput)`
  height: 40px;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  color: black;
  margin-left: 10px;
  
`;

const ProceedButton = styled(TouchableOpacity)`
  background-color: #005da9;
  padding: 12px 24px;
  border-radius: 8px;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProceedButtonText = styled(Text)`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default OrderForm;
