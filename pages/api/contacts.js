import { dotCase } from "change-case";
import { sample } from "lodash";
import mockData from "/src/utils/mock-data";

const contacts = [...Array(20)].map((_, index) => ({
  id: mockData.id(index),
  name: mockData.name.fullName(index),
  username:
    mockData.name.fullName(index) && dotCase(mockData.name.fullName(index)),
  avatar: mockData.image.avatar(index),
  address: mockData.address.fullAddress(index),
  phone: mockData.phoneNumber(index),
  email: mockData.email(index),
  lastActivity: mockData.time(index),
  status: sample(["online", "offline", "away", "busy"]) || "online",
  position: mockData.role(index),
}));

export default (req, res) => {
  res.status(200).json({ contacts });
};
