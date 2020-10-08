// #region Import modules
import mongoose from 'mongoose';
import Classroom from '../models/Classroom';
import IClassroom from '../models/interfaces/IClassroom';
// #endregion

export default (
  //#region Set parameters
  name: String,
  class_code: String,
  limited_students: Boolean,
  max_students: Number,
  restricted_access: Boolean,
  allowed_sites: String[],
  test_mode: Boolean
  // #endregion
) => {
  return new Promise<IClassroom>((resolve, reject) => {
    new Classroom({
      _id: mongoose.Types.ObjectId(),
      name: name,
      class_code: class_code,
      limited_students: limited_students,
      max_students: max_students,
      restricted_access: restricted_access,
      allowed_sites: allowed_sites,
      test_mode: test_mode
    }).save((error: any, result: IClassroom) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};
