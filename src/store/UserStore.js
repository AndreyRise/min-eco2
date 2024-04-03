
import {makeAutoObservable} from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import { API_URL } from '../http/index.js';
import UserService from '../services/UserService';

export default class UserStore {

  user = {};
  users = [];
  isAuth = false;
  releases = [];
  songs = [];
  withdraws = [];
  links = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool){
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }
  
  setUsers(users) {
    this.users = users;
  }

  setLinks(links){
    this.links = links;
  }

  setReleases(releases){
    this.releases = releases;
  }

  setSongs(songs){
    this.songs = songs;
  }

  setWithdraws(withdraws){
    this.withdraws = withdraws;
  }

  async addToChatCRM(userId){
    try {
      let myInterval;
      let i=0;
      myInterval = setInterval(function() {
        const helloBtn = (document.querySelector('.button_b5a2'));
        if(helloBtn!==null){
          helloBtn.click();
          clearInterval(myInterval);
        }
        i+=1
        console.log(i)
        if(i===60){clearInterval(myInterval);}
      }, 1000);
      await UserService.addToChatCRM(userId,true);
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async getChatToken(userId,userName,email){
    try {
      const response = await UserService.getChatToken(userId,userName,email);
      localStorage.setItem('ChatToken', response.data.token);
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async login(email,password){
    try {
      const response = await AuthService.login(email,password);
      localStorage.setItem('Token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert('Ошибка при авторизации. Логин или пароль неверен.')
    }
  }

  async registration(name, email,password){
    try {
      const response = await AuthService.registration(name,email,password);
      localStorage.setItem('Token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert(e.response?.data?.message)
    }
  }

  async changePassword(email,oldPassword,password){
    try {
      const response = await AuthService.changePassword(email,oldPassword,password);
      localStorage.setItem('Token', response.data.accessToken);
    } catch (e) {
      alert(e.response?.data?.message)
    }
  }

  async changeBalance(userId,balance){
    try {
      await UserService.changeBalance(userId,balance);
    } catch (e) {
      alert(e.response?.data?.message)
    }
  }

  async logout(){
    try {
      await AuthService.logout();
      localStorage.removeItem('Token');
      localStorage.removeItem('ChatToken');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/user/refresh`, {withCredentials:true});
      localStorage.setItem('Token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data);
      this.setAuth(false);
    }
  }

  async updateReleaseInfo(releaseId, newUPC, newMsg, newStatus){
    try {
      await UserService.updateReleaseInfo(releaseId, newUPC, newMsg, newStatus);
    } catch (e) {
      console.log(e.response);
    }
  }
  
  async getReleases(userId){
    try {
      const objResponse = await UserService.getReleases(userId);
      const response = Object.values(objResponse.data)
      this.setReleases(response.reverse());
    } catch (e) {
      this.setReleases([]);
    }
  }

  async getAllReleases(userId){
    try {
      const objResponse = await UserService.getAllReleases(userId);
      const response = Object.values(objResponse.data)
      console.log(response)
      this.setReleases(response.reverse());
    } catch (e) {
      this.setReleases([]);
    }
  }

  async getAllUsers(){
    try {
      const objResponse = await UserService.getAllUsers();
      const response = Object.values(objResponse.data);
      this.setUsers(response.reverse());
    } catch (e) {
      this.setUsers([]);
    }
  }

  async getAllLinks(){
    try {
      const objResponse = await UserService.getAllLinks();
      const response = Object.values(objResponse.data);
      this.setLinks(response.reverse());
    } catch (e) {
      console.log(e);
      this.setLinks([]);
    }
  }

  async getSongs(releaseId){
    try {
      const objResponse = await UserService.getSongs(releaseId);
      const response = Object.values(objResponse.data);
      this.setSongs(response);
    } catch (e) {
      console.log(e);
      this.setSongs([]);
    }
  }

  async deleteRelease(releaseId,cover,songArr){
    try {
      const objResponse = await UserService.deleteRelease(releaseId,cover,songArr);
      const response = Object.values(objResponse.data);
      this.setReleases(response);
    } catch (e) {
      console.log(e);
    }
  }

  async getWithdraws(userId){
    try {
      const objResponse = await UserService.getWithdraws(userId);
      const response = Object.values(objResponse.data);
      this.setWithdraws(response);
    } catch (e) {
      console.log(e);
      this.setWithdraws([]);
    }
  }

  async getAllWithdraws(){
    try {
      const objResponse = await UserService.getAllWithdraws();
      const response = Object.values(objResponse.data);
      this.setWithdraws(response.reverse());
    } catch (e) {
      console.log(e);
      this.setWithdraws([]);
    }
  }

  async findUser(userId){
    try {
      const objResponse = await UserService.findUser(userId);
      const response = Object.values(objResponse.data);
      return (response[0]);
    } catch (e) {
      console.log(e);
    }
  }

  async updateWithdrawInfo(userId,withdrawId, msgToUser, newStatus, amount){
    try {
      await UserService.updateWithdrawInfo(userId, withdrawId, msgToUser, newStatus, amount);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteWithdraw(withdrawId){
    try {
      await UserService.deleteWithdraw(withdrawId);
    } catch (e) {
      console.log(e);
    }
  }

  async addLink(releaseName,nickname,link){
    try {
      await UserService.addLink(releaseName,nickname,link);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteLink(linkId){
    try {
      await UserService.deleteLink(linkId);
    } catch (e) {
      console.log(e);
    }
  }

  async getLinks(userId){
    try {
      const objResponse = await UserService.getLinks(userId);
      const response = Object.values(objResponse.data);
      this.setLinks(response);
    } catch (e) {
      console.log(e);
    }
  }

  async forgetPw(email){
    try {
      await AuthService.forgetPw(email);
    } catch (e) {
      console.log(e);
    }
  }

}