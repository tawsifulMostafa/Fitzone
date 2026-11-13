import SignUpForm from "./SignUpForm";
export const metadata = {

    title: "SignIn"
}
const SignUpPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-foreground p-6">
            <SignUpForm />
        </div>
    );
};

export default SignUpPage;