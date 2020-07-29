import { ObjectID } from 'mongodb';

export interface Household {
    _id: ObjectID;
    LastName: string;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    Zip: number;
    Anniversary: Date;
    Hobbies?: string[];
    FavFood?: string[];
    FavScripture?: string;
    FavHymn?: string;
}