import React, { useState } from "react";
import {
  View,
  Button,
  Animated,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const App = () => {
  const [animation] = useState(new Animated.ValueXY({ x: 145, y: 360 }));
  const [moved, setMoved] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberGender, setNewMemberGender] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);

  const moveIcon = () => {
    Animated.timing(animation, {
      toValue: { x: 30, y: 700 },
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setMoved(true);
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
      setMoved(false);
      setIsMoving(false);
    });
  };

  const addMember = () => {
    setShowAddMember(true);
  };

  const saveMember = () => {
    setMembers([...members, { name: newMemberName, gender: newMemberGender }]);
    setShowAddMember(false);
    setNewMemberName("");
    setNewMemberGender("");
  };

  return (
    <SafeAreaView className="flex-1">
      {/* アニメーションのアイコンは絶対座標で表示 */}
      <Animated.View
        style={[
          styles.iconContainer,
          { transform: animation.getTranslateTransform() },
        ]}
      >
        <Icon name="emoticon-happy" size={100} color="#4CAF50" />
      </Animated.View>

      {/* 初期画面の上部にメンバーリストを表示 */}
      {!moved && (
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

      {/* think gameボタン押下後 */}
      <View className="">
        {moved && !isMoving ? (
          <View>
            <View>
              <Text className="ml-10 mt-20 text-xl font-bold">＃メンバー</Text>
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
          </View>
        ) : null}
      </View>

      {/* 初期画面のボタン */}
      <View className="flex-1 justify-center items-center mt-40">
        {!moved && !isMoving ? (
          <>
            <Button title="add member" onPress={addMember} />
            <Button title="think game" onPress={moveIcon} />
          </>
        ) : null}
      </View>
      <View className="">
        {moved && !isMoving ? (
          <View>
            <View className="mb-10">
              <Button title="戻る" onPress={resetIcon} />
            </View>
          </View>
        ) : null}
      </View>

      {/* メンバー追加画面 */}
      {showAddMember && (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-white justify-center items-center">
          <TextInput
            className="h-10 border border-gray-400 mx-4 my-2 p-10 bg-white shadow-lg"
            placeholder="名前"
            value={newMemberName}
            onChangeText={setNewMemberName}
          />
          <TextInput
            className="h-10 border border-gray-400 mx-4 my-2 p-10 bg-white shadow-lg"
            placeholder="性別"
            value={newMemberGender}
            onChangeText={setNewMemberGender}
          />
          <Button title="保存" onPress={saveMember} />
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
