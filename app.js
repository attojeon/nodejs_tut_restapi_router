/*
    인기있는 middleware 사용하기
        - morgan:
        - helmet:
        - custom logger:
        - debug
        - config
    뷰어엔진 사용하기
        - pug
    Router 객체 사용하기
*/
const express = require('express');
const Joi = require('joi');
const app = express();
const helmet = require('helmet');

const courses = require('./routes/courses');
const home = require('./routes/home');

// post를 사용할 때 json 포맷을 사용하기 위해 필요함.
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);
app.use('/', home);


console.log(`Env: ${app.get('env')}`);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port : ${port}...`));