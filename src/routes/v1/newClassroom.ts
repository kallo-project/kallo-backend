// #region Import modules
import request from 'request';
import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';
import { createClassroom } from '../../database/functions';
import invalidMethodRes from '../../utilities/invalidMethodRes';

const router = express.Router();
// #endregion

// #region Set middlewares
router.use(cors({ methods: ['POST'] }));
router.use(express.json());
// #endregion

// #region Methods

const generateKey = () => {
  return new Promise<string>((resolve) => {
    const length = 5;
    let result = '';

    while (result.length !== 5)
      result = Math.floor(
        Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
      ).toString();

    resolve(result);
  });
};
// #endregion

// #region Router
router
  .route('/')
  .post(
    async (req: Request, res: Response, next: NextFunction) => {
      const captchaResponse = req.body.captcha_response;

      if (typeof captchaResponse !== 'string' || captchaResponse.trim().length === 0)
        return res.status(403).json({ error: 'Invalid ReCaptcha response!' });

      request(
        {
          url: 'https://www.google.com/recaptcha/api/siteverify',
          qs: {
            secret: process.env.G_SECRET,
            response: captchaResponse,
            remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
          }
        },
        (error, response, body) => {
          if (error || response.statusCode !== 200 || JSON.parse(body).success === false)
            res.status(403).json({ error: 'Invalid ReCaptcha response!' });
          else next();
        }
      );
    },
    async (req: Request, res: Response) => {
      // #region Verify content type
      if (req.headers['content-type'] !== 'application/json')
        return res.status(415).json({ error: 'JSON content expected!' });
      // #endregion

      // #region Define variables
      const name = req.body.name;
      const limitedStudents = req.body.limited_students;
      const restrictedAccess = req.body.restricted_access;
      const testMode = req.body.test_mode;
      // #endregion

      // #region Validate variables
      if (
        typeof name !== 'string' ||
        typeof limitedStudents !== 'boolean' ||
        typeof restrictedAccess !== 'boolean' ||
        typeof testMode !== 'boolean'
      )
        return res.status(400).json({ error: 'Bad request!' });
      // #endregion

      // #region Push to database
      try {
        const classroom = await createClassroom(
          name,
          await generateKey(),
          limitedStudents,
          limitedStudents ? req.body.max_students || 0 : 0,
          restrictedAccess,
          restrictedAccess ? req.body.allowed_sites || [] : [],
          testMode
        );

        res.json({ class_id: classroom._id });
      } catch (e) {
        res.status(500).json({ error: `Internal server error: ${e.message}` });
      }
      // #endregion
    }
  )
  .all((_, res: Response) => invalidMethodRes(res));
// #endregion

export default router;
