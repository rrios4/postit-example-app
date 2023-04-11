import React from 'react'
import Nav from './nav';
import Head from 'next/head';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
        <main>
            <Nav/>
            {props.children}
        </main>
    </>
  )
}

export default Layout