import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, Animated, Easing } from "react-native";


export default function App() {

  const posX = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(0)).current;

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [maxValues, setMaxValues] = useState({
    maxX: 0,
    maxY: 0,
    maxZ: 0,
  });

  // Set la variable isRunning à true ou false
  const [isRunning, setIsRunning] = useState(false);

  // Variable d'abonnement
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      // Set les valeurs maxs
      setMaxValues(prev => ({
          maxX: Math.max(prev.maxX, Math.abs(x)),
          maxY: Math.max(prev.maxY, Math.abs(y)),
          maxZ: Math.max(prev.maxZ, Math.abs(z)),
      }));

      // Anime la balle
      Animated.timing(posX, {
        toValue: x*100,
        duration: 50,
        easing: Easing.bounce,
        useNativeDriver: true
      }).start();

      Animated.spring(posY, {
        toValue: y*100,
        duration: 50,
        easing: Easing.bounce,
        useNativeDriver: true
      }).start();
    } 
  }, [x, y, z, isRunning]);

  const start = () => {

    if (!isRunning) {
      setIsRunning(true);
      subscriptionRef.current = Accelerometer.addListener(setData);
      Accelerometer.setUpdateInterval(50);
    }

  };

  const stop = () => {

    if (isRunning) {
      setIsRunning(false);
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
        subscriptionRef.current = null;
      }

      Animated.timing(posX, {
        toValue: 0,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: true
      }).stop();

      Animated.timing(posY, {
        toValue: 0,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: true
      }).stop();

      return () => subscription.remove();
    }
  };

  const reset = () => {
    setMaxValues({
      maxX: 0,
      maxY: 0,
      maxZ: 0,
    });
    setData({ x: 0, y: 0, z: 0 });
  };

  // Nettoyer l'abonnement au démontage du composant 
  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>G-Force</Text>
      <Text>x: {x.toFixed(2)}</Text>
      <Text>y: {y.toFixed(2)}</Text>
      <Text>z: {z.toFixed(2)}</Text>

      <Text style={styles.text}>Max : </Text>
      
      <Text>x: {maxValues.maxX.toFixed(2)}</Text>
      <Text>y: {maxValues.maxY.toFixed(2)}</Text>
      <Text>z: {maxValues.maxZ.toFixed(2)}</Text>

      <Animated.View style={[
        styles.ball, 
        {
          transform: 
          [
            { translateX: posX },
            { translateY: posY },
          ],
        }
      ]}/>

      <Button title="Start" onPress={start}></Button>
      <Button title="Stop" onPress={stop}></Button>
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
    borderRadius: 25,
  }



});