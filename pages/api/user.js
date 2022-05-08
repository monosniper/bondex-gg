export default function handler(req, res) {
    const user = {
        username: 'ravilto',
        email: 'vanteateam@gmail.com',
        bio: 'Lorem ipsum epta kak dela u menya vse ok good cool im a cool motherfucka.',
    }

    res.status(200).json(user)
}