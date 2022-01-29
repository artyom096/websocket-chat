export interface IMessages {
    message: string;
    userName: string;
}

export interface IButtonProps {
    children: React.ReactChild | string;
    disabled?: boolean;
    onClick?: () => void;
}

export interface IInputGroupProps {
    type?: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder?: string;
}

export interface AuthState {
    isAuth: boolean;
    roomID: string;
    userName: string;
}

export interface IAuthData {
    roomID: string;
    userName: string;
}

export interface ChatState {
    users: string[],
    messages: IMessages[];
}

export interface ISendInputProps {
    value: string;
    onClick: () => void;
    onKeyPress: (e: React.KeyboardEvent<Element>) => void;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}