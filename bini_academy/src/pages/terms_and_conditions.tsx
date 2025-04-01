import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, Center } from "@mantine/core"
import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"


export const TermsAndCondition = () => {
    const navigate = useNavigate()

    const terms = [
        {title: 'Accuracy of Information', info: 'Hello world'},
        {title: 'Admission Requirements', info: 'Hello world'},
        {title: 'Payment and Fees', info: 'Hello world'},
        {title: 'Refund Policy', info: 'Hello world'},
        {title: 'Class Attendance', info: 'Hello world'},
        {title: 'Use of Personal Data', info: 'Hello world'},
        {title: 'Program Changes', info: 'Hello world'},
        {title: 'Withdrawal and Dismissal', info: 'Hello world'},
    ]

    return (
        <>
            <Header />
            <Center className="m-4 p-4">
                <Card shadow={"sm"} padding={"lg"} radius={"md"} withBorder>
                    <Card.Section className="p-4">
                        <Button color="orange" size="md" variant="light" className="w-auto inline-flex" onClick={() => navigate('/payment-information')}><IconArrowLeft /></Button>
                    </Card.Section>
                    <p className="text-orange-500 font-bold text-2xl flex justify-center">Terms and Conditions</p>
                    <p className="text-gray-950 font-bold text-mm flex justify-center">By Submitting this application, you agree to the following terms and conditions:</p>

                    {terms.map((condition, key)=>(
                        <p className="text-sm text-gray-950"><span className="font-bold">{key + 1}. {condition.title}</span> - {condition.info}</p>
                    ))}

                
                </Card>
            </Center>
            <Footer />
        </>
    )
}