"use client"

import { authClient } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


const SignInForm = ({ callbackURL }) => {
    const [googleLoading, setGoogleLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true)
            const data = await authClient.signIn.social({
                provider: "google"
            })
        } catch (err) {
            console.error(err)
            setGoogleLoading(false)
        } finally {
            setGoogleLoading(false)
        }
    }
    const handleSignIn = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const signInData = Object.fromEntries(formData.entries())

        const { error } = await authClient.signIn.email({
            email: signInData.email,
            password: signInData.password,
            rememberMe: true,
            callbackURL: callbackURL
        })

        if (error) {
            toast.warning("password incorrect")
            setLoading(false)
        } else {
            toast.success("Login Successful")
            setLoading(false)
        }
    }
    return (
        <div>
            <Form
                className="flex w-full flex-col gap-5"
                render={(props) => <form {...props} data-custom="foo" />}
                onSubmit={handleSignIn}
            >

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9.\_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >

                    <Label className="mb-1 text-sm font-medium text-purple-950">
                        Email
                    </Label>

                    <Input
                        placeholder="Enter Your Email"
                        className="h-11 rounded-xl border-gray-200 focus:border-purple-500"
                    />

                    <FieldError />

                </TextField>

                <TextField
                    isRequired
                    minLength={6}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 6) {
                            return "Password must be at least 6 characters";
                        }

                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }

                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }

                        return null;
                    }}
                >

                    <Label className="mb-1 text-sm font-medium text-purple-950">
                        Password
                    </Label>

                    <Input
                        placeholder="Enter your password"
                        className="h-11 rounded-xl border-gray-200 focus:border-purple-500"
                    />

                    <Description className="text-xs text-gray-400">
                        Must be at least 6 characters with 1 uppercase and 1 number
                    </Description>

                    <FieldError />

                </TextField>

                <div className="flex gap-3 pt-2">

                    <Button
                        type="submit"
                        className="h-11 flex-1 rounded-xl bg-purple-600 font-medium text-white shadow-md shadow-purple-200 hover:bg-purple-700"
                    >
                        <Check size={18} />
                        {
                            loading ? "signing in..." : " Sign In"
                        }
                    </Button>

                    <Button
                        type="reset"
                        variant="secondary"
                        className="h-11 rounded-xl border border-purple-100 px-5 text-purple-700 hover:bg-purple-50"
                    >
                        Reset
                    </Button>

                </div>
                <h1 className="p-3 text-center border border-gray-400">O<span className="text-purple-600">r</span></h1>
                <div>
                    <Button onClick={handleGoogleSignIn} className="w-full" variant="tertiary">
                        <Icon icon="devicon:google" />
                        {
                            googleLoading ? "Signing in..." : "Sign in with Google"
                        }
                    </Button>
                </div>

            </Form>
        </div>
    );
};

export default SignInForm;