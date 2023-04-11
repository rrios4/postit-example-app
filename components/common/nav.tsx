import Link from 'next/link'
import React from 'react'

type Props = {}

const Nav = (props: Props) => {
  return (
    <nav>
        <Link href={"/"}>
            <h1>Send it.</h1>
        </Link>
    </nav>
  )
}

export default Nav