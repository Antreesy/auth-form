export default class Utils {
  public static generateToken() {
    return Math.random().toString(36).substring(2);
  }
}
