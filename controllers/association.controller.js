const { QueryTypes } = require("sequelize");
const db = require("../models");
const Student = db.Student;
const Teacher = db.Teacher;
const Course = db.Course;
const Enrollment = db.Enrollment;

const many = async (req, res) => {
  const data = {};
  let studentData = await Student.create({ name: "Priya" });
  let TeacherData = await Teacher.create({ name: "nena" });
  let course = await Course.create({ name: "nodejs" });
  if (course && course.id && studentData && studentData.id) {
    await Enrollment.create({
      enrollId: studentData.id,
      courseId: course.id,
      enrollType: "student",
    });
  }
  if (course && course.id && TeacherData && TeacherData.id) {
    await Enrollment.create({
      enrollId: TeacherData.id,
      courseId: course.id,
      enrollType: "teacher",
    });
  }
  res.status(200).json({ data: course });
};

// Update a Course's name
const courseId = 1;

const updatedCourse =  async (req, res) => {
const update= await Course.findByPk(courseId);
if (updatedCourse) {
  updatedCourse.name = "Updated Course Name";
  await updatedCourse.save();
}
}

const deletedCourse =  async (req, res) => {

const deleted = await Course.findByPk(courseId);
if (deletedCourse) {
  await deletedCourse.destroy();
}
}

const courses =  async (req, res) => {
const course = await Course.findAll({
  include: [
    {
      model: Teacher,
      through: {
        attributes: [],
      },
    },
    {
      model: Student,
      through: {
        attributes: [],
      },
    },
  ],
});
}

const updateEnrollment = async (req, res) => {
  const { enrollmentId, newCourseId } = req.body;
  try {
    const enrollment = await Enrollment.findByPk(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    await enrollment.update({ courseId: newCourseId });
    return res.status(200).json({ message: 'Enrollment updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const deleteEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const enrollment = await Enrollment.findByPk(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    await enrollment.destroy();
    return res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    return res.status(200).json({ enrollments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  many,
  courses,
  deletedCourse,
  updatedCourse,
 
};
