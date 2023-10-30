import { useContext } from "react";
import { AuthContext } from "../Context/auth";

function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return authContext;
}

export default useAuth;