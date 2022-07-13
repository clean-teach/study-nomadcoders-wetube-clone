import Video from '../models/Video'

const fakeUser = {
    username: 'nico',
    loggedIn: true
};
export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({createAt: 'desc'});
        return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser, videos});
    }catch(error){
        console.log('Error : ', {error});
    }
};
export const watch = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render('404', {pageTitle: 'Video not Found', fakeUser});
    }
    return res.render('watch', {pageTitle: video.title, video, fakeUser});
};
export const getUpload = (req, res) => {
    return res.render('upload', {pageTitle: `Upload Video`, fakeUser});
};
export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags : Video.formatHasgtags(hashtags)
        });
        return res.redirect(`/`);
    }catch(error){
        return res.render('upload', {pageTitle: `Upload Video`, fakeUser, errorMessage: error._message});
    }
};
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render('404', {pageTitle: 'Video not Found'});
    }
    return res.render('edit', {pageTitle: `Editing : ${video.title}`, video, fakeUser});
};
export const postEdit = async (req, res) => {
    const {id} = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({_id : id});
    if(!video){
        return res.render('404', {pageTitle: 'Video not Found', fakeUser});
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
    return res.render('search', {pageTitle: 'Search', videos, fakeUser});
};