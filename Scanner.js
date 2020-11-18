
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Scanner extends React.Component 
{
    constructor()
    {
      super();
      this.state = {
        hasCameraPermissions : null,
        dataSlip : '',
        clicked : false,
        scanned : false,
      }
    }

    getCameraPermissions = async (id) => 
    {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
  
        console.log(this.state.clicked);
    
        this.setState({
          hasCameraPermissions : status === 'granted',
          clicked : id,
          scanned : false,
        })
   }

   handleBarCodeScanned = async ({type, data}) =>
   {
       this.setState({
         scanned: true,
         dataSlip : data,
         clicked : false,
       });
   }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const clicked = this.state.clicked;

      if (clicked && hasCameraPermissions)
      {
        return(
          <BarCodeScanner
            onBarCodeScanned = { scanned ? undefined : this.handleBarCodeScanned }
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (clicked === false){
        return(
          <View style={styles.container}>

          <Image style = {styles.img} source = {require('./assets/logo.png')}/>

          <Text style={styles.displayText}>
            { hasCameraPermissions ? this.state.scannedData : "Request Camera Permission" }
          </Text>     

          <TouchableOpacity
            onPress = { this.getCameraPermissions }
            style = { styles.scanButton }>
            <Text style = { styles.buttonText }>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign : 'center',
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 50,
    },
    buttonText:{
      fontSize: 20,
    },
    img: {
      width : 100,
      height : 100,
      margin : 10,
    }
  });
