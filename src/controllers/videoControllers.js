const fakeUser = {
    username: 'nico',
    loggedIn: true
};
let videos = [
    {
        title: 'First video', 
        rating: 2,
        comments: 5,
        createAt: '2 minutes ago',
        views: 1,
        id: 1
    },
    {
        title: 'Second video', 
        rating: 2,
        comments: 5,
        createAt: '2 minutes ago',
        views: 59,
        id: 2
    },
    {
        title: 'Third video', 
        rating: 2,
        comments: 5,
        createAt: '2 minutes ago',
        views: 59,
        id: 3
    }
];

export const trending = (req, res) => {
    return res.render('home', {pageTitle: 'Home', lovesTarget: 'tomato', fakeUser, videos})
};
export const watch = (req, res) => {
    // const id = req.params.id;
    const {id} = req.params;
    const video = videos[id - 1];
    return res.render('watch', {pageTitle: `Watching : ${video.title}`, fakeUser, video});
};
export const getEdit = (req, res) => {
    const {id} = req.params;
    const video = videos[id - 1];
    res.render('edit', {pageTitle: `Editing : ${video.title}`, fakeUser, video})
};
export const postEdit = (req, res) => {
    const {id} = req.params;
    const {title} = req.body;
    videos[id - 1].title = title; // 가짜 database 실습이므로 임시 코드
    return res.redirect(`/videos/${id}`)
};
// export const search = (req, res) => res.send('Search Video');
// export const upload = (req, res) => res.send('Upload Video');
// export const remove = (req, res) => {
//     return res.send(`Delete Video #${req.params.id}`);
// };