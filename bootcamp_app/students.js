const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "bootcampx"
});

// pool
//   .query(
//     `
// SELECT students.id, students.name, cohorts.name
// FROM students
// JOIN cohorts ON cohorts.id = students.cohort_id
// LIMIT 5;
// `
//   )
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => console.error("query error", err.stack));

// pool
//   .query(
//     `
//   SELECT students.id as student_id, students.name as name, cohorts.name as cohort
//   FROM students
//   JOIN cohorts ON cohorts.id = cohort_id
//   LIMIT 5;
//   `
//   )
//   .then(res => {
//     res.rows.forEach(user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//     });
//   });

// pool
//   .query(
//     `
// SELECT students.id, students.name, cohorts.name as cohort_name
// FROM students
// JOIN cohorts ON cohorts.id = students.cohort_id
// WHERE cohorts.name LIKE '${process.argv[2]}%'
// LIMIT ${process.argv[3]};
//  `
//   )
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
//   });
// });

//Changing the query to prevent sql injection
const queryString = `
  SELECT students.id, students.name, cohorts.name as cohort_name
  FROM students
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`;

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
//Storing malicious values
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values).then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  });
});
