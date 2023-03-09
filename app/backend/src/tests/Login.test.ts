import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import LoginServices from '../api/services/LoginServices';
import Users from '../database/models/Users.Model';
import { app } from '../app';
import { ALL_FIELDS_REQUIRED, INVALID_LOGIN } from '../api/errors/ErrorMessage';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for Login services',()=> {
    afterEach(()=> {
        sinon.restore();
    })
    it('Testing login function with valid email and password', async () => {
        const inputMock = {
            email: 'admin@admin.com',
            password: 'secret_admin',
        }
        const outputMock: Users = new Users({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        })

        sinon.stub(Model, 'findOne').resolves(outputMock);
        const service = new LoginServices();
        const result = await service.login(inputMock)

        expect(result).to.be.equal(outputMock.dataValues)
    }),
    it('Testing findRoleUser function', async () => {
        const inputMock = 'admin@admin.com';
        const outputMock: Users = new Users({
            id: 1,
            username: 'Admin',
            role: 'admin',
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
            });
        sinon.stub(Model, 'findOne').resolves(outputMock);
        const service = new LoginServices();
        const result = await service.findRoleUser(inputMock);

        expect(result).to.be.equal(outputMock.dataValues)
    }),
    it('Testing findRoleUser with a invalid email', async() => {
        const inputMock = 'admi@admin.com';
        const outputMock = null;
        sinon.stub(Model, 'findOne').resolves(outputMock);
        const service = new LoginServices();
        const result = await service.findRoleUser(inputMock);

        expect(result).to.be.null
    })
    it('Testing login with invalid email', async () => {
        const inputMock = {
            email: '',
            password: 'secret_admin'
        };
        const outputMock = null;
        sinon.stub(Model, 'findOne').resolves(outputMock);
        const service = new LoginServices();
        const result = await service.login(inputMock);

        expect(result).to.be.null;
    }),
    it('Testing login with invalid password', async () => {
        const inputMock = {
            email: 'admin@admin.com',
            password: 'testing'
        };
        const outputMock: Users = new Users({
            id: 1,
            username: 'Admin',
            role: 'admin',
            email: 'admin@admin.com',
            password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
            });
        sinon.stub(Model, 'findOne').resolves(outputMock);
        const service = new LoginServices();
        const result = await service.login(inputMock);

        expect(result).to.be.null;
    })
}),

describe('Testing Login route', async ()=>{
    afterEach(()=>{
        sinon.restore();
    });
    it('Testing login route with valid params', async () => {
        const login = await chai
        .request(app)
        .post('/login')
        .send(
            {
                email: 'admin@admin.com',
                password: 'secret_admin'
            })
            expect(login.status).to.be.equal(200)
            expect(login.body).to.have.property('token')
        }
        ),
        it('Testing login route with invalid params', async ()=> {
            const login = await chai
            .request(app)
            .post('/login')
            .send(
                {
                    email: 'admi@admin.com',
                    password: 'secret_admin'
                })

                expect(login.status).to.be.equal(INVALID_LOGIN.status)
                expect(login.body).to.deep.equal({message: INVALID_LOGIN.message})
        })
        it('Testing login validation middleware, invalid email', async () => {
            const login = await chai
            .request(app)
            .post('/login')
            .send(
                {
                    email: 'admi',
                    password: 'secret_admin'
                })

                expect(login.status).to.be.equal(INVALID_LOGIN.status)
                expect(login.body).to.deep.equal({message: INVALID_LOGIN.message})

        }),
        it('Testing loginValidation middleware, sending a null param', async () => {
            const login = await chai
            .request(app)
            .post('/login')
            .send(
                {
                    email: '',
                    password: 'secret_admin'
                })

                expect(login.status).to.be.equal(ALL_FIELDS_REQUIRED.status)
                expect(login.body).to.deep.equal({message: ALL_FIELDS_REQUIRED.message})
        }),
        it('Testing /login/role route with valid params and token', async () => {
            const login = await chai
            .request(app)
            .post('/login')
            .send(
                {
                    email: 'admin@admin.com',
                    password: 'secret_admin'
                })
            const token = login.body.token;
            const role = await chai
            .request(app)
            .get('/login/role')
            .set('authorization', token)

            expect(role.status).to.be.equal(200)
            expect(role.body).to.deep.equal({role: 'admin'})
        })

})