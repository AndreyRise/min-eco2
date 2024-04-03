import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    return $api.post('/user/login', {email,password})
  }

  static async registration(name, email, password) {
    return $api.post('/user/registration', {name, email,password})
  }

  static async changePassword(email,oldPassword, password) {
    return $api.post('/user/changePassword', {email, oldPassword,password})
  }

  static async forgetPw(email) {
    return $api.get('/user/sendLinkForgetPw', {
      params: {
        email:email
      }
    })
  }

  static async logout() {
    return $api.post('/user/logout')
  }
}
