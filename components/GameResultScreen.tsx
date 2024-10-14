import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const GameResultScreen = ({ route }: { route: any }) => {
  const { gameResponse } = route.params;
  const [temp_title, rules] = gameResponse.split(/ルール[:：]/);
  const title = temp_title.replace(/タイトル[:：]/, "").replace(/\n/g, "");
  const [animation] = useState(new Animated.ValueXY({ x: 30, y: 600 }));
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("ThinkingGame", {
      thinkFlag: false,
      addFlag: false,
      isMoving: false,
    });
  };

  const styles = StyleSheet.create({
    iconContainer: {
      position: "absolute",
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: animation.getTranslateTransform() },
        ]}
      >
        <Icon name="emoticon-happy" size={100} color="gray" />
      </Animated.View>

      <Text className="text-xl font-bold my-3 mx-4">タイトル</Text>
      <View className="p-5 bg-gray-50 rounded-lg shadow">
        <Text className="text-xl text-gray-800">{title}</Text>
      </View>
      <Text className="text-xl font-bold mt-8 mb-3 mx-4">ルール</Text>
      <View className="p-5 bg-gray-50 rounded-lg shadow">
        <Text className="text-base text-gray-800">{rules}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 405,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          className="bg-black rounded-lg p-2 m-2"
          onPress={handleBackPress}
        >
          <Text className="text-white font-bold">戻る</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GameResultScreen;
