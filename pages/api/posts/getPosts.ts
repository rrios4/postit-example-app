// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "GET"){
        // get all post
        try{
            const data = await prisma.post.findMany({
                include: {
                    user: true,
                    Comment: true
                },
                orderBy: {
                    createdAt: "desc"
                },
            })
            res.status(200).json(data)
        } catch(err){
            res.status(403).json({ error: "Error has occured while getting post"})
        }
    }
}
