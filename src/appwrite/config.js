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
           return await this.databases.listdocuments(
                conf.appwriteDatabaseId,
                conf.habitCollectionId,
                [Query.select(["name"])]

            )

        } catch (error) {
         console.log("Appwrite :: getHabitList  :: Error :: ", error.message)   
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


}

const configService = new appwriteConfig();
export default configService;