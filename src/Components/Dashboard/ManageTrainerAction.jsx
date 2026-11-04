"use client"
import { updateRole } from '@/lib/action/user';
import { AlertDialog, Button } from '@heroui/react';
import React from 'react';

const ManageTrainerAction = ({ trainer }) => {
    console.log(trainer);
    const handleDemotion = async () => {
        const trainerId = trainer?._id
        const update = await updateRole(trainerId)
        console.log(update);

    }
    return (
        <div>
            <AlertDialog>
                <Button variant="secondary">Demote to member</Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Demote <span className='p-2 font-bold'>{trainer.name}</span>
                                    to member?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={handleDemotion}
                                    size="sm"
                                    variant="outline"
                                    className="border-purple-200 text-purple-600"
                                >
                                    Manage
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>

        </div>
    );
};

export default ManageTrainerAction;