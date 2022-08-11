import User from '../models/User';
import Video from '../models/Video';
import Comment from '../models/Comment';

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({createAt: 'desc'}).populate('owner');
        return res.render('home', {pageTitle: 'Home', videos});
    }catch(error){
        console.log('Error : ', {error});
    }
};
export const watch = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id).populate('owner').populate('comments');
    if(!video){
        return res.status(404).render('common/404', {pageTitle: 'Video not Found'});
    }
    return res.render('videos/watch', {pageTitle: video.title, video});
};
export const getUpload = (req, res) => {
    return res.render('videos/upload', {pageTitle: `Upload Video`});
};
export const postUpload = async (req, res) => {
    const {
        session: {
            user: { _id }
        },
        body: { title, description, hashtags },
        file: { path: fileUrl },
    } = req;
    try{
        const newVideo = await Video.create({
            fileUrl,
            title,
            description,
            hashtags : Video.formatHasgtags(hashtags),
            owner: _id
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect(`/`);
    }catch(error){
        return res.status(400).render('videos/upload', {pageTitle: `Upload Video`, errorMessage: error._message});
    }
};
export const getEdit = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id }
        }
    } = req;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render('common/404', {pageTitle: 'Video not Found'});
    }
    if(String(video.owner) !== String(_id)){
        req.flash("error", "Not authorized");
        return res.status(403).redirect('/');
    }
    return res.render('videos/edit', {pageTitle: `Editing : ${video.title}`, video});
};
export const postEdit = async (req, res) => {
    const {
        params: { id },
        body: {title, description, hashtags},
        session: {
            user: { _id },
        },
    } = req;
    const video = await Video.findById({_id : id});
    if(!video){
        return res.render('common/404', {pageTitle: 'Video not Found'});
    }
    if(String(video.owner) !== String(_id)){
        req.flash("error", "Your not the owner of the video");
        return res.status(403).redirect('/');
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags : Video.formatHasgtags(hashtags)
    });
    req.flash('success', 'Changes saved.');
    return res.redirect(`/videos/${id}`)
};
export const deleteVideo = async (req, res) => {
    const {
        params: { id },
        session: {
            user: { _id },
        },
    } = req;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render('common/404', {pageTitle: 'Video not Found'});
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect('/');
    }
    await Video.findByIdAndDelete(id);
    return res.redirect('/');
};
export const search = async (req, res) => {
    const {keyword} = req.query;
    let videos = [];
    if(keyword){
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, 'i')
            }
        }).populate('owner');
    }
    return res.render('videos/search', {pageTitle: 'Search', videos});
};

export const registerView = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
};

export const createComment = async(req, res) => {
    const {
        params: {id},
        body: {text},
        session: {user}
    } = req;
    
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        owner: user._id,
        video: id,
    });
    video.comments.push(comment._id);
    video.save();

    return res.sendStatus(201);
};