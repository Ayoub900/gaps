export function getYouTubeVideoId(url: string) {
    try {
        const parsedUrl = new URL(url)
        const hostname = parsedUrl.hostname.replace(/^www\./, '')

        if (hostname === 'youtu.be') {
            return parsedUrl.pathname.split('/').filter(Boolean)[0] || null
        }

        if (hostname === 'youtube.com' || hostname === 'm.youtube.com' || hostname === 'music.youtube.com') {
            if (parsedUrl.pathname === '/watch') {
                return parsedUrl.searchParams.get('v')
            }

            const pathParts = parsedUrl.pathname.split('/').filter(Boolean)

            if (['embed', 'shorts', 'live'].includes(pathParts[0])) {
                return pathParts[1] || null
            }
        }
    } catch {
        return null
    }

    return null
}

export function getCanonicalYouTubeUrl(url: string) {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null
}

export function getYouTubeEmbedUrl(url: string) {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
}

export function getYouTubeThumbnailUrl(url: string) {
    const videoId = getYouTubeVideoId(url)
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
}
