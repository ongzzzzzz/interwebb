export async function getLinks() {
    const res = await fetch('https://gist.githubusercontent.com/Fogeinator/9bcc39851aa05727bdcc10db1ad3ed7f/raw/131606fc4414878298d117fc2efd12ea7f65d51f/routes.json')
    const links = await res.json()

    return links
}