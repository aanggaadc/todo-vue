export const priorityOptions = [
  {
    value: "very-high",
    label: "Very High",
  },
  {
    value: "high",
    label: "High",
  },
  {
    value: "normal",
    label: "Medium",
  },
  {
    value: "low",
    label: "Low",
  },
  {
    value: "very-low",
    label: "Very Low",
  },
];

export const colorPriorityMap: { [key: string]: string } = {
  "very-high": "bg-[#ED4C5C]",
  high: "bg-[#F8A541]",
  normal: "bg-[#00A790]",
  low: "bg-[#428BC1]",
  "very-low": "bg-[#8942C1]",
};
