import Video from '../models/Video';

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({createAt: 'desc'});
        return res.render('home', {pageTitle: 'Home', videos});
    }catch(error){
        console.log('Error : ', {error});
    }
};
export const watch = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id).populate('owner');
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
        await Video.create({
            fileUrl,
            title,
            description,
            hashtags : Video.formatHasgtags(hashtags),
            owner: _id
        });
        return res.redirect(`/`);
    }catch(error){
        return res.status(400).render('videos/upload', {pageTitle: `Upload Video`, errorMessage: error._message});
    }
};
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render('common/404', {pageTitle: 'Video not Found'});
    }
    return res.render('videos/edit', {pageTitle: `Editing : ${video.title}`, video});
};
export const postEdit = async (req, res) => {
    const {id} = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({_id : id});
    if(!video){
        return res.render('common/404', {pageTitle: 'Video not Found'});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags : Video.formatHasgtags(hashtags)
    });
    return res.redirect(`/videos/${id}`)
};
export const deleteVideo = async (req, res) => {
    const {id} = req.params;
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
        });
    }
    return res.render('videos/search', {pageTitle: 'Search', videos});
};