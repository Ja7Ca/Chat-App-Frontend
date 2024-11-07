"use client"

import AlertMessage from '@/components/Alert/AlertMessage';
import ChatMe from '@/components/Chat/ChatMe';
import ChatYou from '@/components/Chat/ChatYou';
import { Button } from 'flowbite-react';
import React, { ChangeEvent, useEffect, useState, KeyboardEvent, MouseEvent } from 'react';
import { IoIosSend } from "react-icons/io";
import { socket } from '@/lib/socket';

const Page = () => {
    const [group, setGroup] = useState('')
    const [connected, setConnected] = useState(false)
    const [message, setMessage] = useState<{status: string, from:string, success?:boolean, message:string}[]>([])
    const [socketId, setSocketId] = useState('')

    const [inputGroup, setInputGroup] = useState('')
    const [inputMessage, setInputMessage] = useState('')

    function joinGroup(inputGroup:string) {
        setMessage([])
        socket.emit("joinGroup", inputGroup)
        setConnected(true)
        setGroup(inputGroup)
    }

    socket.on("message", (transport: {status: string, from:string, success?:boolean, message:string}) => {
        setMessage([...message,transport])
      });

    function sendMessage(message:string) {
        socket.emit("groupMessage", group, message)
        setInputMessage('')
    }

    useEffect(() => {
        function onDisconnect() {
            setConnected(false);
        }

        socket.on('connect', () => {
            setSocketId(socket.id || '')
        })
    
        socket.on("disconnect", onDisconnect);
    
        return () => {
          socket.off("disconnect", onDisconnect);
        };
      }, [socket]);

    if(!connected){
        return ( 
        <div className="w-full h-full min-h-[100svh] flex justify-center items-center">
            <input 
                className="rounded-2xl px-2 text-black" 
                placeholder='Type Group Id' 
                value={inputGroup}
                onChange={(e : ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    setInputGroup(e.target.value)
                }}
                onKeyUp={(e : KeyboardEvent<HTMLInputElement>) => {
                    e.preventDefault()
                    if(e.key == 'Enter' && inputGroup){
                        joinGroup(inputGroup)
                        setInputGroup('')
                    }
                }}
                />
        </div>
        )
    }

    return (
        <div className="h-[100vh] overflow-hidden flex flex-col">
            <div className="p-3 grid grid-cols-3 items-center justify-between">
                <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                {group} - {socket.id}
                </h2>
                <p className='text-center'>Chat App</p>
                <Button color="failure" onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault()
                    socket.emit('leaveGroup', group)
                    setConnected(false)
                    setGroup('')
                    setMessage([])
                }}>Leave</Button>
            </div>
            <div className="p-3 overflow-x-hidden overflow-y-auto h-full bg-white flex flex-col-reverse">
                <div className="flex flex-col gap-2">
                {message.map((el: {status: string, from:string, success?:boolean, message:string}, i:number) => (
                    <>
                        {el.status == 'alert' ? (
                            <AlertMessage key={i} success={el.success || false} title={el.message} />
                        ) : (
                            <>
                            {el.from == socketId ? <ChatMe key={i} data={el}/> : <ChatYou key={i} data={el} />}
                            </>
                        )}
                    </>
                    // <RenderMessage data={el} socketId={socketId} key={i} />
                ))}
                </div>
            </div>
            <div className="p-3 bg-blue-100 flex gap-5">
                <input 
                    className="w-full rounded-2xl px-2 text-black" 
                    value={inputMessage}
                    onChange={(e : ChangeEvent<HTMLInputElement>) => {
                        e.preventDefault();
                        setInputMessage(e.target.value)
                    }}
                    onKeyUp={(e : KeyboardEvent<HTMLInputElement>) => {
                        e.preventDefault()
                        if(e.key == 'Enter' && inputMessage && socketId){
                            sendMessage(inputMessage)
                        }
                    }}
                />
                <Button color="blue" pill 
                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault()
                        if(inputMessage){
                            sendMessage(inputMessage)
                        }
                    }}
                    >
                        <IoIosSend className="text-2xl" />
                </Button>
            </div>
        </div>
    );
}

export default Page;
