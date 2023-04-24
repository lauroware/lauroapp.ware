import React, { useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";

export default function App() {
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleAddButton = () => {
    setListItems([...listItems, newItem]);
    setNewItem("");
  };

  const handleClearButton = () => {
    setListItems([]);
  };

  useEffect(() => {
    console.log(listItems);
  }, [listItems]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={{ flex: 1 }} backgroundColor="grey">
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("./assets/carrito.png")}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}> LISTA DE COMPRA</Text>
          <View style={styles.inicio}>
            <TextInput
              placeholder="Productos"
              style={styles.input}
              value={newItem}
              onChangeText={(text) => setNewItem(text)}
            />
            <Button
              title="Agregar"
              onPress={() => {
                if (newItem.trim() !== "") {
                  handleAddButton();
                }
              }}
            />
          </View>
          {listItems.length > 0 && (
            <Text style={{ backgroundColor: "grey", fontSize: 30 }}>
              {" "}
              ELEMENTOS AGREGADOS:
            </Text>
          )}

          <FlatList
            data={listItems}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{item}</Text>
                <Button
                  title="x"
                  onPress={() => {
                    const newListItems = listItems.filter(
                      (listItem) => listItem !== item
                    );
                    setListItems(newListItems);
                  }}
                  color="red"
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      {listItems.length > 0 ? (
        <Button
          title="Eliminar todos los elementos"
          onPress={handleClearButton}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inicio: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "black",
    width: 300,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 25,
  },
});
