import getRequest from "../../functions/connection/getRequest";
import postRequest from "../../functions/connection/postRequest";
import ErrorMessage from "../../types/ErrorMessage.type";
import UserType from "../../types/User.type";
import Backend from "../Backend";

export default class UserConnection extends Backend {
    public static readonly UserURL = this.BackendURL + "api/user"

    public static async getUser(): Promise<UserType | ErrorMessage> {
        try {
            const response = await getRequest<UserType>(UserConnection.UserURL)
            return response
        } catch (error) {
            console.error(error)
            return { message: error as string }
        }
    }

    public static async loginUser(username: string, password: string): Promise<{message: string, token: string} | ErrorMessage> {
        try {
            const body = {
                username: username,
                password: password
            }
            const response = await postRequest<{message: string, token: string}, Record<string, string>>(UserConnection.UserURL + "/login", body)
            return response
        } catch (error) {
            console.error(error)
            return { message: error as string }
        }
    }

    public static async registerUser(username: string, completeName: string, password: string): Promise<{message: string} | ErrorMessage> {
        try {
            const body = {
                username: username,
                name: completeName,
                password: password
            }
            const response = await postRequest<{message: string}, Record<string, string>>(UserConnection.UserURL + "/register", body)
            return response
        } catch (error) {
            console.error(error)
            return { message: error as string }
        }
    }
}