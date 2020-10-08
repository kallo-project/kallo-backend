import { Response } from 'express';

const invalidMethodRes = (res: Response) => res.status(405).json({ error: 'Method not allowed!' });

export default invalidMethodRes;
