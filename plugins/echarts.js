import ECharts from 'echarts';

export default ({ app }, inject) => {
  inject('echarts', ECharts);
};
