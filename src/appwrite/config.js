import { Client, ID , Account, Query, Databases } from "appwrite";
import conf from "../conf/conf";




export class appwriteConfig{
    client = new Client();
    databases;
    account;

     constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject(conf.appwriteProjectId); 
        this.account = new Account(this.client)
        this.databases = new Databases(this.client)
     }


     async getUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite :: getUser :: Error :: ", error.message)
            return false 
        }
     }

    //For Creating the document 

    async createDocument(data) {

        try {

          return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.habitCollectionId,
                ID.unique(),
                {
                    ...data
                }

            )
        } catch (error) {
            console.error("Appwrite :: createDocument :: error :: ", error)

        }
        

    }

   
    async updateDocument(id, data){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.habitCollectionId,
                id,
                {...data}
            )

        } catch (error) {
            console.log("Appwrite :: UpdateDocument :: Error :: ", error.message)
        }
    }



    async getHabitList(){
        try {
           return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.habitCollectionId,
                [Query.select(["name", "streak", "complete", "$id"])]

            )

        } catch (error) {
         console.log("Appwrite :: getHabitList  :: Error :: ", error.message)   
        }
    }

    async getHabit(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.habitCollectionId,
                id,
            )
        } catch (error) {
            console.log("Appwrite :: getHabit :: Error :: ", error.message)
        }

    }

    async deleteDocument(id){
        try {
           return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.habitCollectionId,
                id
            )
        } catch (error) {
            console.log("Appwrite :: deleteDocument :: Error :: ", error.message)
        }
    }

    async newStreak(data){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.streakCollectionId,
                ID.unique(),
                {
                   ...data
                }
            )
        } catch (error) {
            console.log("Appwrite :: newStreak :: Error :: ", error.message)
        }
    }

    async updateStreak(id, data){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.streakCollectionId,
                id,
                {...data}
            )
        } catch (error) {
            console.log("Appwrite :: UpdateStreak :: Error :: ", error.message)
        }
    }

    async deleteStreakinfo(id){
        try{
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.streakCollectionId,
                id
            )
        }catch(error){
            console.log("Appwrite :: deleteStreakinfo :: Error :: ", error.message)
        }
    }

    async getStreakInfo(id){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.streakCollectionId,
                [Query.equal("habitid", id)]
            )
        } catch (error) {
            console.log("Appwrite :: getStreakInfo :: Error :: ", error.message)
        }
    }
}


const configService = new appwriteConfig();
export default configService;