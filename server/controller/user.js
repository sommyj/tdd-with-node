import users from '../model/users';

class UserController {
  static list(req, res) {
    res.status(200).send(users);
  }

  static create(req, res) {
    const {firstname, password,email} = req.body;

    if(!firstname || !password || !email) {
      return res.status(422).send({message: 'invalid input'});
    }
    users.push(req.body);

    const user = users.find(user => user === req.body);
    res.status(201).send(user);
  }
}

export default UserController;
