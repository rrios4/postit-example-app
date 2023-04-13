
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === "GET"){
        const session = await getServerSession(req, res, authOptions)
        if(!session) return res.status(401).json({message: 'Please sign in! 🚨'})

        // Get Auth Users Post
        try{
            const data = prisma.post.findUnique({
                where: {
                    id: req.query.details,
                },
                include: {
                    user: true,
                    Comment: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            user: true
                        }
                    }
                }
            })
            res.status(200).json(data)
        } catch(err){
            res.status(403).json({ error: "Error has occured while fetching post details posts"})
        }
    }
}
