export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api/`;
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  auth: {
    signup: "register",
    // signUpProfile: "user/signup",
    login:"login",
    checkEmail: 'check-email',
    checkMagicEmail: 'magic-link',
    getUser: 'magic-auth',
    profileDetails: "user",
    profileUpdate: "profile-update"
  },
  cms: {
    home: "home-cms",
    details: (id?:string)=> `cms/${id}`
  }
};

export const sucessNotificationEndPoints = [
  endpoints.auth.signup,
  // endpoints.auth.signUpProfile,
  endpoints.auth.login,
  endpoints.auth.profileUpdate,
];
