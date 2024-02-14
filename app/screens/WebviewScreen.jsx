import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function WebviewScreen() {
  return (
    <View className={'flex-grow pt-12'}>
      <WebView source={{uri : 'https://www.tomorrow.io'}}  />
    </View>
  )
}

const styles = StyleSheet.create({})