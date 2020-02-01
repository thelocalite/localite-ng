export class User {
  id            : number;
  name          : string;
  username      : string;
  email         : string;
  role?         : string;
  contactNumber?: string;
  imageUrl?     : string;
  address?      : string;

  constructor(
    id           : number,
    name         : string,
    username     : string,
    email        : string,
    contactNumber: string,
    address      : string
  ) {
    this.id            = id;
    this.username      = username;
    this.name          = name;
    this.email         = email;
    this.contactNumber = contactNumber;
    this.address       = address;
  }
}
