import { ObjectID } from 'bson';

import { Member } from './Member';

export interface Household {
    _id: ObjectID;
    LastName: string;
    Phone?: string;
    Address1: string;
    Address2?: string;
    City: string;
    State: string;
    Zip: number;
    Anniversary?: Date;
    Hobbies?: string[];
    FavFood?: string[];
    FavScripture?: string;
    FavHymn?: string;
}

export interface HouseholdDetail extends Household {
  Members: Member[];
}
