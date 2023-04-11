import React from 'react'
import Head from 'next/head';

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
        <main>
            {props.children}
        </main>
    </>
  )
}

export default Layout