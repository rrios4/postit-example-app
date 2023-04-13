// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import prisma from '../../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "PATCH"){
        const session = await getServerSession(req, res, authOptions)
        if(!session) return res.status(401).json({message: 'Please sign in! 🚨'})
        const { postId } = req.query
        const title = req.body
        // Update a post
        try{
            // const response = await prisma.post.update({
            //   where: {
            //     id: postId,
            //   },
            //   data: {
            //     title: title
            //   }
            // })
            res.status(200).json(postId)
        } catch(err: any){
            res.status(403).json({ error: err})
        }
    }
}
