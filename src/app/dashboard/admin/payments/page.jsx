
import React from "react";
import { Table } from "@heroui/react";
import { getPaymentHistory } from "@/lib/api/payment";

const PaymentPageByAdmin = async () => {
    const payments = await getPaymentHistory();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Payment History
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    View all Stripe payment histories across the platform.
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <Table>
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Payment history">
                            <Table.Header>
                                <Table.Column isRowHeader>User Email</Table.Column>
                                <Table.Column>Amount</Table.Column>
                                <Table.Column>Date</Table.Column>
                                <Table.Column>Session ID</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {payments?.map((payment) => (
                                    <Table.Row key={payment._id}>
                                        <Table.Cell>
                                            {payment.userEmail}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="font-semibold text-purple-600">
                                                ৳{payment.amount?.toLocaleString()}
                                            </span>
                                        </Table.Cell>

                                        <Table.Cell>
                                            {new Date(payment.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </Table.Cell>

                                        <Table.Cell>
                                            <span className="font-mono text-xs text-gray-500" title={payment.stripeSessionId}>
                                                {payment.stripeSessionId?.slice(12  , 24)}
                                            </span>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default PaymentPageByAdmin;
