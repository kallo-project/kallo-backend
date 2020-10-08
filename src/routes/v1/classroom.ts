// #region Import modules
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { getClassroom, deleteClassroom } from '../../database/functions';
import invalidMethodRes from '../../utilities/invalidMethodRes';

const router = express.Router({ mergeParams: true });
// #endregion

// #region Set/define middlewares
router.use(cors({ methods: ['GET', 'DELETE'] }));
router.use(express.json());

const verifyClassID = (req: Request, res: Response, next: NextFunction) => {
  if (req.params.class_id.length != 24) res.status(400).json({ error: 'Invalid class ID!' });
  else next();
};
// #endregion

// #region Router
router
  .route('/')
  .get(verifyClassID, async (req: Request, res: Response) => {
    try {
      const classroom = await getClassroom({ _id: req.params.class_id });

      if (!classroom) res.status(400).json({ error: 'Invalid classroom ID!' });

      res.json({
        id: classroom._id,
        name: classroom.name,
        class_code: classroom.class_code,
        limited_students: classroom.limited_students,
        max_students: classroom.max_students,
        restricted_access: classroom.restricted_access,
        allowed_sites: classroom.allowed_sites,
        test_mode: classroom.test_mode,
        connection_logs: classroom.connection_logs,
        logs: classroom.logs.map((i) => ({ id: i._id, message: i.message, created_at: i.created_at })),
        students: classroom.students.map((i) => ({ id: i._id, name: i.name, joined_at: i.joined_at }))
      });
    } catch (e) {
      res.status(500).json({ error: `Internal server error: ${e.message}` });
    }
  })
  .delete(verifyClassID, async (req: Request, res: Response) => {
    try {
      const classroom = await getClassroom({ _id: req.params.class_id });

      if (!classroom) return res.status(400).json({ error: 'Classroom not found!' });

      await deleteClassroom({ _id: classroom._id });
      res.json({ message: 'Successfully deleted class!' });
    } catch (e) {
      res.status(500).json({ error: `Internal server error: ${e.message}` });
    }
  })
  .all((_, res: Response) => invalidMethodRes(res));
// #endregion

export default router;
