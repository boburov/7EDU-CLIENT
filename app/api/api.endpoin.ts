const apiEndpoins = {
  // Home
  home: "/",

  // auth
  registerUser: "auth/register",
  verifyCode: "auth/verify",
  loginUser: "auth/login",
  userProfile: "auth/profile",

  // users
  getOneUser: (username: string) => `users/${username}`,
  getUsers: "users/all",
  deleteUser: (id: number) => `users/delete/${id}`,
  changeUserDetails: (id: number) => `users/update/${id}`,

  // collections

  // posts
  createNewPost: "posts/new",
  getManyPosts: "posts/many",
  getOnePost: (id: number) => `posts/${id}`,
  updatePost: (id: number) => `posts/update/${id}`,
  deletePost: (id: number) => `posts/remove/${id}`,
  getUsersPosts: (id: number) => `posts/user/${id}`,
  getMyPosts: "posts/user/mine",
};

export default apiEndpoins;
