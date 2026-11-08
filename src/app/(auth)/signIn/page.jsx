import { Check } from "lucide-react";
import SignInForm from "./SignInForm";

const SignInPage = async ({ searchParams }) => {
    const { callbackURL } = await searchParams;
    return (

        <div className="flex min-h-screen items-center justify-center bg-purple-50 px-4">

            <div className="w-full max-w-md rounded-2xl border border-purple-100 bg-white p-8 shadow-xl shadow-purple-100">

                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-200">

                        <Check size={24} />

                    </div>

                    <h1 className="text-2xl font-bold text-purple-950">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Sign in to continue to your account
                    </p>

                </div>

                <SignInForm callbackURL={callbackURL || "/"} />

            </div>

        </div>

    );
}
export default SignInPage;