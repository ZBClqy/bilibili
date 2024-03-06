<script setup>
import { ref } from 'vue'
const { data: channelList } = await useFetch('/api/channel')
const { data: videoList } = await useFetch('/api/video')

const loading = ref(false)
const finished = ref(false)
const list = ref([])
const page = ref(1)
const pageSize = ref(20)

const onLoad = () => {
    loading.value = true
    setTimeout(() => {
        list.value.push(...videoList.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))
        loading.value = false
        if (videoList.value.length == list.value.length) {
            finished.value = true
        }
        page.value++
    }, 2000)

}

onLoad()
</script>

<template>
    <AppHeader />
    <van-tabs>
        <van-tab v-for="item in channelList" :key="item.id" :title="item.name" />
    </van-tabs>
    <van-list v-model:loading="loading" :finished="finished" finished-text="去 bilibili App 看更多" @load="onLoad">
        <div class="video-list">
            <AppVideo v-for="item in list" :key="item.bvid" :item="item" />
        </div>
    </van-list>
</template>

<style lang="scss">
.video-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 5px;
}
</style>