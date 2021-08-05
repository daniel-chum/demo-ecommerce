import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Input } from '../components/ui'
import { useAuth } from "../lib/hooks/auth";

import cn from 'classnames'

export default function Profile() {

    const router = useRouter();

    const { user, getToken, isAuthenticated } = useAuth();

    const [selectedTab, setSelectedTab] = useState('Profile')

    const { email, first_name: firstName, last_name: lastName, username } = user

    useEffect(() => {

        const checkAuthentication = async () => {
            const resp = await getToken()

            if (!resp) {
                router.push("/");
                return;
            }
        }

        checkAuthentication()
    }, []);

    const OPTIONS = ['Profile', 'Orders', 'Purchase History', 'Notifications', 'Settings']

    return (
    <div className='bg-background'>
        <div className="font-rubik text-font-gray w-3/5 mx-auto py-10" style={{ minHeight: '80vh' }}>
            {isAuthenticated && (
                <>
                    <h1 className='text-3xl font-medium'>My account</h1>

                    <div className=' pt-10 flex flex-wrap gap-x-10'>

                        <nav className='self-start' >
                            <ul className='flex flex-col w-48 '>
                                {OPTIONS.map(option => {
                                    let style = option == selectedTab ? "bg-primary-bright text-secondary font-medium" : ''
                                    return (
                                        <li
                                            key={option}
                                            className={cn(style, 'py-3 pl-2 leading-none hover:bg-primary-bright hover:text-secondary transition duration-200 cursor-pointer')}
                                        >
                                            {option}
                                        </li>
                                    )
                                })}

                            </ul>
                        </nav>

                        <section className='space-y-5 p-6 flex-grow bg-white shadow'>
                            <h2 className='text-2xl font-medium'>Profile</h2>
                            <div className='flex gap-x-2'>
                                <Input fullBorder={true} className='py-1.5' type="text" label='First name' value={firstName || ''} onChange={() => { }} />
                                <Input fullBorder={true} className='py-1.5' type="text" label='Last name' value={lastName || ''} onChange={() => { }} />
                            </div>
                            <div className='flex gap-x-2'>
                                <Input fullBorder={true} className='py-1.5' type="text" label='Birth date' value='' onChange={() => { }} />
                                <Input fullBorder={true} className='py-1.5' type="text" label='Phone number' value='' onChange={() => { }} />
                            </div>
                            <Input fullBorder={true} className='py-1.5' type="text" label='Username' value={username || ''} onChange={() => { }} />
                            <Input fullBorder={true} className='py-1.5' type="text" label='Email address' value={email || ''} onChange={() => { }} />
                            <div>
                                <button
                                    className='relative mt-2 px-4 py-2 bg-secondary rounded-md  font-rubik font-medium text-white focus:outline-none'
                                >
                                    Save changes
                                </button>
                            </div>
                        </section>
                    </div>
                </>
            )}
        </div>
    </div>
    );
}
