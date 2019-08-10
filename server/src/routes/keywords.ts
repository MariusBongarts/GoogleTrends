import { Keyword } from './../models/keyword';
import express from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';
import uuid = require('uuid');

const router = express.Router();

router.get('/', async (req, res) => {
  const keywordDAO: MongoGenericDAO<Keyword> = req.app.locals.keywordDAO;

  const keywords = await keywordDAO.findAll();

  res.send(keywords);
});

export default router;