import { floor, random } from "lodash";
import { avatarColors } from "./static.data";

export function getAvatarColor() {
  return avatarColors[floor(random(0.9) * avatarColors.length)];
}

export function generateAvatar(text, bacgroundColor, foregroundColor = "#fff") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 200;
  canvas.height = 200;
  canvas.fillStyle = bacgroundColor;

  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "normal 80px sans-serif";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
}
