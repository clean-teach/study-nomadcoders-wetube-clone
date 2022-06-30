import Video from '../models/Video'

const fakeUser = {
    username: 'nico',
    loggedIn: true
};

// Callback 방식
// export const home = (req, res) => {
//     console.log('Start');
//     Video.find({}, (error, videos) => {
//         console.log('Error : ', error);
//         console.log('Videos : ', videos);
//         return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser, videos});
//     });
//     console.log('finish');
// };

// Promise 방식
export const home = async (req, res) => {
    console.log('Start');
    try{
        const videos = await Video.find({});
        console.log('Videos : ', videos);
        return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser, videos});
    }catch(error){
        console.log('Error : ', {error});
    }
    console.log('finish');
};

export const watch = (req, res) => {
    // const id = req.params.id;
    const {id} = req.params;
    return res.render('watch', {pageTitle: `Watching : `, fakeUser});
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
export const postUpload = (req, res) => {
    const {title} = req.body;
    return res.redirect(`/`);
};
// export const search = (req, res) => res.send('Search Video');
// export const remove = (req, res) => {
//     return res.send(`Delete Video #${req.params.id}`);
// };