import Document from '../models/document.model.js';
import { errorHandler } from '../utils/error.js';

export const createdocument = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a document'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newDocument = new Document({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedDocument = await newDocument.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    next(error);
  }
};
export const getdocuments = async (req, res , next)=>{
  try {
    const startIndex = parseInt(req.query.startIndex)||0;
    const limit = parseInt(req.query.limit)||9;
    const sortDirection = req.query.order === 'asc' ? 1 :-1;
    const documents = await Document.find({
      ...(req.query.userId && {userId:req.query.userId}),
      ...(req.query.category && {category:req.query.category}),
      ...(req.query.slug && {slug:req.query.slug}),
      ...(req.query.documentId && {_id:req.query.documentId}),
      ...(req.query.searchTerm && {
        $or:[
          { title: { $regex: req.query.searchTerm,$options: 'i'}},
          { content: { $regex: req.query.searchTerm,$options: 'i'}},
        ],
      }),

    }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
      
    const totalDocuments = await Document.countDocuments()
    const now = new Date()
    const oneMonthAgo =new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthDocuments = await Document.countDocuments({
      createdAt :{ $gte :oneMonthAgo},

    })
     res.status(200).json({
      documents,
      totalDocuments,
      lastMonthDocuments,
     })

  } catch (error) {
    next(error)
  }
};


export const deletedocument = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this document'));
  }
  try {
    await Document.findByIdAndDelete(req.params.documentId);
    res.status(200).json('The document has been deleted');
  } catch (error) {
    next(error);
  }
};


export const updatedocument = async (req, res, next)=>{
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403,'You are not allowed to update this document '))
    
  }
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.documentId,
      {
        $set:{
          title: req.body.title,
          content: req.body.content,
          category:req.body.category,
          image: req.body.image,
        }
      },{new: true}
    )
    res.status(200).json(updatedDocument)
  } catch (error) {
    next(error)
  }
}