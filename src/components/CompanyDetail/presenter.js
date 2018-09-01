import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import styled from 'styled-components';

import { LogoImage } from '../commons';


const CompanyDetail = (props) => {
  const { companyInfo } = props;

  return (
    <Container>
      <InfoBox>
        <View style={styles.titleContent}>
          <LogoImage {...companyInfo} size="medium" />
        </View>
      </InfoBox>
      <InfoBox>
        <Text>Event Info.</Text>
      </InfoBox>
      <InfoBox>
        <Text>Detail Info.</Text>
      </InfoBox>
      <InfoBox>
        <Text>Actions</Text>
      </InfoBox>
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled.View`
  border: 1px solid #e6e6e6;
  background-color: white;
  box-shadow: 0 8px 38px rgba(209, 209, 209, 0.445);
  border-radius: 5px;
  padding: 15px;
  display: flex;
`;

const styles = StyleSheet.create({
  titleContent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
});

export default CompanyDetail;
