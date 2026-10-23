"use client"
import { deleteClass } from '@/lib/action/class';
import { AlertDialog, Button } from '@heroui/react';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';


const DeleteClass = ({ cls }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const id = cls._id
    const handleDeleteClass = async (e) => {
        setLoading(true)
        try {
            e.preventDefault()
            const deleteOne = await deleteClass(id)
            if (deleteOne.deletedCount) {
                toast.success(`Successfully deleted ${cls.name}`, {
                    style: {
                        color: "red"
                    }
                })

            }
        } catch (error) {
            console.log(error)
        } finally {
            router.refresh()
        }
    }
    return (
        <div>
            <AlertDialog>
                <Button variant="danger" >Delete Class</Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete <span className='font-semibold'>
                                    {cls?.name}
                                </span> permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete <strong>{cls?.name}</strong> and all of its
                                    data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button slot="close" variant="danger" onClick={handleDeleteClass}>
                                    <Trash /> {loading ? "Deleting class..." : "Delete Class"}
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default DeleteClass;