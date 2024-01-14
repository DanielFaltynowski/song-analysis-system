import React from "react";
import { useAuth } from '../context/AuthContext.js';


const User = () => {
    const { user } = useAuth();

    return <div>USER {user} </div>;
    }

export default User;