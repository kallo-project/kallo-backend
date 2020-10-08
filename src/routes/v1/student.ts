import mongoose from 'mongoose';
import cors from 'cors';

import express, { Request, Response } from 'express';
import { getClassroom } from '../../database/functions';
import invalidMethodRes from '../../utilities/invalidMethodRes';

const router = express.Router({ mergeParams: true });

router.use(cors({ methods: ['GET', 'DELETE'] }));
router.use(express.json());

// #region Router
router
  .route('/')
  .get(async (req: Request, res: Response) => {
    const { class_id, student_id } = req.params;
    const badRequest = () => res.status(400).json({ error: 'Bad request!' });

    if (!class_id || !student_id) return badRequest;

    try {
      const classroom = await getClassroom({ _id: class_id });

      if (!classroom) return badRequest;

      const index = classroom.students.map((e) => e._id).indexOf(student_id as any);

      if (index === -1) return badRequest;

      const student_name = classroom.students[index].name;

      // TODO: This is a HUGE security issue; replace filtering logs via their name to id.
      const logs = classroom.logs.filter((e) => e.message.startsWith(student_name));

      if (logs.length > 0) {
        res.json({ logs });
      } else res.status(400).json({ error: 'No logs found!' });
    } catch (e) {
      res.status(500).json({ error: `Internal server error: ${e.message}` });
    }
  })
  .delete(async (req: Request, res: Response) => {
    const { class_id, student_id } = req.params;
    const badRequest = () => res.status(400).json({ error: 'Bad request!' });

    if (!class_id || !student_id) return badRequest;

    try {
      const classroom = await getClassroom({ _id: class_id });
      const index = classroom.students.map((e) => e._id).indexOf(student_id as any);

      if (index === -1) return badRequest;

      classroom.logs.push({
        _id: mongoose.Types.ObjectId(),
        message: `You removed ${classroom.students[index].name} from this class session.`,
        created_at: new Date().toLocaleString()
      });
      classroom.students.splice(index, 1);

      await classroom.save();
      res.json({ message: 'Successfully deleted student!' });
    } catch (e) {
      res.status(500).json({ error: `Internal server error: ${e.message}` });
    }
  })
  .all((_, res: Response) => invalidMethodRes(res));
// #endregion

export default router;
