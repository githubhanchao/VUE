import moment from 'moment';

export default {
  data() {
    return {
      shortcutArray: [
        {
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          },
        },
        {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          },
        },
        {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          },
        },
      ],
    };
  },
  methods: {
    dateChange(currentDate) {
      if (currentDate && currentDate.length && currentDate.length > 0) {
        let endDate = moment(currentDate[1]).format('YYYY-MM-DD HH:mm:ss');
        if (endDate.indexOf('00:00:00') > -1) {
          endDate = new Date(currentDate[1].getTime() + 24 * 60 * 60 * 1000 - 1);
          return [currentDate[0], endDate];
        }
        return currentDate;
      }
      return currentDate;
    },
  },
}
