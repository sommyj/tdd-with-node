import chai from 'chai';
import supertest from 'supertest';
import chaiHttp from 'chai-http';

import app from '../app';
import users from '../server/model/users';

// To test our API endpoints
chai.should();
chai.use(chaiHttp);
const request = supertest(app); //To test our http enpoints

describe('Users', () => {
  beforeEach((done)=>{
    users.splice(0, users.length);
    done();
  });

  describe('/GET user', () => {
    it('it should get all users without data', (done) => {
      request.get('/api/v1/user').end((err,res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });

    it('it should get all users with data',(done) => {
      users.push({ id: '1',
                  firstname: 'somto',
                  lastname: 'ikwuoma',
                  password: '123',
                  email: 'email@gmail.com'
                });
      request.get('/api/v1/user').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        res.body.should.have.property(0).property('firstname').eql('somto');
        done();
      })
    })
  });

  describe('/POST user', () => {
    it('it should crete a user', (done) => {
      const user = { id: '1',
                     firstname: 'somto',
                     lastname: 'ikwuoma',
                     password: '123',
                     email: 'email@gmail.com' };

      request.post('/auth/v1/signup').send(user)
             .end((req, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    res.body.should.have.property('firstname').eql('somto');
                    res.body.should.have.property('email').eql('email@gmail.com');
                    done();
                  });
    });

    it('it should not create a user without firstname', (done) => {
      const user = { id: '1',
                     firstname: '',
                     lastname: 'ikwuoma',
                     password: '123',
                     email: 'email@gmail.com' };
      request.post('/auth/v1/signup').send(user).end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('message').eql('invalid input');
        done();
      })
    })
  });
});
