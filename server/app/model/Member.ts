import { ObjectID } from 'mongodb';
import { PhoneNumber } from './PhoneNumber';

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