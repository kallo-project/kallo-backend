import Classroom from '../models/Classroom';
import IClassroom from '../models/interfaces/IClassroom';

export default (options: object) => {
  return new Promise<IClassroom>((resolve, reject) => {
    Classroom.findOneAndDelete(options, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};
