
export const imageUpload = async (image) => {
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

    if (!res.ok || !result.success) {
        throw new Error("Image upload failed");
    }

    return result.data.display_url;
};
