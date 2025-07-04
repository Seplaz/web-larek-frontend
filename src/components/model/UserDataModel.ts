export class UserData {
  deliveryAddress = '';
  email = '';
  phone = '';

  setField(field: keyof UserData, value: string) {
    this[field] = value;
  }
}