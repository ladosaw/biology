export const menuItems = [
  { id: "home", label: "Home", path: "/" },
  {
    id: "lessons",
    label: "Lessons",
    path: "/lessons",
    submenu: [
      { label: "Meiosis", path: "/lessons/meiosis" },
      { label: "Digestive System 1", path: "/lessons/digestive-system-1" },
      { label: "Mendelian Genetics", path: "/lessons/mendelian-genetics" },
      { label: "Stages of Mitosis", path: "/lessons/stages-of-mitosis" },
    ],
  },
  { id: "about", label: "About", path: "/about" },
  { id: "admin", label: "Admin", path: "/admin" },
  { id: "student", label: "Score", path: "/user-score" },
  { id: "ranking", label: "Ranking", path: "/ranking" },
];
