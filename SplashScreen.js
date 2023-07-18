import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #005DA9;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: #FFFFFF;
  font-size: 62px;
`;

const SplashScreen = () => {
  return (
    <Container>
      <Text>Reseller</Text>
    </Container>
  );
};

export default SplashScreen;
