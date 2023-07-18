import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";


const PlaceOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPO, setSelectedPO] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState("");
  const navigation = useNavigation();

  const handleStatusChange  = () => {
    navigation.navigate('Orders');
  };

  const getAddress = (shipToParty) => {
    switch (shipToParty) {
      case "ABC Company":
        return "new bus stand ke piche, dongergarh,33,491445";
      case "MNO Company":
        return "12A, XYZ Street, Somewhere, City, 123456";
      case "XYZ Company":
        return " Bangalore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
      default:
        return "";
    }
  };

  const handleButton1Press = () => {
    // Navigate to the OrderForm page
    navigation.navigate("OrderForm");
  };

  const handleButton2Press = () => {
    // Navigate to the orders page
    navigation.navigate("Orders");
  };


  return (
    <MainContainer>
      <ContentContainer>
        <Container>
          <DropdownLabel>Ship to party:</DropdownLabel>
          <DropdownSelect
            dropdownIconColor="#005DA9"
            selectedValue={selectedStatus}
            onValueChange={handleStatusChange}
            style={{ color: "black" }}
          >
            <DropdownOption label="Select Ship to party" value="" />
            <DropdownOption label="ABC Company" value="ABC Company" />
            <DropdownOption label="MNO Company" value="MNO Company" />
            <DropdownOption label="XYZ Company" value="XYZ Company" />
          </DropdownSelect>
        </Container>
        {selectedAddress !== "" && (
          <AddressContainer>
            <SelectedAddress>{selectedAddress}</SelectedAddress>
          </AddressContainer>
        )}
        <RowContainer>
          <RowLabel>PO No.:</RowLabel>
          <RowTextBoxContainer>
            <RowTextBox
              placeholder="Enter PO No."
              value={selectedPO}
              onChangeText={(value) => setSelectedPO(value)}
            />
          </RowTextBoxContainer>
        </RowContainer>
        <RowContainer>
          <RowLabel>Buyer:</RowLabel>
          <RowDropdownContainer>
            <RowDropdown
              selectedValue={selectedBuyer}
              onValueChange={(value) => setSelectedBuyer(value)}
              style={{ color: "black" }}
            >
              <DropdownOption label="Select Buyer" value="" />
              <DropdownOption label="Buyer 1" value="Buyer 1" />
              <DropdownOption label="Buyer 2" value="Buyer 2" />
              <DropdownOption label="*OTHERS*" value="Buyer 3" />
            </RowDropdown>
          </RowDropdownContainer>
        </RowContainer>
      </ContentContainer>

      {/* Footer */}
      <FooterContainer>
      <ButtonContainer>
      <CustomButton
  title="Button 1"
  color="#005DA9"
  onPress={() => handleButton1Press()}
>
  <ButtonText>
    <IconWrapper>
      <FontAwesome5 name="pen" size={20} color="white" />
    </IconWrapper>    MANUAL ENTRY                                       <IconWrapper>
      <FontAwesome5 name="arrow-right" size={20} color="white" />
    </IconWrapper>
  </ButtonText>
</CustomButton>

<CustomButton
  title="Button 2"
  color="#005DA9"
  onPress={() => handleButton2Press()}
>
  <ButtonText>
    <IconWrapper>
      <FontAwesome5 name="history" size={20} color="white" />
    </IconWrapper>    ORDER FROM ORDER HISTORY           <IconWrapper>
      <FontAwesome5 name="arrow-right" size={20} color="white" />
    </IconWrapper>
  </ButtonText>
</CustomButton>
      </ButtonContainer>
    </FooterContainer>
    </MainContainer>
  );
};

const MainContainer = styled(View)`
  flex: 1;
  background-color: #ffffff;
`;

const ContentContainer = styled(View)`
  flex: 1;
  padding: 16px;
`;

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const DropdownLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  color: #005da9;
`;

const DropdownSelect = styled(Picker)`
  height: 40px;
  width: 230px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
  color: #005da9;
`;

const DropdownOption = styled(Picker.Item)``;

const AddressContainer = styled(View)`
  margin-bottom: 16px;
`;

const SelectedAddress = styled(Text)`
  color: #000000;
  text-align: right;
`;

const RowContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const RowLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  color: #005da9;
  width: 70px;
`;

const RowTextBoxContainer = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

const RowTextBox = styled.TextInput`
  height: 40px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
`;

const RowDropdownContainer = styled(View)`
  flex: 1;
  align-items: flex-end;
`;

const RowDropdown = styled(Picker)`
  height: 40px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
 `;

const FooterContainer = styled(View)`
  background-color: #f5f5f5;
`;

const ButtonContainer = styled(View)`
  flex-direction: column; 
 `;

 const CustomButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.color};
  height: 80px;
  margin-bottom: 1px;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: white; 
  font-weight: bold;
  font-size: 17px;
  flex-direction: row;
  margin-left:10px;
  `;

const IconWrapper = styled(View)`
marginHorizontal: 5px; 
margin-left:5px;
`;

export default PlaceOrders;
