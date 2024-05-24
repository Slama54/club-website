import Gallery from '../models/gallery.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a gallery'));
  }
  if (!req.body.title) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newGallery = new Gallery({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    next(error);
  }
};
export const getgallerys = async (req, res , next)=>{
  try {
    const startIndex = parseInt(req.query.startIndex)||0;
    const limit = parseInt(req.query.limit)||9;
    const sortDirection = req.query.order === 'asc' ? 1 :-1;
    const gallerys = await Gallery.find({
      ...(req.query.userId && {userId:req.query.userId}),
      ...(req.query.category && {category:req.query.category}),
      ...(req.query.slug && {slug:req.query.slug}),
      ...(req.query.galleryId && {_id:req.query.galleryId}),
      ...(req.query.searchTerm && {
        $or:[
          { title: { $regex: req.query.searchTerm,$options: 'i'}},
          
        ],
      }),

    }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
      
    const totalGallerys = await Gallery.countDocuments()
    const now = new Date()
    const oneMonthAgo =new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthGallerys = await Gallery.countDocuments({
      createdAt :{ $gte :oneMonthAgo},

    })
     res.status(200).json({
      gallerys,
      totalGallerys,
      lastMonthGallerys,
     })

  } catch (error) {
    next(error)
  }
};


export const deletegallery = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this gallery'));
  }
  try {
    await Gallery.findByIdAndDelete(req.params.galleryId);
    res.status(200).json('The gallery has been deleted');
  } catch (error) {
    next(error);
  }
};
export const updategallery = async (req, res, next)=>{
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403,'You are not allawed to update this gallery '))
    
  }
  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.galleryId,
      {
        $set:{
          title: req.body.title,
          category:req.body.category,
          image: req.body.image,
        }
      },{new: true}
    )
    res.status(200).json(updatedGallery)
  } catch (error) {
    next(error)
  }
}