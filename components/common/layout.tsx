import React from 'react'
import Nav from './nav';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast'

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
        <main className='mx-4 md:mx-48 xl:mx-96'>
            <Nav/>
            <Toaster/>
            {props.children}
        </main>
    </>
  )
}

export default Layout