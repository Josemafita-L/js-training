interface Profile {
    displayName: string;
    bio?: string;
    website?: string;
    avatarUrl?: string;
}
function renderProfile(profile: Profile): string {
    let output = `Name: ${profile.displayName}\n`;

    output += `Bio: ${profile.bio ?? "No bio provided"}\n`;

    if (profile.website) {
        output += `Website: ${profile.website}`;
    }

    return output;
}
renderProfile({
    displayName: "John",
    bio: "Developer",
    website: "example.com",
    avatarUrl: "abc.jpg"
});

renderProfile({
    displayName: "Sam"
});