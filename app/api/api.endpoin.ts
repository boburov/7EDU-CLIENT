const main_url = {
  auth: "auth",
  course: "courses",
  quiz: "quizs",
  quession: "quessions",
  user: "user"
};

const apiEndpoins = {
  home: "/",
  getMe: `${main_url.auth}/me`,
  loginUser: `${main_url.auth}/login`,
  verifyCode: `${main_url.auth}/verify`,
  registerUser: `${main_url.auth}/register`,
  decodeToken: `${main_url.auth}/verify-token`,

  allCourse: `${main_url.course}/all`,
  getCategory: (id: string) => `${main_url.course}/category/${id}`,
  addLesson: (id: string) => `${main_url.course}/category/${id}/newlesson`,

  oneQuiz: (id: string) => `${main_url.quiz}/${id}`,
  deleteQuiz: (id: string) => `${main_url.quiz}/${id}`,
  createQuiz: (id: string) => `${main_url.quiz}/${id}/new-quiz`,
  updateUser: (id: string) => `${main_url.user}/update/${id}`,
  updateUserProfilePic: (id: string) => `${main_url.user}/updateProfilePic/${id}`,
  editQuiz: (id: string, quizid: string) => `${main_url.quiz}/${id}/edit/${quizid}`,

  getUsers: `${main_url.user}/all`,
  getUserById: (id: string) => `${main_url.user}/${id}`,
};

export default apiEndpoins;
