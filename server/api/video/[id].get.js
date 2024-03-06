import video from '@/database/video.js'

export default defineEventHandler((event)=>{
    const { id } = event.context.params || {}
    return video.find((v)=>v.bvid===id)
})