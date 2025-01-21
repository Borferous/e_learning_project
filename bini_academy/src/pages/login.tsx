import { Fieldset, TextInput, Button } from "@mantine/core";

export const LoginPage = () => {
    return (
        <div>
            <Fieldset legend="Login" className="w-1/2">
                <TextInput label="Username" placeholder="Enter username"></TextInput>
                <TextInput label="Password" placeholder="Enter password"></TextInput>
                <Button className="my-2">Login</Button>
            </Fieldset>
        </div>
    );
};

