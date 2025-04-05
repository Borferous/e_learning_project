import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, Grid, NumberInput, Select, Text, Center, Checkbox } from "@mantine/core"
import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { IconCloudDownload } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import { useForm } from "@mantine/form"

export const PaymentInformation = () => {

    const paymentForm = useForm({

    })

    console.log(paymentForm)

    const navigate = useNavigate()
    return (
        <>
            <Header />
            <Center className="m-4 p-4">
                <Card shadow={"sm"} padding={"lg"} radius={"md"} withBorder>
                    <Card.Section className="p-4">
                        <Button color="orange" size="md" variant="light" className="w-auto inline-flex" onClick={() => navigate('/courseoverview')}><IconArrowLeft /></Button>
                    </Card.Section>
                    <p className="text-orange-500 font-bold text-2xl flex justify-center">Payment Information</p>
                    <Grid>
                        <Grid.Col span={6}>
                            <Select
                                label='Payment Method'
                                placeholder='Bayad2 sad no'
                                data={['gCash Christ', 'Metroman Bank']}
                                className="m-5"
                            />
                            <NumberInput
                                label="Enter Amount"
                                placeholder="enter total amount"
                                className="m-5"
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <NumberInput
                                label="Reference Number"
                                placeholder="reference number"
                                className="m-5"
                            />
                            <div className="m-5">
                                <Text size="sm" m={2} fw={500}>Proof of Payment</Text>
                                <Button
                                    variant="light"
                                    leftSection={<IconCloudDownload />}
                                    color="orange"
                                >
                                    Attach File
                                </Button>
                            </div>
                        </Grid.Col>
                    </Grid>

                    <Center>
                        <Button
                            color="orange"
                            disabled={!paymentForm.values.agreedToTerms}
                        >
                            Submit
                        </Button>
                    </Center>

                    <Checkbox
                        defaultChecked={false}
                        onChange={(event) => paymentForm.setFieldValue('agreedToTerms', event.currentTarget.checked)}
                        label={
                            <>
                                By Checking the box, you acknowledge that you have read, understood, and agreed to the 
                                <span className="text-orange-500" onClick={() => navigate('/terms-and-conditions')}> terms and conditions</span>
                            </>
                        }
                    />
                </Card>
            </Center>
            <Footer />
        </>
    )
}