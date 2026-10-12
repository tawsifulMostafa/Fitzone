"use client";

import { useEffect, useState } from "react";
import { Button, toast } from "@heroui/react";
import { Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL;

const ClassDetailsActions = ({ classId , token }) => {
      const headers = token ? { authorization: `Bearer ${token}` } : {};
      console.log(headers , classId)
    const router = useRouter();

    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [checking, setChecking] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    
    useEffect(() => {
        const checkUserActivity = async () => {
            try {
                const [bookingRes, favoriteRes] = await Promise.all([
                    fetch(`${API}/api/bookings/check/${classId}`, {
                      headers,
                    }),
                    fetch(`${API}/api/favorites/check/${classId}`, {
                       headers,
                    }),
                ]);

                if (bookingRes.ok) {
                    const bookingData = await bookingRes.json();
                    setAlreadyBooked(bookingData.alreadyBooked);
                }

                if (favoriteRes.ok) {
                    const favoriteData = await favoriteRes.json();
                    setIsFavorite(favoriteData.isFavorite);
                }
            } catch (error) {
                console.error("Failed to check booking/favorites:", error);
            } finally {
                setChecking(false);
            }
        };

        checkUserActivity();
    }, [classId]);

    const handleBooking = async () => {
        if (alreadyBooked) {
            toast.danger("You have already booked this class.");
            return;
        }

        setBookingLoading(true);
        let redirecting = false;

        try {
            const checkoutRes = await fetch(`${API}/api/checkout`, {
                method: "POST",
                headers :
                { "Content-Type": "application/json" , ...headers },
                body: JSON.stringify({ classId }),
            });

            if (checkoutRes.status === 401) {
                router.push("/signIn");
                return;
            }

            const checkoutData = await checkoutRes.json();

            if (!checkoutRes.ok) {
                throw new Error(checkoutData.error || "Could not start payment.");
            }

            redirecting = true;
            window.location.href = checkoutData.url; // Stripe page e jabe
        } catch (error) {
            console.error(error);
            toast.danger(error.message || "Something went wrong.");
        } finally {
            if (!redirecting) setBookingLoading(false);
        }
    };

    const handleFavorite = async () => {
        if (isFavorite) {
            toast.success("This class is already in your favorites.");
            return;
        }

        setFavoriteLoading(true);

        try {
            const response = await fetch(`${API}/api/favorites`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" , ...headers },
               
                body: JSON.stringify({ classId }),
            });

            if (response.status === 401) {
                router.push("/signIn");
                return;
            }

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) {
                    setIsFavorite(true);
                    toast.success("This class is already in your favorites.");
                    return;
                }

                throw new Error(data.message || "Failed to add favorite.");
            }

            setIsFavorite(true);
            toast.success("Successfully added to your favorites!");
        } catch (error) {
            toast.danger(error.message || "Could not save this class.");
        } finally {
            setFavoriteLoading(false);
        }
    };

    return (
        <div className="mt-7 space-y-3">
            <Button
                className="h-12 w-full rounded-xl bg-purple-700 font-bold text-white hover:bg-purple-800"
                isDisabled={checking || bookingLoading}
                onPress={handleBooking}
            >
                {checking || bookingLoading ? (
                    <Loader2 className="animate-spin" size={18} />
                ) : alreadyBooked ? (
                    "Already Booked"
                ) : (
                    "Book Now"
                )}
            </Button>

            <Button
                variant="bordered"
                className={`h-12 w-full rounded-xl border-purple-200 font-bold ${isFavorite
                        ? "bg-purple-50 text-purple-800"
                        : "text-purple-700 hover:bg-purple-50"
                    }`}
                isDisabled={checking || favoriteLoading}
                onPress={handleFavorite}
                startContent={
                    favoriteLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                    )
                }
            >
                {favoriteLoading
                    ? "Saving..."
                    : isFavorite
                        ? "Saved to Favorites"
                        : "Add to Favorites"}
            </Button>
        </div>
    );
};

export default ClassDetailsActions;