import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: number | string, country: string): unknown {
    try {
      const phoneNumber = parsePhoneNumber(value + '', country as CountryCode);
      return phoneNumber.formatNational();
    } catch (error) {
      return value;
    }
  }

}
