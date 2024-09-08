export const getUser = "SELECT * FROM users";

export const getUserById = `select * from users where id=$1`;

export const emailExistInDB = `select s from users s where s.email = $1`;

export const registerUserInDB = `insert into users ( name, email, phone, address, role, image, dob ) values ($1, $2, $3, $4, $5, $6, $7)`;

export const deleteUserSqlQuery = `DELETE FROM users WHERE id = $1`;

export const updateUserSqlQuery =  `UPDATE users SET name=$1 , email=$2, phone=$3, address=$4, role=$5, image=$6, dob=$7 WHERE id=$8`;