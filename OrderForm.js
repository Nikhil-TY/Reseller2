import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';
import ModalDropdown from 'react-native-modal-dropdown';

const OrderForm = () => {
  const [articleTicket, setArticleTicket] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const alertTimeoutRef = useRef(null);

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

  const handleArticleTicketChange = (text) => {
    setArticleTicket(text);

    // Filter the options based on the entered text
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
    setFilteredOptions([]); // Hide the options when an option is selected
  };

  const getShadeCardForArticleTicket = (ticket) => {
    return articleTicketToShadeCardMap.get(ticket) || '';
  };

  const renderOptionItem = ({ item }) => (
    <OptionItem onPress={() => handleOptionSelect(item)}>
      <OptionText>{item}</OptionText>
    </OptionItem>
  );

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
            renderItem={renderOptionItem}
            keyExtractor={(item) => item}
            initialScrollIndex={0}
          />
        </OptionsContainer>
      )}
      <Row>
        <Label>Shade Card:</Label>
        {renderShadeCardDropdown()}
      </Row>
      <Row>
        <Label>Search Shades:</Label>
        <CustomTextInput
          placeholder="Enter label text"
          value={selectedOption} // Use selectedOption (or any other state) to store the text box value
          onChangeText={setSelectedOption} // Update the selectedOption when the text box value changes
          placeholderTextColor="#666" // Set placeholder text color
        />
      </Row>
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
  z-index: 2; /* Set the z-index of the shade card dropdown to appear above the options container */
`;

export default OrderForm;
