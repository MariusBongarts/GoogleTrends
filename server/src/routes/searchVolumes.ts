import { Keyword } from './../models/keyword';
import express from 'express';
import { MongoGenericDAO } from '../models/mongo-generic.dao';
import uuid = require('uuid');
import { SearchVolume } from '../models/searchVolume';

const router = express.Router();

router.get('/', async (req, res) => {
  const searchVolumeDAO: MongoGenericDAO<SearchVolume> = req.app.locals.searchVolumeDAO;

  const searchVolumes = await searchVolumeDAO.findAll();

  res.send(searchVolumes);
});

export default router;