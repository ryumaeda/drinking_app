import React from "react";
import { TouchableOpacity, Text } from "react-native";
import thinkGame from "../lib/thinkGame";

const HandleThinkGameButton = ({
  navigation,
  members,
  gameRequest,
  buttonText,
}) => {
  const handleThinkGame = async () => {
    const content = `
以下に沿った飲みゲームを考えてください。
・#メンバー、#要望に記載があれば その内容を反映してください。
・#要望に特に記載が無ければ、サイコロやトランプ等の準備物が不要なゲームを考えてください。
・「タイトル:」「ルール:」の形式で500文字以内で記載してください。
・項番をつけて具体的なルールを記載してください。
・注意書き等のタイトル、ルール以外の内容は一切記載しないでください。
#メンバー
${members
  .map((member) => `名前: ${member.name}, 性別: ${member.gender}`)
  .join("\n")}
#要望
${gameRequest}
    `;
    const response = await thinkGame(content);
    navigation.navigate("ThinkingGameResult", {
      gameResponse: response,
      members: members,
      gameRequest: gameRequest,
    });
  };

  return (
    <TouchableOpacity
      className="bg-gray-800 rounded-lg p-2 m-2 mt-5"
      onPress={handleThinkGame}
    >
      <Text className="text-white font-bold text-center">{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default HandleThinkGameButton;
