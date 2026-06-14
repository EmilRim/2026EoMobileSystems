import React from "react";
import { View, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { fetchProductByBarcode } from "../services/openFoodFactsService";


interface Props {
  setScannedProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      brand: string;
    } | null>
  >;
}

export default function BarcodeScannerScreen({
  setScannedProduct,
}: Props) {
  const [permission, requestPermission] = useCameraPermissions();

  const navigation = useNavigation<any>();

  const scanningRef = React.useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      scanningRef.current = false;
    }, [])
  );

  const handleBarcodeScanned = async ({ data }: { data: string }) => {
  if (scanningRef.current) return;

  scanningRef.current = true;

  try {
    const product = await fetchProductByBarcode(data);

    if (!product) {
      navigation.navigate("Add Ingredient");
      return;
    }

    setScannedProduct(product);

    navigation.navigate("Add Ingredient");
  } catch (error) {
    console.log(error);
    navigation.navigate("Add Ingredient");
  }
};

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
    return <Text>Camera permission required</Text>;
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{
        barcodeTypes: ["ean13", "ean8", "upc_a"],
      }}
      onBarcodeScanned={handleBarcodeScanned}
    />
  );
}