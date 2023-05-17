<script setup>
import useUser from "@store/modules/user.js";
import {onMounted, reactive, ref, watch} from "vue";
import {getOrderListByIdUrl} from "@/api/order.js";
import Pagination from "@components/pagination/index.vue";
import {clone, cloneDeep} from "lodash-es";
import moment from "moment";

let user = useUser()
let search = reactive({current: 1, size: 10})
let list = ref([])
let total = ref(0)
const initData = () => {
    getOrderListByIdUrl(user.getUserId, search)
        .then(({data}) => {
            if (data.code === 200) {
                list.value = cloneDeep(data.data["records"])
                total.value = clone(data.data.total)
            }
        })
}
const changeCurrent = (current) => search.current = current
const changeSize = (size) => search.size = size
watch(
    () => search,
    () => initData(),
    {deep: true}
)
const rateValue = reactive({num: 0, orderId: 0})
onMounted(() => initData())
// const changeRate = (item) =>
//     rateValue.num = item.rate
//
// const submit = (item) => {
//     rateValue.orderId = item.id
//
// }
</script>

<template>
    <div class="my-order-box">
        <div class="my-content-box">
            <div v-for="item in list" class="my-content-item">
                <div style="display: flex;flex-direction: column;justify-content: center">
                    <el-avatar :src="item.user.avatar" shape="square" style="width: 50px;height: 50px"/>
                    <div class="mt-10px" style="color: #1e272e;font-size: 12px">{{ item.user.nickname }}</div>
                </div>
                <div style="display: flex;justify-content: center;margin-left: 50px">
                    <div style="display: flex">
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-right: 40px">
                            <div style="background-color: #575fcf;border-radius: 10px;width: 80px;display: flex;justify-content: center;color: white;margin-bottom: 10px;height: 40px;align-items: center;text-indent: each-line;">
                                景区
                            </div>
                            <el-image :src=" item.scenicSpots.image" style="width: 100px;height: 100px;border-radius: 10px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);"/>
                            <span style="color: #485460;margin-top: 5px">{{ item.scenicSpots.name }}</span>
                        </div>
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-right: 40px">
                            <div style="background-color: #0fbcf9;border-radius: 10px;width: 80px;display: flex;justify-content: center;color: white;margin-bottom: 10px;height: 40px;align-items: center;text-indent: each-line;">
                                美食
                            </div>
                            <el-image :src=" item.food.image" style="width: 100px;height: 100px;border-radius: 10px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);"/>
                            <span style="color: #485460;margin-top: 5px">{{ item.food.name }}</span>
                        </div>
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                            <div style="background-color: #00d8d6;border-radius: 10px;width: 80px;display: flex;justify-content: center;color: white;margin-bottom: 10px;height: 40px;align-items: center;text-indent: each-line;">
                                旅社
                            </div>
                            <el-image :src=" item.travelAgency.image" style="width: 100px;height: 100px;border-radius: 10px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);"/>
                            <span style="color: #485460;margin-top: 5px">{{ item.travelAgency.name }}</span>
                        </div>
                    </div>
                    <div style="margin-left: 50px">
                        <div style="background-color: #ffa801;border-radius: 10px;width: 80px;display: flex;justify-content: center;color: white;margin-bottom: 10px;height: 40px;align-items: center;text-indent: each-line;margin-top: 1px;margin-left: 75px">
                            订单详情
                        </div>
                        <div style="display: flex;flex-direction: column;justify-content: center;width: 100%;height:100px;color: #808e9b;border: 1px solid rgba(0,0,0,0.2);border-radius: 10px;padding: 0 15px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);">
                            <div>订单号码：{{ item['orderNum'] }}</div>
                            <div>您的邮箱：{{ item.user.email }}</div>
                            <div>您的备注：{{ item.remark ? item.remark : '暂无' }}</div>
                            <div>
                                创建时间： {{ moment(item['createTime'])
                                .format('YYYY-MM-DD HH:mm:ss') }}
                            </div>
                        </div>
                    </div>
<!--                    <div style="margin-left: 50px">-->
<!--                        <div style="background-color: #9980FA;border-radius: 10px;width: 80px;display: flex;justify-content: center;color: white;margin-bottom: 10px;height: 40px;align-items: center;text-indent: each-line;margin-top: 1px;margin-left: 35px;">-->
<!--                            用户评价-->
<!--                        </div>-->
<!--                        <div style="display: flex;flex-direction: column;align-items: center;margin-top: 10px;border: 1px solid rgba(0,0,0,0.2);border-radius: 10px;padding: 0 15px;box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);height: 100px;width: 145px">-->
<!--                            <el-rate @change="changeRate(item)" v-model="item.rate" style="margin-top: 10px"/>-->
<!--                            <el-button type="success" style="margin-top: 10px" @click="submit(item)">提交</el-button>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>
            <Pagination :current="search.current"
                        :size="search.size"
                        :total="total"
                        class="pagination"
                        @change-current="changeCurrent"
                        @change-size="changeSize"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-order-box {
    width: 100%;
    height: 100%;
    position: relative;
    top: 50px;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.my-content-box {
    width: 100%;
    min-height: 676px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    //justify-content: center;
}

.my-content-item {
    display: flex;
    padding: 10px 30px;
    width: 80%;
    height: 200px;
    margin-bottom: 20px;
    background-color: #ddeeff;
    border-radius: 15px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    &:last-of-type {
        margin-bottom: 0;
    }

    &:hover {
        transition: 0.3s ease-in-out;
        transform: scale(1.02);
    }
}
</style>
