import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from "react-native";


export default function App() {

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  let maxX = 0;
  let maxY = 0;
  let maxZ = 0;

  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  });

  if (x > maxX) {
    maxX = x;
  }
  if (y > maxY) {
    maxY = y;
  }
  if (z > maxZ) {
    maxZ = z;
  }


  const reset = {} = {
    
  };

  const start = {} = {
    
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>G-Force</Text>
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>

      <Text style={styles.text}>Max : </Text>
      
      <Text>x: {x}</Text>
      <Text>y: {y}</Text>
      <Text>z: {z}</Text>

      <Animated.View style={[styles.ball, {}]} />

        <Button title="Start" onPress={start}></Button>
        <Button title="Reset" onPress={reset}></Button>
      


    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: 50,
    height: 50,
    backgroundColor: "orange",
  }



});

