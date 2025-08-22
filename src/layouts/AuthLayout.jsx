const AuthLayout = ({ children }) => {
    return (
        <div
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/backround.jpg')" }}
        >
        {children}
        </div>
    );
};

export default AuthLayout;