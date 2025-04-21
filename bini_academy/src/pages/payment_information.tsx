import { HomeHeader } from "../components/homeheader"
import { Footer } from "../components/footer"
import { Card, Grid, NumberInput, Select, Text, Center, Checkbox, FileInput, Modal, Image } from "@mantine/core"
import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { IconCloudDownload } from "@tabler/icons-react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "@mantine/form"
import { useState } from 'react';
import { enrollUser } from "../supabase/api/enrollment"
import { getCurrentUser } from "../supabase/api/user"
import { useMutation } from "@tanstack/react-query"
import { notifications } from "@mantine/notifications"

export const PaymentInformation = () => {

    const {majorId} = useParams<{majorId: string}>()

    const enrollMutation = useMutation({
        mutationFn: async () => {
            const userId = (await getCurrentUser()).id;
            if (userId && paymentForm.values.amount) {
                await enrollUser(userId, majorId as string, parseFloat(paymentForm.values.amount));
            }
        },
        onSuccess: () => {
            notifications.show({
                title: 'Enrollment Successful',
                message: 'You have been successfully enrolled in the course.',
                color: 'green',
            })
            navigate('/subjectlist')
        },
        onError: (error) => {
            notifications.show({
                title: 'Enrollment Unsuccessful',
                message: `Error enrolling in the course. ${error.message}`,
                color: 'red',
            })
        }
    });

    const handleEnroll = async () => {
        enrollMutation.mutate();
    }

    const paymentForm = useForm({
        initialValues: {
            paymentMethod: '',
            amount: '',
            referenceNumber: '',
            proofOfPayment: null as File | null,
            agreedToTerms: false
        },
        validate: {
            proofOfPayment: (value) => (!value ? 'Proof of payment is required' : null),
        }
    });

    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleFileUpload = (file: File | null) => {
        paymentForm.setFieldValue('proofOfPayment', file);
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        } else {
            setPreviewUrl(null);
        }
    };

    const renderPreview = () => {
        const file = paymentForm.values.proofOfPayment;
        if (!file || !previewUrl) return null;

        if (file.type.startsWith('image/')) {
            return (
                <Image
                    src={previewUrl}
                    alt="Proof of Payment"
                    fit="contain"
                    className="max-h-[80vh]"
                />
            );
        } else if (file.type === 'application/pdf') {
            return (
                <iframe
                    src={previewUrl}
                    className="w-full h-[80vh]"
                    title="PDF Preview"
                />
            );
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <HomeHeader />
            <div className="flex-grow p-4">
                <Card shadow="sm" padding="lg" radius="md" withBorder className="max-w-3xl mx-auto">
                    <Card.Section className="p-4">
                        <Button 
                            color="orange" 
                            size="md" 
                            variant="light" 
                            className="w-auto inline-flex items-center gap-2" 
                            onClick={() => navigate(-1)}  // Changed to use history navigation
                        >
                            <IconArrowLeft size={16} />
                         
                        </Button>
                    </Card.Section>
                    
                    <p className="text-orange-500 font-bold text-2xl text-center mb-6">
                        Payment Information
                    </p>
                    
                    <Grid>
                        <Grid.Col span={6}>
                            <Select
                                label='Payment Method'
                                placeholder='Select payment method'
                                data={['GCash', 'MetroBank', 'UnionBank', 'PayPal']}
                                className="mb-4"
                                {...paymentForm.getInputProps('paymentMethod')}
                            />
                            <NumberInput
                                label="Enter Amount"
                                placeholder="₱0.00"
                                className="mb-4"
                                hideControls
                                prefix="₱ "
                                thousandSeparator=","
                                {...paymentForm.getInputProps('amount')}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NumberInput
                                label="Reference Number"
                                placeholder="Enter reference number"
                                className="mb-4"
                                hideControls
                                {...paymentForm.getInputProps('referenceNumber')}
                            />
                            <div className="space-y-2">
                                <Text size="sm" fw={500}>Proof of Payment</Text>
                                <div className="space-y-2">
                                    <FileInput
                                        placeholder="Upload proof of payment"
                                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                                        rightSection={<IconCloudDownload />}
                                        {...paymentForm.getInputProps('proofOfPayment')}
                                        onChange={handleFileUpload}
                                        error={paymentForm.errors.proofOfPayment}
                                        className="mb-2"
                                    />
                                    {paymentForm.values.proofOfPayment && (
                                        <Button
                                            variant="light"
                                            color="orange"
                                            size="sm"
                                            fullWidth
                                            onClick={() => setShowPreview(true)}
                                        >
                                            Preview Attachment
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Grid.Col>
                    </Grid>
                    
                    <div className="mt-6 space-y-4">
                        <Checkbox
                            {...paymentForm.getInputProps('agreedToTerms', { type: 'checkbox' })}
                            label={
                                <span className="flex items-center gap-1">
                                    By checking the box, you acknowledge that you have read, understood, and agreed to the
                                    <span 
                                        className="text-orange-500 cursor-pointer hover:underline ml-1" 
                                        onClick={() => navigate('/terms-and-conditions')}
                                    >
                                        terms and conditions
                                    </span>
                                </span>
                            }
                        />
                        
                        <Center>
                            <Button
                                color="orange"
                                disabled={!paymentForm.values.agreedToTerms || !paymentForm.values.proofOfPayment}
                                onClick={() => handleEnroll()}
                                size="md"
                            >
                                Submit
                            </Button>
                        </Center>
                    </div>
                </Card>
            </div>

            {/* Preview Modal */}
            <Modal
                opened={showPreview}
                onClose={() => setShowPreview(false)}
                title="Proof of Payment Preview"
                size="xl"
                centered
            >
                {renderPreview()}
            </Modal>

            <Footer />
        </div>
    );
};