import { ObjectID } from 'bson';
import { PhoneNumber } from './PhoneNumber';
import { Household } from './Household';

export interface Member {
    _id: ObjectID;
    HouseholdId: ObjectID;
    FirstName: string;
    Phone?: PhoneNumber[];
    Email?: string;
    Ocupation?: string;
    Birthplace?: string;
    Birthdate?: Date;
    BaptismDate?: Date;
    Hobbies?: string[];
    FavFood?: string[];
    FavScripture?: string;
    FavHymn?: string;
}

export interface MemberDetail extends Member {
    Household: Household;
}
