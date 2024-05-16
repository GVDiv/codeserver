export default async function fetchProfile() {
    try {
        const response = await fetch("/api/sessions");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const profile = data.response;
        console.log(profile);
        return profile; // Return the profile data if needed
    } catch (error) {
        console.error('There was a problem fetching the profile:', error);
        // Handle error gracefully, perhaps by returning a default profile or showing an error message
        return null;
    }
}
