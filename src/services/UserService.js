import $api from "../http";

export default class UserService {



  static async getChatToken(userId,userName,email){
    return $api.get(`/user/chatToken`,{
      params: {
        userId: userId,
        userName:userName,
        email:email
      }
    })
  }

  static async getReleases(userId){
    return $api.get(`/user/myReleases`,{
      params: {
        userId: userId
      }
    })
  }

  static async getAllReleases(userId){
    return $api.get(`/admin/getAllReleases`,{
      params: {
        userId: userId
      }
    })
  }

  static async updateReleaseInfo(releaseId, newUPC, newMsg, newStatus) {
    return $api.post('/admin/updateReleaseInfo', {releaseId, newUPC, newMsg, newStatus})
  }

  static async changeBalance(userId,balance) {
    return $api.post('/admin/changeBalance', {userId,balance})
  }

  static async addToChatCRM(userId,addToChatCRM) {
    console.log(userId,addToChatCRM)
    return $api.post('/user/addToChatCRM', {userId,addToChatCRM})
  }

  static async getAllUsers(){
    return $api.get(`/admin/getAllUsers`)
  }

  static async findUser(userId){
    return $api.get(`/admin/findUser`,{
      params: {
        userId: userId
      }
    })
  }

  static async getSongs(releaseId){
    return $api.get(`/user/releaseSongs`,{
      params: {
        releaseId: releaseId
      }
    })
  }

  static async deleteRelease(releaseId,cover,songArr){
    return $api.delete('/user/deleteRelease',{
      params:{
        releaseId: releaseId,
        cover:cover,
        songs: songArr
      }
    })
  }

  static async getWithdraws(userId){
    return $api.get(`/user/withdraws`,{
      params: {
        userId: userId
      }
    })
  }

  static async getLinks(userId){
    return $api.get(`/user/myLinks`,{
      params: {
        userId: userId
      }
    })
  }

  static async getAllWithdraws(){
    return $api.get(`/admin/getAllWithdraws`)
  }

  static async getAllLinks(){
    return $api.get(`/admin/getAllLinks`)
  }

  static async updateWithdrawInfo(userId, withdrawId, msgToUser, newStatus, amount){
    return $api.post(`/admin/updateWithdrawInfo`,{userId, withdrawId, msgToUser, newStatus, amount})
  }

  static async addSong(userId,name,nickname,authorFio,beatFio,lyrics,ttMoment,pg18, fileUri, releaseId) {
    return $api.post('/user/createSong', {userId,name,nickname,authorFio,beatFio,lyrics,ttMoment,pg18, fileUri, releaseId})
  }

  static async addRelease(coverUri,name,nickname,releaseDate,socLinks,genre,type,totalSongs,proofUrl,userId) {
    return $api.post('/user/createRelease', {coverUri,name,nickname,releaseDate,socLinks,genre,type,totalSongs,proofUrl,userId})
  }

  static async addLink(releaseName,nickname,link) {
    return $api.post('/admin/addLink', {releaseName,nickname,link})
  }

  static async addWithdraw(date,amount,INN,bankAccount,BIK,FIO,userId) {
    return $api.post('/user/createWithdraw', {date,amount,INN,bankAccount,BIK,FIO,userId})
  }

  static async deleteWithdraw(withdrawId){
    return $api.delete('/admin/deleteWithdraw',{
      params:{
        withdrawId: withdrawId,
      }
    })
  }

  static async deleteLink(linkId){
    return $api.delete('/admin/deleteLink',{
      params:{
        linkId: linkId,
      }
    })
  }

}