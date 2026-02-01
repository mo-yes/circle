// utils/userUtils.js
import defaultAvatar from "../assets/default-profile.png";

export function getUserPhoto({user}) {
  // Check if user.photo is defined and does not include "undefined"
  return user?.photo && !user.photo.includes("undefined") ? user.photo : defaultAvatar;
}
