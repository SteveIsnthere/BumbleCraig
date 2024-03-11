export const colors = [
  "#c62828", "#e53935", "#d81b60", "#8e24aa", "#5e35b1",
  "#3949ab", "#1e88e5", "#039be5", "#00acc1", "#00897b",
  "#43a047", "#7cb342", "#c0ca33", "#fdd835", "#ffb300",
  "#fb8c00", "#f4511e", "#6d4c41", "#757575", "#546e7a",
  "#263238", "#90a4ae", "#ec407a", "#ab47bc", "#42a5f5"
];

// export const siteName: string = 'Tidder'
export const siteName: string = 'Crabslist'


// export const apiEndPoint: string = 'http://127.0.0.1:8000/' + siteName.toLowerCase()
export const apiEndPoint: string = 'https://dogshit.ngrok.app/' + siteName.toLowerCase()

export const rankingModes = [
  ['Recommended', 'star'],
  ['Trending', 'trending_up'],
  ['Newest', 'schedule'],
  ['Best', 'thumb_up'],
  ['Worst', 'thumb_down'],
];

// export const neighbourhoods = [
//   'All-Genres',
//   'Others',
//   'News',
//   'Jokes',
//   'Creativity',
//   'irl',
//   'Tech',
//   'Sports',
//   'Memes',
//   'Controversial',
//   'Confession',
//   'Chinese',
// ];


export const neighbourhoods = [
  'All Locations',
  'Downtown',
  'UBC',
  'SFU',
  'Richmond',
  'Surrey',
  'Burnaby',
  'North Vancouver',
  'West Vancouver',
];


export const assistantPrompts: string[] = [
  "What is " + siteName + "?",
  "What is a crab?",
  "Tell me a lame joke",
  "What is credit score?",
  "What does mortgage mean?",
]

export const visionPrompts: string[] = [
  "What is in the picture?",
  "Why is this funny?",
  "Make a joke about it",
  "How much should I sell this for?",
]

export const credits = [
  {
    "title": "CEO",
    "userid": 1,
  },
  {
    "title": "CFO",
    "userid": 2,
  },
  // {
  //   "title": "Lead Developer",
  //   "userid": 5,
  // },
  // {
  //   "title": "Graphic Designer",
  //   "userid": 5,
  // },
  // {
  //   "title": "Tech Lead",
  //   "userid": 5,
  // },
  // {
  //   "title": "System Engineer",
  //   "userid": 5,
  // },
  // {
  //   "title": "Lead Moderator",
  //   "userid": 5,
  // }
]
