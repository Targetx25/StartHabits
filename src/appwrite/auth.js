import { Client, Account, ID, OAuthProvider } from "appwrite";
import conf from "../conf/conf";

export  class appwriteAuth{
    client = new Client();
    account;


    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(conf.appwriteProjectId); 
        this.account = new Account(this.client)
    }


    async createAccount({name, email, password}){

        try {
            const res = await this.account.create(ID.unique(), email, password)
            if (res){
                return this.login({email : email, password : password})
            }
        } catch (error) {
            console.log("Appwrite :: CreateAcc :: Error :: " , error.message)

        }
    }

    async login ({email, password}) {
        try {

            const res = await this.account.createEmailPasswordSession(email, password)
            return res;

        } catch (error) {
            console.log("Appwrite :: Login :: Error :: " , error.message)
        }
    }

    async getUserInfo(){
        try {
            const userData = await this.account.get();
            return userData;

        } catch (error) {
            console.log("Appwrite :: getUserInfo :: Error :: ", error.message)
        }
    }


    async oauthLogin(){
        try {
            this.account.createOAuth2Session(
            OAuthProvider.Google,
            'http://localhost:5173/oauth/callback',
            'http://localhost:5173/signup',

        )
       
        } catch (error) {
            console.log("Appwrite :: OAuth :: Error :: ", error.message)  
        }
    }

    async logout(){
        try {
           return await this.account.deleteSessions() 
        } catch (error) {
            console.log("Appwrite :: Logout :: Error :: ", error.message)
        }
    }



}


const authService = new appwriteAuth();
export default authService;