<script setup>
import {onMounted, ref} from "vue";
import {getScenicSpotsListUrl} from "@/api/scenicSpots.js";
import {cloneDeep} from "lodash-es";
import {getFoodListUrl} from "@/api/food.js";
import {getTravelAgencyListUrl} from "@/api/travelAgency.js";
import {addOrderUrl} from "@/api/order.js";
import {ElNotification} from "element-plus";
import useUser from "@store/modules/user.js";

let active = ref(1)

const submit = () => {
    addOrderUrl({
        scenicSpots: scenicSpotsSelect.value,
        food: foodSelect.value,
        travelAgency: travelAgencySelect.value,
        remark: ''
    })
        .then(({data}) => {
            if (data.code === 200) {
                ElNotification.success('预约成功')
                return
            }
            ElNotification.error('预约失败，请重试！')
        })
}
let scenicSpotsList = ref([])
let scenicSpotsSelect = ref({})
let FoodList = ref([])
let foodSelect = ref({})
let travelAgencyList = ref([])
let travelAgencySelect = ref({})
let count = ref(1)
const initData = () => {
    if (!useUser().getUserId) {
        ElNotification.warning('您还未登录，请先登录')
        return;
    }
    getScenicSpotsListUrl({current: count.value, size: 2})
        .then(({data}) => scenicSpotsList.value = data.code === 200 ? data.data["records"] : [])
    getFoodListUrl({current: count.value, size: 2})
        .then(({data}) => FoodList.value = data.code === 200 ? data.data["records"] : [])
    getTravelAgencyListUrl({current: count.value, size: 2})
        .then(({data}) => travelAgencyList.value = data.code === 200 ? data.data["records"] : [])
}
const clickContent = (type, item) => {
    if (type === 's') scenicSpotsSelect.value = cloneDeep(item)
    if (type === 'f') foodSelect.value = cloneDeep(item)
    if (type === 't') travelAgencySelect.value = cloneDeep(item)
}
let bthStatus = ref(false)
const next = () => {
    active.value++;
}
onMounted(() => initData())
</script>

<template>
    <div class="box">
        <el-steps :active="active" finish-status="success" simple>
            <el-step icon="icon-park-landscape" title="选择景区"/>
            <el-step icon="icon-park-bowl" title="选择美食"/>
            <el-step icon="icon-park-trunk" title="选择旅社"/>
        </el-steps>
        <div class="content-box">
            <div class="content-main">
                <div v-show="!useUser().getUserId" style="display: flex;justify-content: center;align-items: center;flex-direction: column;width: 100%;color: #97a8be;font-size: 22px">
                    请先登录在选择相关信息
                </div>
                <!-- 景点 -->
                <div v-show="useUser().getUserId" v-for="item in scenicSpotsList" v-if="active===1" :class="{'content':true}" @click="clickContent('s',item)">
                    <el-image :src="item.image" class="content-image" fit="cover"/>
                    <div class="content-name">{{ item.name }}</div>
                    <div class="content-intro">介绍：{{ item.intro }}</div>
                    <el-button :disabled="scenicSpotsSelect.id===item.id" :type=" scenicSpotsSelect.id === item.id ?'info':'primary'" class="content-button" @click="clickContent('s',item)">
                        {{ scenicSpotsSelect.id === item.id ? '已选择' : '选择' }}
                    </el-button>
                </div>
                <!-- 美食 -->
                <div v-show="useUser().getUserId" v-for="item in FoodList" v-else-if="active===2" :class="{'content':true}" @click="clickContent('f',item)">
                    <el-image :src="item.image" class="content-image" fit="cover"/>
                    <div class="content-name">{{ item.name }}</div>
                    <div class="content-intro">介绍：{{ item.intro }}</div>
                    <el-button :disabled="foodSelect.id===item.id" :type=" foodSelect.id === item.id ?'info':'primary'" class="content-button" @click="clickContent('f',item)">
                        {{ foodSelect.id === item.id ? '已选择' : '选择' }}
                    </el-button>
                </div>
                <!-- 旅社 -->
                <div v-show="useUser().getUserId" v-for="item in travelAgencyList" v-else :class="{'content':true}" @click="clickContent('t',item)">
                    <el-image :src="item.image" class="content-image" fit="cover"/>
                    <div class="content-name">{{ item.name }}</div>
                    <div class="content-intro">介绍：{{ item.intro }}</div>
                    <el-button :disabled="travelAgencySelect.id===item.id" :type=" travelAgencySelect.id === item.id ?'info':'primary'" class="content-button" @click="clickContent('t',item)">
                        {{ travelAgencySelect.id === item.id ? '已选择' : '选择' }}
                    </el-button>
                </div>
            </div>
            <div class="content-bth">
                <el-button v-show="active>1" type="warning" @click="active--">上一步</el-button>
                <el-button v-show="active<3&&useUser().getUserId" type="primary" @click="next" :disabled="bthStatus">
                    下一步
                </el-button>
                <el-button v-show="active===3" type="success" @click="submit">完成</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    position: relative;
    top: 50px;
    background-color: aliceblue;

    .content-box {
        width: 100%;
        height: 100%;

        .content-main {
            width: 100%;
            height: 660px;
            display: flex;
            padding: 20px 150px 0 150px;

            .content {
                width: 200px;
                height: 320px;
                border-radius: 10px;
                margin: 0 30px 30px 0;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                background-color: white;

                &:hover {
                    background-color: rgba(206, 214, 220, 0.5);
                    transition: all 0.5s ease-in-out;
                }


                &-image {
                    width: 200px;
                    height: 220px;
                    border-radius: 10px 10px 0 0;

                }

                &-name {
                    padding: 5px 10px 2.5px 10px;
                    font-size: 14px;

                }

                &-intro {
                    padding: 2.5px 10px 2.5px 10px;
                    font-size: 12px;
                    overflow: hidden;
                    height: 36px;
                    text-overflow: ellipsis;
                }

                &-button {
                    width: 90%;
                    margin: 5px auto 5px auto;
                }
            }
        }

        .content-bth {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: aliceblue;
        }
    }
}
</style>
