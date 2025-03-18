import { useState } from "react";

type FormState = Record<string, any>;

export const useForm = (initialValues: FormState) => {
    const [formValues, setFormValues] = useState<FormState>(initialValues);
    const setValue = (key: string, value: any) => {
        setFormValues(prev => ({ ...prev, [key]: value }));
    };
    return { formValues, setValue };
};
