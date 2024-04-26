import Champion from '../models/champion.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a champion'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newChampion = new Champion({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedChampion = await newChampion.save();
    res.status(201).json(savedChampion);
  } catch (error) {
    next(error);
  }
};
export const getchampions = async (req, res , next)=>{
  try {
    const startIndex = parseInt(req.query.startIndex)||0;
    const limit = parseInt(req.query.limit)||9;
    const sortDirection = req.query.order === 'asc' ? 1 :-1;
    const champions = await Champion.find({
      ...(req.query.userId && {userId:req.query.userId}),
      ...(req.query.category && {category:req.query.category}),
      ...(req.query.slug && {slug:req.query.slug}),
      ...(req.query.championId && {_id:req.query.championId}),
      ...(req.query.searchTerm && {
        $or:[
          { title: { $regex: req.query.searchTerm,$options: 'i'}},
          { content: { $regex: req.query.searchTerm,$options: 'i'}},
          { ChampionName: { $regex: req.query.searchTerm,$options: 'i'}},
          { ChampionDate: { $regex: req.query.searchTerm,$options: 'i'}},
          
        ],
      }),

    }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
      
    const totalChampions = await Champion.countDocuments()
    const now = new Date()
    const oneMonthAgo =new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthChampions = await Champion.countDocuments({
      createdAt :{ $gte :oneMonthAgo},

    })
     res.status(200).json({
      champions,
      totalChampions,
      lastMonthChampions,
     })

  } catch (error) {
    next(error)
  }
};


export const deletechampion = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this champion'));
  }
  try {
    await Champion.findByIdAndDelete(req.params.championId);
    res.status(200).json('The champion has been deleted');
  } catch (error) {
    next(error);
  }
};
export const updatechampion = async (req, res, next)=>{
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403,'You are not allawed to update this champion '))
    
  }
  try {
    const updatedChampion = await Champion.findByIdAndUpdate(
      req.params.championId,
      {
        $set:{
          title: req.body.title,
          content: req.body.content,
          category:req.body.category,
          ChampionName:req.body.ChampionName,
          image: req.body.image,
          ChampionDate: req.body.ChampionDate,
        }
      },{new: true}
    )
    res.status(200).json(updatedChampion)
  } catch (error) {
    next(error)
  }
}