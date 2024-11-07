import { FC } from "react";

interface AlertProps {
    title: string,
    success: boolean,
}

const AlertMessage:FC<AlertProps> = ({title, success= false}) => {
    return (
        <div className={`bg-${success ? 'green' : 'rose'}-400 text-black px-2 text-center rounded-xl`}>{title}</div>
    );
}

export default AlertMessage;
