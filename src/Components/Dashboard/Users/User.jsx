"use client"
import { userRole, userStatus } from '@/lib/action/user';
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

const UserStatusManagement = ({ user }) => {
    const router = useRouter()
    const [blockOpen, setBlockOpen] = useState(false)
    const [adminOpen, setAdminOpen] = useState(false)

    const handleBlock = async () => {
        try {
            const status = await userStatus(user._id, user.status)

            if (status.modifiedCount === 1) {
                toast.success(
                    `User ${user.status === "active" ? "blocked" : "activated"} successfully`
                )
                setBlockOpen(false)
                router.refresh()
            }

        } catch (err) {
            toast.error("Failed to update user status")
            console.error(err)
        }
    }

    const makeAdmin = async () => {
        try {
            const role = await userRole(user._id, user.role)

            if (role.modifiedCount === 1) {
                toast.success("User role updated to admin successfully")
                setAdminOpen(false)
                router.refresh()
            }
        } catch (err) {
            toast.error("Failed to update user role")
            console.error(err)
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-2">

            {/* Block / Unblock */}
            <AlertDialog>
                <Button
                    size="sm"
                    variant="outline"
                    onPress={() => setBlockOpen(true)}
                    className={user.status === "active"
                        ? "border-red-500 text-red-600"
                        : "border-green-500 text-green-600"
                    }
                >
                    {user.status === "active" ? "Block" : "Unblock"}
                </Button>

                <AlertDialog.Backdrop
                    isOpen={blockOpen}
                    onOpenChange={setBlockOpen}
                >
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon
                                    status={user.status === "active" ? "danger" : "success"}
                                />
                                <AlertDialog.Heading>
                                    {user.status === "active"
                                        ? "Block this user?"
                                        : "Unblock this user?"
                                    }
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p className="text-sm text-gray-500">
                                    {user.status === "active"
                                        ? "This user will no longer be able to access their account until you unblock them."
                                        : "This user will regain access to their account after being unblocked."
                                    }
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onPress={handleBlock}
                                    className={user.status === "active"
                                        ? "bg-red-600 text-white"
                                        : "bg-green-600 text-white"
                                    }
                                >
                                    Confirm {user.status === "active" ? "Block" : "Unblock"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>


            {/* Make Admin */}
            {user.role !== "admin" && (
                <AlertDialog>
                    <Button
                        variant="secondary"
                        onPress={() => setAdminOpen(true)}
                    >
                        Make Admin
                    </Button>

                    <AlertDialog.Backdrop
                        isOpen={adminOpen}
                        onOpenChange={setAdminOpen}
                    >
                        <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-100">
                                <AlertDialog.CloseTrigger />

                                <AlertDialog.Header>
                                    <AlertDialog.Icon status="warning" />
                                    <AlertDialog.Heading>
                                        Upgrading to admin?
                                    </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body>
                                    <p className="text-sm text-gray-500">
                                        This user will receive administrator privileges
                                        and gain access to admin features.
                                    </p>
                                </AlertDialog.Body>

                                <AlertDialog.Footer>
                                    <Button
                                        slot="close"
                                        variant="tertiary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        onPress={makeAdmin}
                                        className="bg-purple-600 text-white"
                                    >
                                        Upgrade to Admin
                                    </Button>
                                </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                        </AlertDialog.Container>
                    </AlertDialog.Backdrop>
                </AlertDialog>
            )}

        </div>
    );
};

export default UserStatusManagement;