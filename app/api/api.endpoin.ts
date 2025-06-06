
const main_url = {
  auth: "auth",
  course: "courses",
  quiz: "quizs",
  quession: "quessions",
  user: "user"
}

const apiEndpoins = {
  // Home
  home: "/",

  // register
  getMe: `${main_url.auth}/me`,
  loginUser: `${main_url.auth}/login`,
  verifyCode: `${main_url.auth}/verify`,
  registerUser: `${main_url.auth}/register`,
  decodeToken: `${main_url.auth}/verify-token`,

  // create course
  allCourse: `${main_url.course}/all`,
  createCategor: `${main_url.course}/new-category`,
  getCategory: (id: string) => `${main_url.course}/category/${id}`,
  addLesson: (id: string) => `${main_url.course}/category/${id}/newlesson`,

  // create quiz
  oneQuiz: (id: string) => `${main_url.quiz}/${id}`,
  deleteQuiz: (id: string) => `${main_url.quiz}/${id}`,
  createQuiz: (id: string) => `${main_url.quiz}/${id}/new-quiz`,
  editQuiz: (id: string, quizid: string) => `${main_url.quiz}/${id}/${quizid}`,

  // quessions
  eidtQuessions: (id: string) => `${main_url.quession}/${id}`,
  deleteQuessions: (id: string) => `${main_url.quession}/${id}`,
  createQuession: (id: string) => `${main_url.quession}/${id}/create`,

  // user
  getUsers: `${main_url.user}/all`,
  getUserById: (id: string) => `${main_url.user}`,
  getOneUser: (id: string) => `${main_url.user}/${id}`,
  deleteUser: (id: number) => `${main_url.user}/delete/${id}`,
  changeUserDetails: (id: number) => `${main_url.user}/update/${id}`,
};

export default apiEndpoins;
