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
  const [flagThink, setflagThink] = useState(false);
  const [flagAdd, setflagAdd] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberGender, setNewMemberGender] = useState("");

  const moveToThinking = () => {
    Animated.timing(animation, {
      toValue: { x: 30, y: 700 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setflagThink(true);
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
      setflagThink(false);
      setflagAdd(false);
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
      setflagAdd(true);
      setIsMoving(false);
    });
  };

  const setMember = () => {
    setMembers([...members, { name: newMemberName, gender: newMemberGender }]);
    setNewMemberName("");
    setNewMemberGender("");
    setflagAdd(false);
    Animated.timing(animation, {
      toValue: { x: 145, y: 360 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setflagThink(false);
      setIsMoving(false);
    });
  };

  const closeAddMember = () => {
    setflagAdd(false);
    Animated.timing(animation, {
      toValue: { x: 145, y: 360 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setflagThink(false);
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
        <Icon name="emoticon-happy" size={100} color="#4CAF50" />
      </Animated.View>

      {/* 初期画面*/}
      {!flagThink && !flagAdd && (
        <View className="ml-10 mt-10 flex flex-wrap flex-row">
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
      <View className="flex-1 justify-center items-center mt-40">
        {!flagThink && !isMoving ? (
          <>
            <Button title="add member" onPress={addMember} />
            <Button title="think game" onPress={moveToThinking} />
          </>
        ) : null}
      </View>

      {/* think画面(ゲームを考案させる) */}
      {flagThink && !isMoving ? (
        <View>
          <View className="mb-96">
            <View>
              <Text className="text-xl ml-10 font-bold">＃メンバー</Text>
              <Text className="text-lg ml-10">
                {members.map((member, index) => (
                  <Text key={index}>
                    {member.name} ({member.gender}){" "}
                  </Text>
                ))}
              </Text>
            </View>
            <View>
              <Text className="ml-10 mt-20 text-xl font-bold">
                ＃要望 　　※もしあれば！
              </Text>
              <TextInput
                className="h-10 border border-gray-400 mx-4 my-2 p-10 bg-white shadow-lg"
                placeholder="とにかく盛り上がるやつ"
              />
            </View>
            <View className="mt-72">
              <Button title="戻る" onPress={resetIcon} />
            </View>
          </View>
        </View>
      ) : null}

      {/* add画面(メンバーを追加する) */}
      {flagAdd && !isMoving ? (
        <View>
          <View className="mb-96">
            <View>
              <TextInput
                className="h-10 border border-gray-400 mx-4 my-2 p-10 bg-white shadow-lg"
                placeholder="名前"
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
            <Button title="保存" onPress={setMember} />
            <View className="mt-80">
              <Button title="戻る" onPress={resetIcon} />
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
  },
});

export default App;
