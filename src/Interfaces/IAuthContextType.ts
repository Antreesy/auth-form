export interface IAuthContextType {
    user: string | null;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}
