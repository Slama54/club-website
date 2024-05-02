import CalendarPrive from '../models/calendarPrive.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a calendar'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newCalendarPrive = new CalendarPrive({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedCalendarPrive = await newCalendarPrive.save();
    res.status(201).json(savedCalendarPrive);
  } catch (error) {
    next(error);
  }
};
export const getcalendarPrives = async (req, res , next)=>{
    
  
    
  try {
   
    
        if (!req.user.id ) {
            return next(errorHandler(403, 'You are not allowed to see this calendar'))
        }
    const startIndex = parseInt(req.query.startIndex)||0;
    const limit = parseInt(req.query.limit)||9;
    const sortDirection = req.query.order === 'asc' ? 1 :-1;
    const calendarPrives = await CalendarPrive.find({
      ...(req.query.userId && {userId:req.query.userId}),
      ...(req.query.category && {category:req.query.category}),
      ...(req.query.calendarPriveDateStart && {calendarPriveDateStart:req.query.calendarPriveDateStart}),
      ...(req.query.calendarPriveDateEnd && {calendarPriveDateEnd:req.query.calendarPriveDateEnd}),
      ...(req.query.slug && {slug:req.query.slug}),
      ...(req.query.calendarPriveId && {_id:req.query.calendarPriveId}),
      ...(req.query.searchTerm && {
        $or:[
          { title: { $regex: req.query.searchTerm,$options: 'i'}},
          { content: { $regex: req.query.searchTerm,$options: 'i'}},
        ],
      }),

    }).sort({updateAt : sortDirection}).skip(startIndex).limit(limit)
      
    const totalCalendarPrives = await CalendarPrive.countDocuments()
    const now = new Date()
    const oneMonthAgo =new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthCalendarPrives = await CalendarPrive.countDocuments({
      createdAt :{ $gte :oneMonthAgo},

    })
     res.status(200).json({
      calendarPrives,
      totalCalendarPrives,
      lastMonthCalendarPrives,
     })

  } catch (error) {
    next(error)
  }
};


export const deletecalendarPrive = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this calendarPrive'));
  }
  try {
    await CalendarPrive.findByIdAndDelete(req.params.calendarPriveId);
    res.status(200).json('The calendarPrive has been deleted');
  } catch (error) {
    next(error);
  }
};
