import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Calculator from '../../components/calculator';
import { fontFamily } from '@/src/styles/fontFamily';
import HeaderUser from '@/components/headerUser';
import UserInfos from '@/components/userInfos';

const UserScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <HeaderUser/>
      </View>
      <View style={styles.container}>
        <UserInfos/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
  },
});

export default UserScreen;
