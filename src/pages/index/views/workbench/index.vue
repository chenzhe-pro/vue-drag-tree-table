<template>
  <MainAndHeader title="首页">
    <div class="main-slot index" slot="main">
      首页
    </div>
  </MainAndHeader>
</template>

<script>
  import {mapState} from 'vuex'
  import {dialogMixin, formMixin} from '../../../../mixin/index'

  export default {
    name: "WorkBench",
    mixins: [dialogMixin, formMixin],
    data() {
      return {
        // bulletinList: [],
        // bulletinForm: {
        //   "content": "",
        //   "projectId": ""
        // },
        myPrj: {
          abnormalCnt: 0,
          projects: [],
          totalCnt: 0
        },
        // prjTableList: [],
        // prjPagination:{
        //   "page": 0,
        //   "size": 8,
        //   "totalCount": 0,
        //   "totalPage": 0
        // },
        task: {
          abnormalCnt: 0,
          tasks: [],
          totalCnt: 0
        },
        currentTaskId: "",//当前打开弹窗的任务id
        currentProjectId: "",//当前打开弹窗的任务对应的项目id
        taskSearchForm: {
          "name": "",
          "priority": "",
          "projectId": "",
          "status": ""
        },
        taskTableList: [],
        taskPagination: {
          "page": 0,
          "size": 8,
          "totalCount": 0,
          "totalPage": 0
        },
      }
    },
    computed: {
      ...mapState({
        ENUM: state => state.ENUM,
      })
    },
    methods: {
      async getMyPrj() {
        this.myPrj = await workbench.getMyPrj();
      },
      async getMyTask() {
        this.task = await workbench.getMyTask();
      },
      async getMyTaskPagination() {
        let re = await workbench.getMyTaskPagination({
          page: this.taskPagination.page,
          size: this.taskPagination.size,
          ...this.taskSearchForm,
        });
        this.taskTableList = re.content;
        this.taskPagination = re.pagination;
      },
      onCurrentChange(val) {
        this.taskPagination.page = val;
        this.getMyTaskPagination()
      },
    },
    components: {

    },
    created() {
      this.getMyPrj();
      this.getMyTask();
      this.getMyTaskPagination();
    },
    mounted() {
    }
  }
</script>