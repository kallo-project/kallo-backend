// #region Import modules
import mongoose from 'mongoose';
import { getClassroom } from '../database/functions';
// #endregion

export default async (data: string) => {
  // #region Variables
  const { class_id, student_id, url } = JSON.parse(data);
  const classroom = await getClassroom({ _id: class_id });
  // #endregion

  if (classroom) {
    const index = classroom.students.map((i) => i._id).indexOf(student_id);

    if (index !== -1) {
      classroom.logs.push({
        _id: mongoose.Types.ObjectId(),
        message: `${classroom.students[index].name} navigated to ${(url.indexOf('//') > -1
          ? url.split('/')[2]
          : url.split('/')[0]
        )
          .split(':')[0]
          .split('?')[0]
          .toLowerCase()
          .trim()}.`,
        created_at: new Date().toLocaleString()
      });
      await classroom.save();
    }
  }
};
