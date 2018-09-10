const express = require('express');
const Joi = require('joi');
const router = express.Router();


const courses = [
    { id: 1, name: 'C Language'},
    { id: 2, name: 'Javascript Language'},
    { id: 3, name: 'Python Language'}
];


router.get('/', (req, res) => {
    // To read all the courses 
    // Return the courses
    res.send(courses);
});


router.post('/', (req, res) => {
    // Validation input message
    const { error } = validateCourse(req.body);
    console.log(error);
    if( error ) return res.status(400).send(error.details[0].message);

    // Create the course and return the course object
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.get('/:id', (req, res) => {
    // Lookup the course
    // If course not found return 404, 
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if( !course ) return res.status(404).send('The course with the given ID was not found. ');

    // Else return the course object
    res.send(course);
});


router.put('/:id', (req, res) => {
    // Lookup the course
    // If course not found return 404, 
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if( !course ) return res.status(404).send('The course with the given ID was not found. ');

    /*
    const result = validateCourse(course);
    if( result.error ) return res.status(400).send(result.error.details[0].message);
    // 위와 같은 코드를 javascript destruturing 을 사용하여아래와 같이 수정할 수 있다. => 권장.
    */
   const { error } = validateCourse(req.body);
   console.log(error);
   if( error ) return res.status(400).send(error.details[0].message);

    // otherwise update it and return the updated object
    course.name = req.body.name;
    res.send(course);
});


router.delete('/:id', (req, res) => {
    // Lookup the course
    // If course not found return 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if( !course ) return res.status(404).send('The course with the given ID was not found. ');

    // otherwise delete it
    // return the deleted object
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.send(course);
});


function validateCourse(course_object) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course_object, schema);
};


module.exports = router;