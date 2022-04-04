import { IDataGetDto, IDataPostDto } from "./Interfaces/IContactsDto";
import { IUserData } from "./Interfaces/IUserData";
import Utils from "./Methods/Utils";

class Server {
  public authAddress = `http://localhost:8000/auth/`

  public authenticateUser = async(login: string, password: string): Promise<string> =>  {
    const address = this.authAddress + '?login=' + login;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const [data]: IUserData[] = await response.json();

    return (data.password === password) ? data.auth_token : '';
  }

  public authorizeUser  = async(auth_token: string): Promise<boolean> =>  {
    const address = this.authAddress + '?auth_token=' + auth_token;

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const [data]: IUserData[] = await response.json();

    return !!data;
  }






  public async getFromServerById(id: string): Promise<IDataGetDto> {
    const address = this.authAddress + (id || '');

    const response = await fetch(address, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();

    return data;
  }

  public postToServer(id: string, userInfo: IDataPostDto) {
    const address = this.authAddress;
  
    fetch(address, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id:id, ...userInfo})
    });

    console.log("post data")
  }

  public patchToServer(id: string, userInfo: IDataPostDto) {
    const address = this.authAddress + id;
  
    fetch(address, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userInfo)
    });

    console.log("patch data")
  }
}

export default new Server();