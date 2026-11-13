import { Check } from "lucide-react";
import SignInForm from "./SignInForm";
export const metadata = {
  title: "Sign In"
}

const SignInPage = async ({ searchParams }) => {

    const { callbackURL } = await searchParams;
    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-200 dark:bg-background-tertiary px-4">

            <div className="w-full max-w-md rounded-2xl border border-purple-100 bg-background p-8 shadow-xl shadow-purple-100 dark:border-gray-800 dark:bg-background-dark dark:shadow-purple-900">

                <div className="mb-8 text-center">

                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600  text-default shadow-lg dark:shadow-purple-800">

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