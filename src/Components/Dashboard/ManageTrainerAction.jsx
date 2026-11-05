"use client"
import { updateRole } from '@/lib/action/user';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const ManageTrainerAction = ({ trainer }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDemotion = async () => {
        try {
            setLoading(true)

            const update = await updateRole(trainer?._id)

            if (update.modifiedCount === 1) {
                toast.success("Demotion Successful")
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error("Failed to demote trainer")
            }

        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <Button
                variant="secondary"
                onPress={() => setIsOpen(true)}
            >
                Demote to member
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />

                            <AlertDialog.Heading>
                                Demote <span className="font-bold">
                                    {trainer?.name}
                                </span> to member?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            Are you sure you want to demote this trainer?
                            Their role will be changed to member.
                        </AlertDialog.Body>

                        <AlertDialog.Footer>
                            <Button
                                variant="tertiary"
                                slot="close"
                                isDisabled={loading}
                            >
                                Cancel
                            </Button>

                            <Button
                                onPress={handleDemotion}
                                size="sm"
                                variant="outline"
                                className="border-purple-200 text-purple-600"
                                isDisabled={loading}
                            >
                                {loading ? "Demoting..." : "Demote"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    )
};

export default ManageTrainerAction;