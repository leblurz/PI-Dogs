/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const app = require('../../src/app.js');

describe ('GET /DOGS', () => {
  it ('respond whit containing a list of all dogs' , done => {
    request(app)
      .get('/dogs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
}) 

describe ('GET /DOGS/:ID', () => {
  it ('respond whit the dog that contains the id' , done => {
    request(app)
      .get('/dogs/5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it ('respond whit Search failures if breed does not exist' , done => {
    request(app)
      .get('/dogs/usererror')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect('"Search failures"')
      .end((err) => {
        if (err) return done(err);
        done()
      })
  });
}) 
