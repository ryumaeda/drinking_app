import React, { useState } from "react";
import { View, Button, Animated, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const App = () => {
  const [animation] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [moved, setMoved] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const moveIcon = () => {
    setIsMoving(true);
    Animated.timing(animation, {
      toValue: { x: -100, y: 300 },
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setMoved(true);
      setIsMoving(false);
    });
  };

  const resetIcon = () => {
    setIsMoving(true);
    Animated.timing(animation, {
      toValue: { x: 0, y: 0 },
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setMoved(false);
      setIsMoving(false);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Animated.View style={{ transform: animation.getTranslateTransform() }}>
        <Icon name="emoticon-happy" size={100} color="#4CAF50" />
      </Animated.View>
      {!moved && !isMoving ? (
        <Button title="ゲームを考えて" onPress={moveIcon} />
      ) : moved && !isMoving ? (
        <View>
          <View className="mb-5">
            <Text className="text-lg font-bold">＃メンバー</Text>
            <Text>けんと　かなこ　ゆうま　あかり　じん</Text>
          </View>
          <View className="absolute bottom-5 right-5">
            <Button title="戻る" onPress={resetIcon} />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default App;
