import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

const OrderForm = () => {
  return (
    <Container>
      <Row>
        <Label>Label 1:</Label>
        <TextBox placeholder="Enter text" />
      </Row>
      <Row>
        <Label>Label 2:</Label>
        <Dropdown>
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Dropdown>
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
  margin-bottom: 16px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const TextBox = styled.TextInput`
  height: 40px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
`;

const Dropdown = styled(Picker)`
  height: 40px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
`;

export default OrderForm;
