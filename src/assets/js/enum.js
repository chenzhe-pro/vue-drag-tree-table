// 声明枚举
export const ENUM = {
  manTypeEnum: {
    "1": '内部',
    "2": '外部'
  },
  equipmentStatus: {
    AVAILABLE: '可用',
    MAINTENANCE: '维修',
    DISABLE: "停用"
  },
  equipmentTypeEnum: {
    "ASSET": '资产',
    "NONASSET": '非资产'
  },
  equipmentMode: {
    'ASSET': {
      ACCRUED: '计提',
    },
    'NONASSET': {
      COUNT: '计次',
      TIMING: '计时'
    }
  },
  // equipmentMode: {
  //   COUNT: '计次',
  //   TIMING: '计时',
  //   ACCRUED: '计提',
  // },
  materialStatusEnum: {
    Y: "可用",
    N: "停用"
  },
  materialTypeEnum: {
    "SELF": '自制',
    "OUT": '外购',
    "OUTSOURCING": "委外"
  },
  taskPriorityEnum: {//优先级
    A: "紧急",
    B: "较高",
    C: "一般",
    // D: "较低"
  },
  taskPriorityTagEnum: {//优先级tag
    A: "danger",
    B: "warning",
    C: "",
    // D: "success"
  },
  taskStatusEnum: {//状态
    // '': "全部",
    INIT: "未开始",
    PROCEEDING: "进行中",
    ABNORMAL: "异常",
    SUSPEND: "暂停",
    COMPLETE: "已完成",
    ARCHIVED: "已归档"
  },
  taskStatusTagEnum: {
    // '': "全部",
    INIT: "info",
    PROCEEDING: "success",
    ABNORMAL: "danger",
    COMPLETE: "",
    ARCHIVED: "warning"
  },
  taskStatusColorEnum: {
    // '': "全部",
    INIT: "#909399",
    PROCEEDING: "#67C23A",
    ABNORMAL: "#F56C6C",
    COMPLETE: "#409EFF",
    ARCHIVED: "#E6A23C"
  },
  taskRelatedEnum: {
    FF: "FF 完成-完成",
    FS: "FS 完成-开始",
    SF: "SF 开始-完成",
    SS: "SS 开始-开始",
    NN: "NN 无关联关系"
  },
  templateTypeEnum: {
    SOFTWARE: "软件研发"
  },
  holidayTypeEnum: {
    WORK: "工作",
    REST: "休息",
    NN: "未开始"
  },
  prjStatusEnum: {
    '': "全部",
    INIT: "未开始",
    PROCEEDING: "进行中",
    ABNORMAL: "异常",
    SUSPEND: "暂停",
    COMPLETE: "已完成"
  },
  prjChangeStatusEnum: {
    INIT: "未开始",
    PROCEEDING: "进行中",
    ABNORMAL: "异常",
    SUSPEND: "暂停",
    COMPLETE: "已完成"
  },
  prjStatusTagEnum:{
    INIT: "info",
    PROCEEDING: "success",
    ABNORMAL: "danger",
    SUSPEND: "warning",
    COMPLETE: "primary"
  },
  prjMemberRuleEnum: {
    "2": "项目经理",
    "3": "项目成员",
    "4": "客户",
    "5": "协作人员",
  },
  overTimeTypeEnum: {
    WORKINGDAY: "工作日加班",
    WEEKEND: "周末加班",
    HOLIDAY: "节假日加班"
  },
  baselineTypeEnum: {
    AUTO: "自动",
    MANUAL: "手动"
  },
  baselineStatusEnum: {
    INIT: "未开始",
    FINISHED: "已完成"
  },
  docTypeEnum: {
    CUSTOMER_SUBMIT: "客户提交资料",
    ISSUE_CUSTOMER: "分发客户资料",
    PROJECT_DELIVER: "项目交付"
  },
}
