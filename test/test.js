const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:8080';

//Began to implement a Mocha test suite utilizing supertest to test our routes.

describe('Main Route Integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/getPost', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/createPost', () => {
    describe('POST', () => {
      it('responds with 200 status', () => {
        return request(server)
          .get('/')
          .expect(200);
      });
    });
  });
});



