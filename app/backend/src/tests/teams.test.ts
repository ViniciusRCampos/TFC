import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import Teams  from '../database/models/Teams.Model';
import TeamsService from '../api/services/TeamsService';
import { app } from '../app';
import { ID_NOT_FOUND } from '../api/errors/ErrorMessage';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for services - Team Services', () => {
    afterEach(() => {
        sinon.restore();
      });
    it('Testing Team readAll Function', async () => {
        // GIVEN
        const outputMock:  Teams[] = [ new Teams({  
            id: 1,
            teamName: 'Atletico',
        })];
        //WHEN
        sinon.stub(Model, 'findAll').resolves(outputMock);
        const service = new TeamsService();
        const result = await service.readAll()

        //THEN
        expect(result).to.be.equal(outputMock);
        expect(result.length).to.be.equal(1);
        
    })
    it('Testing Team readTeamById', async () => {

        // GIVEN
        const inputMock: number = 1;
        const outputMock:  Teams =  new Teams({  
            id: 1,
            teamName: 'Atletico',
        });

        //WHEN
        sinon.stub(Model, 'findByPk').resolves(outputMock);
        const service = new TeamsService();
        const result = await service.readTeamById(inputMock);

        //THEN
        expect(result).to.be.equal(outputMock);

    })
    it('Testing Team readTeamById with a invalid id', async () => {

        // GIVEN
        const inputMock: number = 2;
        const outputMock = null;

        //WHEN
        sinon.stub(Model, 'findByPk').resolves(outputMock);
        const service = new TeamsService();
        const result = await service.readTeamById(inputMock);

        //THEN
        expect(result).to.be.null;

    })
})

describe('Tests for controller - Team controller', () => {
    afterEach(() => {
        sinon.restore();
      });
    it('Testing readAll function on controller', async () => {

    // GIVEN
    const outputMock :Teams[] = [ new Teams({ id: 1, teamName: 'Teste' }) ];

    //WHEN
    sinon.stub(Model, 'findAll').resolves(outputMock);

    const result = await chai.request(app).get('/teams');

    //THEN
    expect(result).to.be.an('object');
    expect(result.body).to.be.an('array');
    expect(result.body[0]).to.be.deep.eq(outputMock[0].dataValues);

    })

    it('Testing readTeamById function on controller', async () => {

        // GIVEN
        const outputMock :Teams = new Teams({ id: 1, teamName: 'Teste' });

        //WHEN
        sinon.stub(Model, 'findByPk').resolves(outputMock);
    
        const result = await chai.request(app).get('/teams/1');

        //THEN
        expect(result).to.be.an('object');
        expect(result.body).to.be.deep.eq(outputMock.dataValues)
        expect(result.status).to.be.equal(200);

        })


    it('Testing readTeamById function on controller with invalid id', async () => {

        //WHEN
        sinon.stub(Model, 'findByPk').resolves(null);
        const result = await chai.request(app).get('/teams/0');

        //THEN    
        expect(result).to.be.an('object');
        expect(result.body).to.be.deep.eq({message: ID_NOT_FOUND.message})
        expect(result.status).to.be.equal(ID_NOT_FOUND.status);

        })
})