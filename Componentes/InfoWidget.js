import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const InfoWidget = ({ icon, label, value }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} size={40} color="blue" />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{label}</Text>
        <Text style={{ fontSize: 14 }}>{value}</Text>
      </View>
    </View>
  );
};

export default InfoWidget;
