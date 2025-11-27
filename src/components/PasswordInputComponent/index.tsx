import { Eye, EyeOff } from "lucide-react";
import { TextInputComponent } from "../TextInputComponent";
import { useCallback, useState } from "react";


interface PasswordInputComponentProps {
    id: string;
    label: string;
    register: any;
    isError?: boolean;
    errorMessage?: string;
    placeholder?: string;
}


export const PasswordInputComponent = (props: PasswordInputComponentProps) => {

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);


    const handlerToggleViewPassword = useCallback(() => setIsShowPassword((isShow) => !isShow), [])


    return (
        <TextInputComponent 
            {...props} 
            type={ isShowPassword ? 'text' : 'password' } 
            icon={ isShowPassword ? EyeOff : Eye  }
            onClickIcon={handlerToggleViewPassword} />
    );

}
