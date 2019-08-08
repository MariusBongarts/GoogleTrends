import { Keyword } from './../models/keyword';
import express from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';
import uuid = require('uuid');
import { companieNames } from '../data/constants';

const router = express.Router();

router.get('/', async (req, res) => {
  const keywordDAO: MongoGenericDAO<Keyword> = req.app.locals.keywordDAO;

  const keywords = await keywordDAO.findAll();
  companieNames.forEach(async (word) => {
    if (!keywords.find(e => e.keyword === word)) {
      await keywordDAO.create( {keyword: word});
    }
  });

  res.send(keywords);
});

export default router;