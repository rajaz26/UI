import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Vibration } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import { COLORS } from '../assets/theme';

export default function Scan() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isScanning, setIsScanning] = React.useState(false);
  const [scannedBarcodes, setScannedBarcodes] = React.useState([]); 
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes(
    [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.CODE_39,
      BarcodeFormat.CODE_128,

    ],
    {
      checkInverted: true,
    }
  );

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const toggleScanning = () => {
    setIsScanning((prevState) => !prevState);
  };

  const showScannedBarcodes = () => {
    const alertMessage = `SCANNED PRODUCTS:\n${scannedBarcodes.join(', ')}`;
    alert(alertMessage);
  };

  const handleBarcodeScanned = (barcode) => {
    if (!isScanning) {
      return; 
    }

    setIsScanning(false); 
    setScannedBarcodes((prevBarcodes) => [...prevBarcodes, barcode.displayValue]);

    // Vibration.vibrate();
  };

  
  React.useEffect(() => {
    barcodes.forEach(handleBarcodeScanned);
  }, [barcodes]);

  return (
    device != null &&
    hasPermission && (
      <View style={styles.container}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isScanning}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        <TouchableOpacity
          onPress={toggleScanning}
          style={[
            styles.scanButton,
            isScanning ? styles.continueButton : styles.startButton,
          ]}>
          <Text
            style={[
              styles.buttonText,
              isScanning && styles.continueButtonText, 
          ]}>
            {isScanning ? 'Continue Scanning' : 'Start Scanning'}
          </Text>
        </TouchableOpacity>
        {scannedBarcodes.length > 0 && (
          <TouchableOpacity
            onPress={showScannedBarcodes}
            style={styles.showButton}>
            <Text style={styles.buttonTextShow}>Show Scanned Barcodes</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
  scanButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 30,
    right: 5,
    borderRadius: 10,
  },
  startButton: {
    backgroundColor: COLORS.primary,
  },
  continueButton: {
    backgroundColor: COLORS.secondary,
  },
  continueButtonText: {
    color: COLORS.primary, 
  },
  showButton: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    left: 5,
    borderRadius: 10, 
  },
  buttonText: {
    color: 'white',
    top: 2,
    fontFamily: 'Poppins-Regular', 
  },
  buttonTextShow: {
    color: COLORS.primary,
    top: 2,
    fontFamily: 'Poppins-Regular',
  },
});
