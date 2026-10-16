'use client'

import { authClient } from "@/lib/auth-client";
import {
    Button,
    Description,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    Surface,
    TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ImagePlus, Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const SignUpPage = () => {

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google"
        })
    }
    const route = useRouter()
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const formData = new FormData(e.currentTarget);
            const image = formData.get("image");
            if (!image || image.size === 0) {
                toast.error("please select a picture")
                return;

            }


            let imageUrl = "";

            if (image && image.size > 0) {
                const imageData = new FormData();
                imageData.append("image", image);


                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: imageData,
                    }
                );

                const result = await res.json();

                if (!result.success) {
                    throw new Error("Image upload failed");
                }

                imageUrl = result.data.display_url;
            }
 
            const { data, error } = await authClient.signUp.email({
                name: formData.get("name"),
                email: formData.get("email"),
                password: formData.get("password"),
                image: imageUrl,
            })
            if (error) {
                throw new Error(error.message);
            } else {
                toast.success("sign up successful")
                route.push("/")
                route.refresh() 
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">

            <Surface className="w-full max-w-xl rounded-3xl border border-purple-100 bg-white p-2 shadow-xl shadow-purple-200/40">

                <Form onSubmit={onSubmit}>
                    <Fieldset className="w-full rounded-2xl p-6">

                        <div className="mb-6 text-center">
                            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                                <UserPlus size={28} />
                            </div>

                            <Fieldset.Legend className="text-2xl font-bold text-purple-950">
                                Create your account
                            </Fieldset.Legend>

                            <Description className="mt-1 text-gray-500">
                                Create your profile and get started.
                            </Description>
                        </div>

                        <Fieldset.Group className="gap-5">

                            {/* Profile Image */}
                            <div className="flex flex-col items-center gap-3">

                                <div className="relative">
                                    {preview ? (
                                        <img
                                            name="image"
                                            src={preview}
                                            alt="Profile preview"
                                            className="h-28 w-28 rounded-full border-4 border-purple-200 object-cover shadow-md"
                                        />
                                    ) : (
                                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-purple-300 bg-purple-50 text-purple-400">
                                            <ImagePlus size={32} />
                                        </div>
                                    )}
                                </div>

                                <label
                                    htmlFor="image"
                                    className="cursor-pointer rounded-xl bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-200"
                                >
                                    Choose profile image
                                </label>

                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>

                            {/* Name */}
                            <TextField
                                isRequired
                                name="name"
                                validate={(value) => {
                                    if (value.length < 3) {
                                        return "Name must be at least 3 characters";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Name</Label>
                                <Input
                                    placeholder="Enter Your Name"
                                    variant="secondary"
                                />
                                <FieldError />
                            </TextField>

                            {/* Email */}
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                            >
                                <Label>Email</Label>
                                <Input
                                    placeholder="Enter Your Email"
                                    variant="secondary"
                                />
                                <FieldError />
                            </TextField>

                            {/* Password */}
                            <TextField
                                isRequired
                                name="password"
                                type="password"
                                minLength={8}
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
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
                                <Label>Password</Label>

                                <Input
                                    placeholder="Enter your password"
                                    variant="secondary"
                                />

                                <Description>
                                    At least 8 characters, 1 uppercase letter
                                    and 1 number.
                                </Description>

                                <FieldError />
                            </TextField>

                        </Fieldset.Group>

                        <Fieldset.Actions className="mt-6 grid">

                           <div className="flex gap-3 py-4">
 <Button
                                type="submit"
                                isDisabled={loading}
                                className="w-full bg-purple-600 text-white shadow-lg shadow-purple-200 hover:bg-purple-700"
                            >
                                {loading ? (
                                    <>
                                        <Loader2
                                            size={18}
                                            className="animate-spin"
                                        />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={18} />
                                        Create account
                                    </>
                                )}
                            </Button>

                            <Button
                                type="reset"
                                variant="tertiary"
                                className="w-full"
                                onPress={() => setPreview("")}
                            >
                                Cancel
                            </Button>
                    

                           </div>
                            {/* google login */}
                            <div>
                                <Button onPress={handleGoogleSignIn} className="w-full" variant="tertiary">
                                    <Icon icon="devicon:google" />
                                    Sign in with Google
                                </Button>
                            </div>

                        </Fieldset.Actions>

                    </Fieldset>
                </Form>

            </Surface>
        </div>
    );
};

export default SignUpPage;