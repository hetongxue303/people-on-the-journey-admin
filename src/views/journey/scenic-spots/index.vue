<script setup>
import Pagination from '@components/pagination/index.vue'
import {useScenicSpots} from "@views/journey/scenic-spots/hooks/useScenicSpots.js";
import {Reload} from "@icon-park/vue-next";
import moment from "moment";
import {ElNotification} from "element-plus";

const {
    search,
    disable,
    loading,
    total,
    tableData,
    form,
    show,
    dialogRules,
    title,
    dialogRef,
    columns,
    getTableData,
    selectionChange,
    changeSize,
    changeCurrent,
    openDialog,
    handleBatchDelete,
    handleDelete,
    handleOperate
} = useScenicSpots()
</script>

<template>
    <el-card :style="{ borderRadius: '10px' }">
        <el-row :gutter="5">
            <el-col :span="4">
                <el-input v-model="search.keywords" clearable placeholder="输入名称搜索" @clear="search.keywords = undefined"/>
            </el-col>
            <el-col :span="16">
                <el-button type="warning">查询</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="20">
                <el-button type="success" @click="openDialog('add')">新增</el-button>
                <el-button :disabled="disable" type="danger" @click="handleBatchDelete">
                    批量删除
                </el-button>
            </el-col>
            <el-col :span="4">
                <el-tooltip :show-after="500" content="上传" effect="light" placement="top">
                    <!--TODO-->
                    <el-button class="grid-button" icon="Upload" @click="ElNotification.success('待开发')"/>
                </el-tooltip>
                <el-tooltip :show-after="500" content="下载" effect="light" placement="top">
                    <!--TODO-->
                    <el-button class="grid-button" icon="Download" @click="ElNotification.success('待开发')"/>
                </el-tooltip>
                <el-tooltip :show-after="500" content="刷新" effect="light" placement="top">
                    <el-button class="grid-button" icon="Refresh" @click="getTableData"/>
                </el-tooltip>
                <el-popover :width="80" placement="bottom" style="" title="筛选列" trigger="click">
                    <template v-for="item in columns" :key="item">
                        <el-checkbox v-model="item.status" :label="item.label"/>
                    </template>
                    <template #reference>
                        <el-button class="grid-button" icon="Grid"/>
                    </template>
                </el-popover>
            </el-col>
        </el-row>
        <el-table
            :key="Reload"
            v-loading="loading"
            :data="tableData"
            :header-row-style="{ color: '#575656' }"
            empty-text="暂无数据"
            highlight-current-row
            tooltip-effect="light"
            @selection-change="selectionChange"
        >
            <el-table-column align="center" type="selection" width="30"/>
            <el-table-column v-if="columns[1].status" :label="columns[1].label" prop="id"/>
            <el-table-column v-if="columns[2].status" :label="columns[2].label" prop="name"/>
            <el-table-column v-if="columns[3].status" :label="columns[3].label" prop="intro" show-overflow-tooltip/>
            <el-table-column v-if="columns[4].status" :label="columns[4].label">
                <template #default="{ row }">
                    {{ moment(row['createTime'])
                    .format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column v-if="columns[5].status" :label="columns[5].label">
                <template #default="{ row }">
                    {{ moment(row['updateTime'])
                    .format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column v-if="columns[6].status" :label="columns[6].label" align="center" width="180">
                <template #default="{ row }">
                    <el-button type="primary" @click="openDialog('edit',row)">编辑</el-button>
                    <el-popconfirm title="确认删除本条记录吗？" @confirm="handleDelete(row.id)">
                        <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :current="search.current"
            :size="search.size"
            :total="total"
            class="pagination"
            @change-current="changeCurrent"
            @change-size="changeSize"
        />
    </el-card>

    <el-dialog
        v-model="show"
        :close-on-click-modal="false"
        :show-close="false"
        :style="{ borderRadius: '10px' }"
        :title="title"
        destroy-on-close
        width="30%"
    >
        <el-form ref="dialogRef" :model="form" :rules="dialogRules" label-width="50">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="form.intro" type="textarea" resize="none" :rows="3"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button text type="danger" @click="show = false">返回</el-button>
            <el-button type="primary" @click="handleOperate(dialogRef)">确认</el-button>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-button.grid-button) {
    @apply rounded-none;
    border: 0.1px solid #dcdfe6;
    transition: all ease-in-out 0.5s;

    &:hover {
        color: #000000;
        background-color: rgb(222, 223, 224);
    }
}

// 去除按钮间距
:deep(.el-button.grid-button + .el-button) {
    @apply ml-0;
}

.pagination {
    @apply flex justify-center mt-8;
}

:deep(.el-row) {
    @apply mb-20px;
}
</style>
