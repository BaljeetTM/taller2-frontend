export interface User {
    firtsName?:    string;
    lastName?:     string;
    email:        string;
    thelephone?:   string;
    street?:       string;
    number?:       string;
    commune?:      string;
    region?:       string;
    postalCode?:   string;
    birthDate?:    null;
    registeredAt?: Date;
    lastAccess?:   Date;
    isActive?:     boolean;
    token:        string;
    role?:         string;
}