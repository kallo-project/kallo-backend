// #region Import modules
import mongoose from 'mongoose';
import { getClassroom } from '../database/functions';
// #endregion

export default async (data: string) => {
  // #region Variables
  const { class_id, student_id } = JSON.parse(data);
  const classroom = await getClassroom({ _id: class_id });
  // #endregion

  if (classroom) {
    const index = classroom.students.map((e) => e._id).indexOf(student_id);

    if (index !== -1) {
      classroom.logs.push({
        _id: mongoose.Types.ObjectId(),
        message: `${classroom.students[index].name} left this class session.`,
        created_at: new Date().toLocaleString()
      });
      classroom.students.splice(index, 1);

      await classroom.save();
    }
  }
};
