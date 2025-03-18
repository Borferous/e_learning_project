import { Loader } from "@mantine/core";

interface LoadingProps {
    size? : string,
    padding?: number;
}

export const Loading = ({ size = 'xl', padding = 8 }: LoadingProps) => {
    return (
        <div className="flex justify-center items-center" style={{ padding }}>
            <Loader color="orange" size={size} type="dots"/>
        </div>
    );
};
