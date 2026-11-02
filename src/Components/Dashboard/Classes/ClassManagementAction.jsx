"use client";

import { useState } from "react";
import { editStatus } from "@/lib/action/class";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ClassManagementAction = ({ cls }) => {
    const router = useRouter();

    const [isPending, setIsPending] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);


    const handleStatusUpdate = async (newStatus) => {
        try {
            setIsPending(true);

            const status = await editStatus(cls._id, newStatus);

            if (status.message) {
                toast.success(status.message);
            }

            if (
                status.modifiedCount === 1 ||
                status.deletedCount === 1 ||
                status.success === true
            ) {
                setOpenDialog(null);
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        } finally {
            setIsPending(false);
        }
    };


    return (
        <div className="flex flex-wrap gap-2">

            {/* Approve */}
            <AlertDialog
                isOpen={openDialog === "approve"}
                onOpenChange={(isOpen) =>
                    setOpenDialog(isOpen ? "approve" : null)
                }
            >
                <Button
                    isDisabled={isPending}
                    onPress={() => setOpenDialog("approve")}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
                >
                    Approve class
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="warning" />
                                <AlertDialog.Heading>
                                    Approve{" "}
                                    <span className="font-bold text-xl text-purple-600">
                                        {cls.name}
                                    </span>
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                Are you sure you want to approve this class?
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                    isDisabled={isPending}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    isDisabled={isPending}
                                    onPress={() =>
                                        handleStatusUpdate("approved")
                                    }
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white"
                                >
                                    {isPending ? "Approving..." : "Approve"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>

            {/* Reject */}
            <AlertDialog
                isOpen={openDialog === "reject"}
                onOpenChange={(isOpen) =>
                    setOpenDialog(isOpen ? "reject" : null)
                }
            >
                <Button
                    isDisabled={isPending}
                    onPress={() => setOpenDialog("reject")}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                    Reject
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                    Reject this class?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                Are you sure you want to reject {cls.name}?
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                    isDisabled={isPending}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    isDisabled={isPending}
                                    onPress={() =>
                                        handleStatusUpdate("rejected")
                                    }
                                    className="px-4 py-2 rounded-lg bg-orange-600 text-white"
                                >
                                    {isPending ? "Rejecting..." : "Reject"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>

            {/* Delete */}
            <AlertDialog
                isOpen={openDialog === "delete"}
                onOpenChange={(isOpen) =>
                    setOpenDialog(isOpen ? "delete" : null)
                }
            >
                <Button
                    isDisabled={isPending}
                    onPress={() => setOpenDialog("delete")}
                    variant="danger"
                >
                    Delete
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>
                                    Delete class permanently?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                Are you sure you want to permanently delete{" "}
                                {cls.name}?
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                    isDisabled={isPending}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    isDisabled={isPending}
                                    onPress={() =>
                                        handleStatusUpdate("delete")
                                    }
                                    className="px-4 py-2 rounded-lg bg-red-600 text-white"
                                >
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default ClassManagementAction;