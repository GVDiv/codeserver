export default async function printProfile(id) {
    try {
        const profile = await fetch("/api/sessions/online" + id)
        profile = await profile.json()
        profile = profile.response
        console.log(profile)
    } catch (error) {
        return next(error)
    }
}