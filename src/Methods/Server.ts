import { IUserData } from "../Interfaces/IUserData";
import Utils from "./Utils";

class Server {
  public authAddress = `http://localhost:8000/auth/`

  // Аутентификация с логином и паролем
  public authenticateUser = async(login: string, password: string): Promise<string> =>  {
    const address = this.authAddress + '?login=' + login;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const [data]: IUserData[] = await response.json();

    return (data.password === password) ? data.auth_token : '';
  }
  
  // Авторизация с токеном
  public authorizeUser  = async(auth_token: string): Promise<boolean> =>  {
    const address = this.authAddress + '?auth_token=' + auth_token;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const [data]: IUserData[] = await response.json();

    return !!data;
  }

  
  // Получение данных о пользователе
  public getUserData  = async(auth_token: string): Promise<IUserData> =>  {
    const address = this.authAddress + '?auth_token=' + auth_token;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const [data]: IUserData[] = await response.json();

    return data;
  }

  // Проверка логина на существование
  public checkUniqueLogin = async(login: string): Promise<boolean> =>  {
    const address = this.authAddress + '?login=' + login;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const [data]: IUserData[] = await response.json();

    return !data;
  }

  // Проверка старого пароля
  public checkCorrectPassword = async(auth_token: string, password: string): Promise<boolean> =>  {
    const address = this.authAddress + '?auth_token=' + auth_token;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const [data]: IUserData[] = await response.json();

    return (data.password === password);
  }

  // Создание нового пользователя
  public createNewUser(login: string, password: string) {
    const address = this.authAddress;
    const id = Utils.generateToken()
  
    fetch(address, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: id,
        login: login,
        password: password,
        auth_token: id,
      })
    });
  }

  // Изменение пароля
  public changePassword(auth_token: string, password: string) {
    const address = this.authAddress + auth_token;
  
    fetch(address, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        password: password,
      })
    });
  }
}

export default new Server();