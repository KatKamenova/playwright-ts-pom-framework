export class DataGenerator {
  static generateEmail(): string {
    const timestamp = Date.now();
    return `testuser_${timestamp}@mail.com`;
  }

  static generatePassword(): string {
    return "Test1234!";
  }

  static generateName(): string {
    return "Test User";
  }
}
