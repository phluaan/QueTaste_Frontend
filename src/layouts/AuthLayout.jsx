import backgroundImg from '../assets/background.jpg';

const AuthLayout = ({ children }) => {
    return (
        <div
        className="h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg})` }}
        >
        {children}
        </div>
    );
};

export default AuthLayout;