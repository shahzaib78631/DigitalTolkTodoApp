import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SwipeableFlatList } from "react-native-swipeable-flat-list";

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SwipeContainer = ({icon, isLeft, onPress }) => 
{
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={isLeft ? styles.swipeLeftContainer : styles.swipeRightContainer}>
        {icon}
      </View>
    </TouchableOpacity>
  )
}

const AppSwipeableList = ({data = [], renderItem, handleDelete = () => {}, handleEdit = () => {}}) => {

  const threshold = 0.25;

  
  return (
      <View >
        <SwipeableFlatList 
          threshold={threshold}
          data={data}
          keyExtractor={(item) => item?.id}
          itemSeperatorComponent={() => <View style={{paddingBottom: 10}} />}
          renderItem={({item}) => <View style={{height: 65, width: "85%"}}>{renderItem(item)}</View>}
          renderRight=
          {
            ({item}) => 
            <View style={{width: 60}}>
              <SwipeContainer onPress={() => handleDelete(item)} isLeft={true} icon={<Ionicons name="ios-trash-outline" size={24} color="white" />} />
            </View>
          }
          renderLeft=
          {
            ({item}) => 
            <View style={{width: 60}}>
              <SwipeContainer onPress={() => handleEdit(item)} isLeft={false} icon={<MaterialCommunityIcons name="pencil-outline" size={24} color="white" />} />
            </View>
          }
        />
      </View>
  );
}

export default AppSwipeableList; 

const styles = StyleSheet.create({
  swipeLeftContainer:
  {
    height: 60,
    width: 60,
    backgroundColor: "#FF3B30",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  swipeRightContainer:
  {
    height: 60,
    width: 60,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  }
})