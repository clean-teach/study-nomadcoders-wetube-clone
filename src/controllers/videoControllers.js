import Video from '../models/Video'

const fakeUser = {
    username: 'nico',
    loggedIn: true
};
export const home = async (req, res) => {
    try{
        const videos = await Video.find({});
        return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser, videos});
    }catch(error){
        console.log('Error : ', {error});
    }
};
export const watch = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    return res.render('watch', {pageTitle: video.title, video, fakeUser});
};
export const getEdit = (req, res) => {
    const {id} = req.params;
    res.render('edit', {pageTitle: `Editing : `, fakeUser});
};
export const postEdit = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    return res.redirect(`/videos/${id}`)
};
export const getUpload = (req, res) => {
    return res.render('upload', {pageTitle: `Upload Video`, fakeUser});
};
export const postUpload = async (req, res) => {
    const {title, description, hashtagsd} = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags: hashtagsd.split(',').map(hashtag => `#${hashtag}`),
        });
        return res.redirect(`/`);
    }catch(error){
        return res.render('upload', {pageTitle: `Upload Video`, fakeUser, errorMessage: error._message});
    }
};
// export const search = (req, res) => res.send('Search Video');
// export const remove = (req, res) => {
//     return res.send(`Delete Video #${req.params.id}`);
// };