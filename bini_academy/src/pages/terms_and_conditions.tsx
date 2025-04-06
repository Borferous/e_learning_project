import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Card, Center } from "@mantine/core"
import { Button } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"


export const TermsAndCondition = () => {
    const navigate = useNavigate()

    const terms = [
        {title: 'Accuracy of Information', info: 'All information provided must be accurate and complete. Any false details may result in application rejection or enrollment cancellation.'},
        {title: 'Admission Requirements', info: 'Enrollment is subject to meeting the school’s admission criteria and document submission.'},
        {title: 'Payment and Fees', info: 'Tuition and other fees must be paid according to the selected payment plan. Failure to pay may result in enrollment suspension.'},
        {title: 'Refund Policy', info: 'Fees are non-refundable unless stated otherwise in the school’s refund policy.'},
        {title: 'Class Attendance', info: 'Students must attend classes regularly and follow the school’s code of conduct.'},
        {title: 'Use of Personal Data', info: 'Your personal information will be used solely for enrollment and academic purposes, following data protection policies.'},
        {title: 'Program Changes', info: 'The school reserves the right to modify course schedules, instructors, or program content as needed.'},
        {title: 'Withdrawal and Dismissal', info: 'Students may withdraw by submitting a formal request. The school reserves the right to dismiss students for academic misconduct or policy violations.'},
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