import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div>
            <h2 className="flex gap-3 items-center">
                <span>Hi, Welcome </span>
                <div className="text-2xl font-semibold">
                {
                    user?.displayName ? user.displayName : 'Back'
                 }
                </div>
            
            </h2>
        </div>
    );
};

export default UserHome;