import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const memberList = {
  name: "Group10: 10/10",
  members: [
    { name: "Nguyễn Ngọc Tiến", type: "Mentee" },
    { name: "Phạm Nguyễn Hữu Thịnh", type: "Mentee" },
    { name: "Trần Quang Trà", type: "Mentee" },
    { name: "Trần Minh Tâm", type: "Mentee" },
    { name: "Nguyễn Vương Thùy Ngân", type: "Leader" },
    // { name: "Nguyễn Lê Hà Xuyên", type: "Mentee" },
    // { name: "Nguyễn Thế Luân", type: "Mentee" },
  ],
};

export const memType = [
  {
    heading: "Loại",
    member: [
      { label: "Mentee", value: "Mentee" },
      { label: "Mentor", value: "Mentor" },
      { label: "Leader", value: "Leader" },
    ],
  },
];
