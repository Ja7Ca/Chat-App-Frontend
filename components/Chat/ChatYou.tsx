import { FC } from "react";

interface ChatProps {
    data: {}
}

const ChatYou:FC<ChatProps> = ({data}) => {
    return (
        <div className="max-w-lg bg-slate-500 rounded-e-xl rounded-bl-xl p-3 self-start">
            {data.from || ''}
            <hr className='my-2'/>
            {data.message || ''}
        </div>
    );
}

export default ChatYou;
