import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';
import Matches from '../database/models/Matches.Model';
import MatchesServices from '../api/services/MatchesServices';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for Matches', () => {
    afterEach(() => {
        sinon.restore();
      });
    it('Testing findAll', async () => {
        const outputMock: Matches[] = [new Matches({
            "id": 1,
            "homeTeamId": 16,
            "homeTeamGoals": 1,
            "awayTeamId": 8,
            "awayTeamGoals": 1,
            "inProgress": false,
            "homeTeam": {
              "teamName": "São Paulo"
            },
            "awayTeam": {
              "teamName": "Grêmio"
            }
        })];
        
        sinon.stub(Model, 'findAll').resolves(outputMock);
        const service = new MatchesServices();
        const result = await service.readAll()

        expect(result).to.be.equal(outputMock);
        expect(result.length).to.be.equal(1)
    }),

    it('Testing finishMatch function', async () => {
        const inputMock = 1;
    sinon.stub(Model, 'update').resolves([1]);
    const service = new MatchesServices();
    const result = await service.finishMatch(inputMock);

    expect(result).to.be.equal(1)
    })

    it('Testing updateMatch function', async () => {
        const inputMock = {
            id: 1,
            homeGoals: 1,
            awayGoals: 1,
        };
    sinon.stub(Model, 'update').resolves([1]);
    const service = new MatchesServices();
    const result = await service.updateMatch(inputMock.id, inputMock.homeGoals, inputMock.awayGoals);

    expect(result).to.be.equal(1)
    }),

    it('Testing insertMatch function', async () => {
        const inputMock = {
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
        inProgress: true,
        };
        const outputMock = new Matches(  {
        id:1,
        homeTeamId: 16,
        awayTeamId: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,})
    sinon.stub(Model, 'create').resolves(outputMock);
    const service = new MatchesServices();
    const result = await service.insertMatch(inputMock); 
    
    expect(result.id).to.be.equal(1),
    expect(result.awayTeamId).to.be.equal(inputMock.awayTeamId)
    })

})