"use client"
import { postForum } from '@/lib/action/forum';
import { imageUpload } from '@/lib/action/image';
import { Button, Description, FieldError, Form, Input, Label, TextArea, TextField } from '@heroui/react';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';


const AddForum = ({ role }) => {
    const router = useRouter()
    const [preview, setPreview] = useState()
    const [loading, setLoading] = useState(false)
    const handleSubmitForum = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const postData = Object.fromEntries(formData.entries());

            const image = formData.get("image");
            const imageUrl = await imageUpload(image);

            postData.image = imageUrl;


            const forumPost = await postForum(postData);
            if (forumPost.insertedId) {
                toast.success("Post uploaded successfully", {
                    style: {
                        color: "green"
                    }
                })
            }
        } catch (error) {
            console.error(error);
            toast.error(error)
        } finally {
            router.push(`/dashboard/${role}/my-post` )
            setLoading(false);
            
        }
    };
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };
    return (
        <div>
            <Form className="w-9/12 justify-center mx-auto border border-purple-200 p-5 " onSubmit={handleSubmitForum}>
                <section className="rounded-2xl border border-default-200 bg-background p-5 shadow-sm sm:p-6">
                    <div className="mb-5">
                        <h2 className="font-semibold text-foreground">
                            Post Forum Cover Image
                        </h2>
                        <p className="mt-1 text-sm text-default-500">
                            Upload an image to represent your post.
                        </p>
                    </div>

                    <label
                        htmlFor="image"
                        className="group flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-default-300 bg-default-50 transition hover:border-purple-400 hover:bg-purple-50/50"
                    >
                        {preview ? (
                            <Image
                                width={400}
                                height={400}
                                src={preview}
                                alt="Class cover preview"
                                className="h-64 w-full object-cover"
                            />
                        ) : (
                            <>
                                <div className="mb-3 rounded-2xl bg-purple-100 p-4 text-purple-700 transition group-hover:scale-105">
                                    <Upload size={27} />
                                </div>

                                <p className="text-sm font-semibold text-foreground">
                                    Click to upload class image
                                </p>

                                <p className="mt-2 text-xs text-default-500">
                                    PNG, JPG or WEBP
                                </p>
                            </>
                        )}
                    </label>

                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="hidden"
                    />

                    {preview && (
                        <button
                            type="button"
                            onClick={() => {
                                setPreview("");
                                document.getElementById("image").value = "";
                            }}
                            className="mt-3 text-sm font-medium text-danger"
                        >
                            Remove image
                        </button>
                    )}
                </section>
                <TextField>
                    <Label>Title</Label>

                    <Input
                        name="title"
                        type="text"
                        required
                        placeholder="Post title"
                    ></Input>
                </TextField>
                <TextField
                    isRequired
                    name="description"
                    validate={(value) => {
                        if (value.length < 10) {
                            return "Description must be at least 10 characters";
                        }

                        return null;
                    }}
                >
                    <Label>Description</Label>
                    <TextArea
                        placeholder="Tell us about the room..."
                        variant="secondary"
                        className="min-h-32"
                    />

                    <Description>
                        Minimum 10 characters
                    </Description>
                    <FieldError />
                </TextField>
                <Button type="submit" className={"w-full m-4 p-4 bg-purple-400 hover:bg-purple-700" }>{loading ? "Posting..." : "Post"}</Button>
            </Form>
        </div>
    );
};

export default AddForum;