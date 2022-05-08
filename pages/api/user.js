export default function handler(req, res) {
    const user = {
        name: 'Full Name',
        email: 'vanteateam@gmail.com',
        bio: 'Lorem ipsum epta kak dela u menya vse ok good cool im a cool motherfucka.',
        number: 'egm_12391298381849949',
    }

    res.status(200).json(user)
}