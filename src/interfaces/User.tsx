export interface User {
    id:              number;
    fullName:         string;
    lastName:         string;
    email:            string;
    phoneNumber:      string;
    roleName:         string;//Rolename
    addresses:        any[];
    dateOfBirth:      Date;
    registrationDate: Date;
    isActive:         boolean;
    token:            string;
}