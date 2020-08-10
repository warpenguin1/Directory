export interface PhoneNumber {
  Number: string;
  Type: string;
}
export interface PhoneType {
  Name: string;
  Abbreviation: string;
}
export let PhoneTypes: PhoneType[] = [
  { Name: 'Home', Abbreviation: 'H'},
  { Name: 'Moble', Abbreviation: 'M'},
  { Name: 'Office', Abbreviation: 'O'},
];
