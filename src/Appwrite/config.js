import {Client,Account} from 'appwrite'

const client = new Client();

client.setEndpoint("Enter Your API Endpoint Here").setProject("Enter Your Project Id Here")

export const account = new Account(client)
