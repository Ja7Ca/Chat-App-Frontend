import { FC } from "react";

interface ChatProps{
    data: {}
}

const ChatMe:FC<ChatProps> = ({data}) => {
    return (
        <div className="max-w-lg bg-blue-500 rounded-s-xl rounded-br-xl p-3 self-end">
            {data.message || ''}
        </div>
    );
}

export default ChatMe;
