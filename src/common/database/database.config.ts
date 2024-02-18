export class DatabaseConfig {
  private static databaseURL: string = '127.0.0.1:27017';
  private static databaseName: string = 'photos-log';

  static getMongoConnectionURL(): string {
    return `mongodb://${this.databaseURL + '/' + this.databaseName}`;
  }
}
