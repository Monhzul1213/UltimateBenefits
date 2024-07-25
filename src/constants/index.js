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
  bonus,
  phone,
  lunch, 
  bday,
  gym,
  add_card,
  volleyball,
  hands,
  movie,
  people,
  dotka,
  AddClubs,
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
  { title: "Сургалтын материал", icon: learning, route: "/training" },
  { title: "Хөнгөлөлт урамшуулал", icon: discounts, route: "/discounts" },
  { title: "Нийгмийн хангамж", icon: care, route: "/care" },
  { title: "Сонирхлын клуб", icon: clubs, route: "/clubs" },
  { title: "Ажилтнууд", icon: clubs, route: "/employees" },
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
    description:
      "hjdsa hjaks hsdajkdh ajkshdjksah kjdsah jskahdjkashd kjsahd akjshd kajshd ksajdhjkashdjkas hdjksa hdjksa hjksahdajks hjksah dhd ashdkj asdhkjsa jk hajkshdkjas hdjk as hdsjahdkas hdjkasdhjaksh jkashd jkashd jksa",
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

export const userCalendarItems = {
  userID: "УО03300910",
  calendarItems: [
    {
      title: "My birthday",
      date: "2024-10-09",
      color: "blue",
    },
    {
      title: "Today test",
      date: "2024-06-27",
      color: "blue",
    },
    {
      title: "Today test",
      date: "2024-06-27",
      color: "green",
    },
    {
      title: "Today test",
      date: "2024-06-27",
      color: "red",
    },
    {
      title: "Camp",
      date: "2024-06-28",
      color: "red",
    },
    {
      title: "Election Day",
      date: "2024-06-28",
      color: "blue",
    },
    {
      title: "Salary",
      date: "2024-07-01",
      color: "green",
    },
    {
      title: "Хурал 14:00",
      date: "2024-07-02",
      color: "red",
    },
    {
      title: "Salary",
      date: "2024-07-16",
      color: "green",
    },
    {
      title: "My birthday",
      date: "2024-10-09",
      color: "blue",
    },
  ],
};

export const learnVideos = [
  {
    author: "Г.ҮЛЭМЖЖАРГАЛ",
    title: "ХӨДӨЛМӨРИЙН ДОТООД ЖУРАМ",
    url: "https://www.youtube.com/embed/0QXj4ZfZ1Z",
  },
  {
    author: "Г.ҮЛЭМЖЖАРГАЛ",
    title: "СТРЕССЭЭ УДИРДАХ НЬ",
    url: "https://www.youtube.com/embed/0QXj4ZfZ1Z",
  },
  {
    author: "Г.ҮЛЭМЖЖАРГАЛ",
    title: "TIME MANAGEMENT",
    url: "https://www.youtube.com/embed/0QXj4ZfZ1Z",
  },
  {
    author: "Г.ҮЛЭМЖЖАРГАЛ",
    title: "EQ СЭТГЭЛ ХӨДЛӨЛИЙН ЧАДАМЖ",
    url: "https://www.youtube.com/embed/0QXj4ZfZ1Z",
  },
  {
    author: "Г.ҮЛЭМЖЖАРГАЛ",
    title: "АЛБАН МЭЙЛ ИЛГЭЭХ",
    url: "https://www.youtube.com/embed/0QXj4ZfZ1Z",
  },
  {
    author: "Г.ҮЛЭМЖЖАРГАЛ",
    title: "Бүртгэл хийх",
    url: "https://www.youtube.com/embed/0QXj4ZfZ1Z",
  }]
export const discountsi = [
  {
    title:"ШИЛДЭГ АЖИЛТНЫ УРАМШУУЛАЛ",
    description: "Сар бүрийн АГҮ-р тэргүүлсэн алба бүрийн 1 шилдэг ажилтан 300,000₮",
    images: [bonus] 
  },
  {
    title:"УТАСНЫ ТӨЛБӨР",
    description: "Байгууллагын дугаар ашигладаг албан тушаалтнуудын утасны төлбөрийн хөнгөлөлт",
    images: [phone] 
  },
  {
    title:"АМТ ЧАНАРТАЙ ӨДРИЙН ХООЛ",
    description: "Өдрийн сет хоол-Өдрийн хоолны төлбөрийн 40%-ийг байгууллагаас хөнгөлнө",
    images: [lunch] 
  },
  {
    title: " ЦАЛИНТАЙ ЧӨЛӨӨ",
    description: "   ",
    images: [bday] 
  },
  {
    title: "ФИТНЕССИЙН ЭРХ",
    description: "3 сар дарааллан Сарын шилдэг ажилтан болсон тохиолдолд Gold's gym 3 сарын эрх",
    images: [gym] 
  },
  {
    description: "           ",
    images: [add_card]
  }
];
  
  export const clubsItems = [
    {
      title: "MOVIE NIGHT",
      Image : movie,
      altText: "Movie Club Image",
      description: "Join our Movie Club to watch Netflix and discuss great films together!",
      members: [
        { name: "John Doe", position: "President", company: "UltimateSOlution", telephone: "99999999" }
      ],
      fbLink: "https://www.facebook.com/groups/329454226106597",
      icon: "path/to/movie-club-icon.png",
      category: "Entertainment"
    },
    {
      title: "ENGLISH CLUB",
      Image : hands,
      altText: "Movie Club Image",
      description: "Англи хэлний мэдлэгээ сайжруулах, бусадтай санаа бодлоо солилцох зорилгоор 7 хоног бүрийн Мягмар гарагийн 08:30 цагт",
      members: [
        { name: "John Doe", position: "President", company: "UltimateSOlution", telephone: "99999999" }
      ],
      fbLink: "https://www.facebook.com/groups/329454226106597",
      icon: "path/to/movie-club-icon.png",
      category: "Entertainment"

    },
    {
      title: "ADVENTURE CLUB",
      Image : people,
      altText: "Movie Club Image",
      description: "Join our Movie Club to watch and discuss great films together!",
      members: [
        { name: "Ulemjjargal", position: "HR", company: "UltimateSOlution", telephone: "99059766" },
        {name: "Enerel", position: "MANAGER", company: "MEP", Contact: "99055489"}
      ],
      fbLink: "https://www.facebook.com/groups/329454226106597",
      icon: "path/to/movie-club-icon.png",
      category: "Entertainment"
    },
    {
      title: "SPORT CLUB",
      Image : volleyball,
      altText: "Movie Club Image",
      description: "Өсвөрийн зохион бүтээгчдийн ахлах сургуулиын спорт зааланд 7 хоног бүрийн Пүрэв гарагийн 19:00-21.00 цагийн хооронд",
      members: [
        { name: "John Doe", position: "President", company: "UltimateSOlution", telephone: "99999999" }
      ],
      fbLink: "https://www.facebook.com/groups/329454226106597",
      icon: "path/to/movie-club-icon.png",
      category: "Entertainment"
    },
    {
    title: "E-SPORT CLUB",
    Image : dotka,
    altText: "Movie Club Image",
    description: "E-sport-д сонирхолтой хэн ч нэгдэх боломжтой ",
    members: [
      { name: "John Doe", position: "CEE", company: "UltimateSolutions", telephone: "99999999" }
    ],
    fbLink: "https://www.facebook.com/groups/329454226106597",
    icon: "path/to/movie-club-icon.png",
    category: "Entertainment"
    },
    {
     description : "Border",
     Image: AddClubs
    },

    
  ]
