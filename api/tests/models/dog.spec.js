const { Breed, Temperament } = require('../../src/db.js');
const { expect } = require('chai');

describe('Breed model', () => {

    describe('DataBase', () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe('Breed Name', () => {

        // Name allow null false
        it('should throw an error if name is null', (done) => {
        Breed.create({})
            .then(() => done(new Error('It requires a valid name')))
            .catch(() => done());
        });

        // Correct name
        it('should work when its a valid name', () => {
        Breed.create({ name: 'Pug' });
        });

        // Find breed that not exists
        it('should return breed not found', done => {
            Breed.findAll()
            .then(r => expect(r[1].name).to.be.false('BreedNotFound'))
            .catch(() => done())
        });
    });
    });
});

// Temperaments
describe('Temp model', () => {

    describe('DataBase', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe('Temperament Name', () => {
        // Correct name
        it('should work when its a valid name', () => {
        Temperament.create({ name: 'Creative, Active' });
        });

        // Find temperament that not exists
        it('should return temperament not found', done => {
            Temperament.findAll()
            .then(r => expect(r[1].name).to.be.false('TempNotFound'))
            .catch(() => done())
        });

        // Find existing Temperament
        it('should return correctly', done => {
            Temperament.findAll()
            .then(r => expect(r[1].name).to.be.false('Creative, Active'))
            .catch(() => done())
        });
    });
    });
});