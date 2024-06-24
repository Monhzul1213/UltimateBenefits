import { type } from "@testing-library/user-event/dist/type";
import {
  car,
  care,
  careers,
  clubs,
  discounts,
  giveGift,
  heartbeat,
  house,
  learning,
  rules,
  umbrella,
  vaccine,
} from "../assets";

export const alphabets = [
  { label: "А", value: "А" },
  { label: "Б", value: "Б" },
  { label: "В", value: "В" },
  { label: "Г", value: "Г" },
  { label: "Д", value: "Д" },
  { label: "Е", value: "Е" },
  { label: "Ё", value: "Ё" },
  { label: "Ж", value: "Ж" },
  { label: "З", value: "З" },
  { label: "И", value: "И" },
  { label: "Й", value: "Й" },
  { label: "К", value: "К" },
  { label: "Л", value: "Л" },
  { label: "М", value: "М" },
  { label: "Н", value: "Н" },
  { label: "О", value: "О" },
  { label: "Ө", value: "Ө" },
  { label: "П", value: "П" },
  { label: "Р", value: "Р" },
  { label: "С", value: "С" },
  { label: "Т", value: "Т" },
  { label: "У", value: "У" },
  { label: "Ү", value: "Ү" },
  { label: "Ф", value: "Ф" },
  { label: "Х", value: "Х" },
  { label: "Ц", value: "Ц" },
  { label: "Ч", value: "Ч" },
  { label: "Ш", value: "Ш" },
  { label: "Щ", value: "Щ" },
  { label: "Ъ", value: "Ъ" },
  { label: "Ы", value: "Ы" },
  { label: "Ь", value: "Ь" },
  { label: "Э", value: "Э" },
  { label: "Ю", value: "Ю" },
  { label: "Я", value: "Я" },
];

export const benefits = [
  { title: "Дүрэм журам", icon: rules, route: "/rules" },
  { title: "Карьер хөгжил", icon: careers, route: "/careers" },
  { title: "Сургалтын материал", icon: learning, route: "/learning" },
  { title: "Хөнгөлөлт урамшуулал", icon: discounts, route: "/discounts" },
  { title: "Нийгмийн хангамж", icon: care, route: "/care" },
  { title: "Сонирхлын клуб", icon: clubs, route: "/clubs" },
];

export const cares = [
  {
    icon: umbrella,
    title: "АЖИЛТНЫ ХУВИЙН ЭРҮҮЛ МЭНДИЙН ДААТГАЛ",
    description:
      "1 с дээш жил ажилласан ажилтнуудыг хувийн эрүүл мэндийн даатгалд хамруулан, 50 хувийн хураамжийг байгууллага төлнө",
    type: "available",
  },
  {
    icon: heartbeat,
    title: "УРЬДЧИЛАН СЭРГИЙЛЭХ ҮЗЛЭГ, ШИНЖИЛГЭЭ",
    description: "",
    type: "used",
  },
  {
    icon: vaccine,
    title: "ВАКЦИНЖУУЛАЛТ",
    description: "",
    type: "available",
  },
  {
    icon: house,
    title: "ОРОН СУУЦНЫ УРЬДЧИЛГАА",
    description: "",
    type: "unavailable",
  },
  {
    icon: car,
    title: "БАЙГУУЛЛАГЫН МАШИН",
    description: "",
    type: "available",
  },
  {
    icon: giveGift,
    title: "БҮТЭЭГДЭХҮҮН, ҮЙЛЧИЛГЭЭ",
    description: "",
    type: "available",
  },
];
