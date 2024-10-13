import React, { useState } from "react";
import {
  View,
  Button,
  Animated,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const App = () => {
  const [animation] = useState(new Animated.ValueXY({ x: 145, y: 360 }));
  const [thinkFlag, setthinkFlag] = useState(false);
  const [addFlag, setaddFlag] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberGender, setNewMemberGender] = useState("");

  const moveToThinking = () => {
    setIsMoving(true);
    Animated.timing(animation, {
      toValue: { x: 30, y: 700 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setthinkFlag(true);
      setIsMoving(false);
    });
  };

  const resetIcon = () => {
    setIsMoving(true);
    Animated.timing(animation, {
      toValue: { x: 145, y: 360 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setthinkFlag(false);
      setaddFlag(false);
      setIsMoving(false);
    });
  };

  const addMember = () => {
    setIsMoving(true);
    Animated.timing(animation, {
      toValue: { x: 30, y: 700 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setaddFlag(true);
      setIsMoving(false);
    });
  };

  const setMember = () => {
    setMembers([...members, { name: newMemberName, gender: newMemberGender }]);
    setNewMemberName("");
    setNewMemberGender("");
    setaddFlag(false);
    Animated.timing(animation, {
      toValue: { x: 145, y: 360 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setthinkFlag(false);
      setIsMoving(false);
    });
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Icon (絶対座標で表示)*/}
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: animation.getTranslateTransform() },
        ]}
      >
        <Icon name="emoticon-happy" size={100} color="gray" />
      </Animated.View>

      {/* 初期画面*/}
      {!thinkFlag && !addFlag && (
        <View className="ml-4 mt-10 flex flex-wrap flex-row h-1/4">
          {members.map((member, index) => (
            <View
              key={index}
              className={`p-2 mb-1 w-[30%] ${
                index % 3 === 2 ? "" : "mr-[3.33%]"
              } items-center ${
                member.gender === "男" ? "bg-blue-500" : "bg-pink-500"
              }`}
            >
              <Text
                className="text-white font-bold "
                onPress={() => {
                  setMembers(members.filter((_, i) => i !== index));
                }}
              >
                {member.name}
              </Text>
            </View>
          ))}
        </View>
      )}
      {!thinkFlag && !addFlag && !isMoving && (
        <View className="flex-1 justify-center items-center mt-40">
          <>
            <TouchableOpacity
              className="bg-gray-800 rounded-lg p-2 m-2"
              onPress={addMember}
            >
              <Text className="text-white font-bold">飲みメンバー追加</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-800 rounded-lg p-2 m-2"
              onPress={moveToThinking}
            >
              <Text className="text-white font-bold">ゲームを考えて</Text>
            </TouchableOpacity>
          </>
        </View>
      )}

      {/* think画面(ゲームを考案させる) */}
      {thinkFlag && (
        <View className="ml-4 mt-10 flex flex-wrap flex-row h-1/4">
          {members.map((member, index) => (
            <View
              key={index}
              className={`p-2 mb-1 w-[30%] ${
                index % 3 === 2 ? "" : "mr-[3.33%]"
              } items-center ${
                member.gender === "男" ? "bg-blue-500" : "bg-pink-500"
              }`}
            >
              <Text
                className="text-white font-bold "
                onPress={() => {
                  setMembers(members.filter((_, i) => i !== index));
                }}
              >
                {member.name}
              </Text>
            </View>
          ))}
        </View>
      )}
      {thinkFlag && !isMoving && (
        <View>
          <View>
            <Text className="ml-10 text-xl font-bold">
              ゲームの要望はあるかい？
            </Text>
            <TextInput
              className="mt-5 h-36 border border-gray-400 p-2 mx-4 bg-white shadow-lg rounded-lg"
              placeholder="無ければ空白でOK!"
              placeholderTextColor="#999"
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: 438,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              className="bg-gray-800 rounded-lg p-2 m-2"
              onPress={resetIcon}
            >
              <Text className="text-white font-bold text-center">戻る</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* add画面(メンバーを追加する) */}
      {addFlag && (
        <View className="ml-4 mt-10 flex flex-wrap flex-row h-1/4">
          {members.map((member, index) => (
            <View
              key={index}
              className={`p-2 mb-1 w-[30%] ${
                index % 3 === 2 ? "" : "mr-[3.33%]"
              } items-center ${
                member.gender === "男" ? "bg-blue-500" : "bg-pink-500"
              }`}
            >
              <Text
                className="text-white font-bold "
                onPress={() => {
                  setMembers(members.filter((_, i) => i !== index));
                }}
              >
                {member.name}
              </Text>
            </View>
          ))}
        </View>
      )}
      {addFlag && !isMoving && (
        <View>
          <View>
            <Text className="ml-10 text-xl font-bold">
              メンバーの名前と性別はなんだい？
            </Text>
            <View className="mt-5">
              <TextInput
                className="h-10 border border-gray-400 mx-4 my-2 p-2 bg-white shadow-lg rounded-full"
                placeholder="名前"
                placeholderTextColor="#999"
                value={newMemberName}
                onChangeText={setNewMemberName}
              />
            </View>
            <View className="flex-row mx-4 my-2">
              <TouchableOpacity
                className={`flex-1 h-10 justify-center items-center ${
                  newMemberGender === "男" ? "bg-blue-500" : "bg-gray-200"
                }`}
                onPress={() => setNewMemberGender("男")}
              >
                <Text
                  className={`${
                    newMemberGender === "男" ? "text-white" : "text-black"
                  }`}
                >
                  男
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 h-10 justify-center items-center ${
                  newMemberGender === "女" ? "bg-pink-500" : "bg-gray-200"
                }`}
                onPress={() => setNewMemberGender("女")}
              >
                <Text
                  className={`${
                    newMemberGender === "女" ? "text-white" : "text-black"
                  }`}
                >
                  女
                </Text>
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <TouchableOpacity
                className="bg-black rounded-lg p-2 m-2"
                onPress={setMember}
                disabled={!newMemberName.trim()}
              >
                <Text className="text-white font-bold">追加</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              top: 438,
              left: 0,
              right: 0,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              className="bg-black rounded-lg p-2 m-2"
              onPress={resetIcon}
            >
              <Text className="text-white font-bold">戻る</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
  },
});

export default App;
