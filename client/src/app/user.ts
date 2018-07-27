export class User {
    public name: String;
    public email: String;
    public lastCall: Date;
    public profile: String;
    public role: String;
    public money: Number;
    public notify: Boolean = true;
    public visible: Boolean = true;

    constructor(name?: String, email?: String, role?: String, profile?: String){
        this.name = name;
        this.email = email;
        this.role = role;
        this.profile = profile;
    }
}
