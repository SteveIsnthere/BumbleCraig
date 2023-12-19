export const colors = [
  "#c62828", "#e53935", "#d81b60", "#8e24aa", "#5e35b1",
  "#3949ab", "#1e88e5", "#039be5", "#00acc1", "#00897b",
  "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300",
  "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a",
  "#263238", "#90a4ae", "#ec407a", "#ab47bc", "#42a5f5"
];

// export const apiEndPoint: string = 'http://127.0.0.1:8000/tidder'
export const apiEndPoint: string = 'https://dogshit.ngrok.app/tidder'

export const rankingModes = [
  'Recommended',
  'Trending',
  'Newest',
  'Best',
  'Worst',
  'Friends',
];

export const genres = [
  'All-Genres',
  'Others',
  'News',
  'Jokes',
  'Creativity',
  'irl',
  'Tech',
  'Sports',
  'Memes',
  'Controversial',
  'Confession',
  'Chinese',
];

export const assistantPrompts: string[][] = [
  ["What is Tidder?", "question_mark"],
  ["Who made this?", "mood"],
  ["Tell me a lame joke", "celebration"],
  ["What's the meaning of life?", "mood"],
  ["How can I be happy?", "mood"],
  ["What is the best way to lose money?", "mood"],
  ["What's the most controversial tv show?", "mood"],
]

export const visionPrompts: string[][] = [
  ["What is in the picture?", "question_mark"],
  ["Why is this funny?", "mood"],
  ["Make a joke about it", "celebration"],
  ["Solve it", "task"],
  ["Explain it", "task"],
  ["Solve and explain it", "task"]
]

export const credits = [
  {
    "title": "Lead Developer",
    "userid": 5,
  },
  {
    "title": "Graphic Designer",
    "userid": 5,
  },
  {
    "title": "Tech Lead",
    "userid": 5,
  },
  {
    "title": "System Engineer",
    "userid": 5,
  },
  {
    "title": "Lead Moderator",
    "userid": 5,
  }
]
