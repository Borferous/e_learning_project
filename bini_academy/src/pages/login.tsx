import { Button, Center, NumberInput } from "@mantine/core";
import axios from "axios";
import { useState } from "react";

import { userEndpoint } from "../api";
import { User, UserIdInput } from "../types";


export const LoginPage = () => {

    async function getAllUsers() {
        try {
            const response = await axios.get(userEndpoint.getAllUsers());
            console.log("All Users:", response.data);
            setFetchedUser(response.data);
        } catch (error: any) {
            console.error("Error fetching users:", error.response?.data || error.message);
        }
    }


    async function getUserById({ userId }: UserIdInput) {
        try {
            const response = await axios.get(userEndpoint.getUserById({ userId: userId }));
            console.log(`User ${userId}:`, response.data);
            setFetchedUser([response.data]);
        } catch (error: any) {
            console.error(`Error fetching user ${userId}:`, error.response?.data || error.message);
        }
    }

    const [idInput, setIdInput] = useState<number>(0);
    const [fetchedUser, setFetchedUser] = useState<User[] | null>(null);

    return (
        <Center>
            <Button onClick={getAllUsers}>Get All User</Button>

            <NumberInput placeholder="Enter User ID" value={idInput} onChange={(value) => setIdInput(value as number)}></NumberInput>
            <Button onClick={() => getUserById({ userId: idInput })}>Get</Button>

            <div className="flex flex-row">
                {
                    fetchedUser && (
                        fetchedUser.map((user) =>
                            (
                                <div key={user.user_id}>
                                    <h1>{user.name}</h1>
                                    <p>{user.email}</p>
                                </div>
                            )
                        )
                    )
                }
            </div>

        </Center>
    );
};
