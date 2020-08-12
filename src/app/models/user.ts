import { UserInformation } from './user-information';

export class User {
    public id: Number;
    public email: String;
    public username: String;
    public dateCreated: string;
    public enabled: boolean;
    public userInformation: UserInformation;

}
