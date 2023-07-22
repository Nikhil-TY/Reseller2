import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';

const ConfirmationPage = ({ route }) => {
  const { orderData, formData } = route.params;

  // Check if orderData and formData are available
  if (!orderData || !formData) {
    return (
      <Container>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  // Destructure the necessary data from orderData and formData
  const { selectedStatus, selectedBuyer, selectedPO } = orderData;
  const { articleTicket, selectedShadeCard, shadeSets } = formData;

  // Function to handle the "Confirm Order" button press
  const handleConfirmOrder = () => {
    // You can perform any further actions here before displaying the confirmation alert.
    // For now, let's just show an alert to simulate the order confirmation.

    // Show the confirmation alert
    Alert.alert(
      'Order Confirmed',
      'Your order has been confirmed successfully!',
      [{ text: 'OK', onPress: () => console.log('Order confirmed') }]
    );
  };

  return (
    <Container>
      <HeadingText>Confirmation Page</HeadingText>
      {/* Display the collected data here */}
      <DataText>Selected Status: {selectedStatus}</DataText>
      <DataText>Selected Buyer: {selectedBuyer}</DataText>
      <DataText>Selected PO: {selectedPO}</DataText>

      <DataText>Article Ticket: {articleTicket}</DataText>
      <DataText>Selected Shade Card: {selectedShadeCard}</DataText>

      <DataText>Shade Sets:</DataText>
      {shadeSets.map((shadeSet, index) => (
        <View key={index}>
          <DataText>Shade Number: {shadeSet.shadeNumber}</DataText>
          <DataText>Quantity: {shadeSet.quantity}</DataText>
        </View>
      ))}

      {/* "Confirm Order" button */}
      <ConfirmButton onPress={handleConfirmOrder}>
        <ConfirmButtonText>Confirm Order</ConfirmButtonText>
      </ConfirmButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #ffffff;
`;

const LoadingText = styled.Text`
  font-size: 18px;
  color: black;
`;

const HeadingText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 16px;
`;

const DataText = styled.Text`
  font-size: 16px;
  color: black;
  margin-bottom: 8px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #005da9;
  border-radius: 8px;
  padding: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const ConfirmButtonText = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
`;

export default ConfirmationPage;
