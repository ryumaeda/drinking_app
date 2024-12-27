import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import thinkGame from "../lib/thinkGame";
import HandleThinkGameButton from "./HandleThinkGameButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// ナビゲーションの型定義を追加
type RootStackParamList = {
  ThinkingGame: {
    thinkFlag: boolean;
    addFlag: boolean;
    isMoving: boolean;
  };
  ThinkingGameResult: {
    gameResponse: string;
    members: any[];
    gameRequest: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GameResultScreen = ({ route }: { route: any }) => {
  const { gameResponse, members, gameRequest } = route.params;
  const [temp_title, rules] = gameResponse.split(/ルール[:：]/);
  const title = temp_title.replace(/タイトル[:：]/, "").replace(/\n/g, "");
  const [animation] = useState(new Animated.ValueXY({ x: 30, y: 700 }));
  const navigation = useNavigation<NavigationProp>();

  const handleBackPress = () => {
    navigation.navigate("ThinkingGame", {
      thinkFlag: false,
      addFlag: false,
      isMoving: false,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: animation.getTranslateTransform() },
        ]}
      >
        <MaterialCommunityIcons name="emoticon-happy" size={100} color="gray" />
      </Animated.View>

      <Text className="text-xl font-bold mt-8 mb-3 mx-4">タイトル</Text>
      <View className="p-2 bg-gray-50 rounded-lg shadow">
        <Text className="text-xl text-gray-800">{title}</Text>
      </View>
      <Text className="text-xl font-bold mt-4 mb-3 mx-4">ルール</Text>
      <View className=" bg-gray-50 rounded-lg shadow pb-7 px-4">
        <Text className="text-l text-gray-800">{rules}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 720, //なぜHomescreenの絶対値と値が変わってしまうのか不明
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
      <View className="items-center mt-5">
        <HandleThinkGameButton
          navigation={navigation}
          members={members}
          gameRequest={gameRequest}
          buttonText="なんか違う、もう一度考えて"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
  },
});

export default GameResultScreen;
