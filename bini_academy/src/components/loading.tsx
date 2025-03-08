interface LoadingProps {
    width?: number;
    height?: number;
    padding?: number;
}

export const Loading = ({ width = 32, height = 32, padding = 8 }: LoadingProps) => {
    return (
        <div className="flex justify-center items-center" style={{ padding }}>
            <div
                className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                style={{ width, height, borderWidth: 4 }}
            ></div>
        </div>
    );
};
