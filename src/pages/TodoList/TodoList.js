import React, { Component } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import {
  Table,
  Row,
  Col,
  DatePicker,
  Button
} from 'antd';
import ExportJsonExcel from 'js-export-excel';




@connect(({ tolist, loading }) => ({
  tolist,
  // loading: loading.models.tolist,
  loading: loading.effects['tolist/fetch']
}))

class TodoList extends Component {

  constructor(props){
    super(props);
    this.state={
      dateStrings:[],
      data:[]
    }
  }

  componentWillMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'tolist/fetch',
    //   payload: "sdate=2018-01-01&edate=2018-12-31",
    // });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props)

    // console.log(nextProps)
    this.setState(
      {
        data:nextProps.tolist.data.list
      }
    )
  }

  rangOnChange=(dates,dateStrings)=>{
    const self = this;
    self.setState({
      dateStrings
    })
    // console.log(dateStrings[0]);
    // console.log(self.state.dateStrings);

  }

  btuOnclick=()=>{
    // console.log(this.state.dateStrings);
    const datatime = "sdate="+this.state.dateStrings[0]+"&edate="+this.state.dateStrings[1]
    const { dispatch } = this.props;
    dispatch({
      type: 'tolist/fetch',
      payload: datatime,
    });
    console.log(datatime);
    // console.log(111);
  }

  downloadExcel = () => {
    const self = this;
    let data = self.state.data;
      var option={};
      let dataTable = [];
      if (data) {
        for (let i in data) {
          if(data){
            let obj = {
              '医院': data[i].hospname,
              '出院人次': data[i].hospname,
              'cm': data[i].hospname,
              'cmi': data[i].hospname,
              '组数': data[i].hospname,
              '平均住院日': data[i].hospname,
              '平均费用': data[i].hospname,
              '平均耗材费': data[i].hospname,
              '耗材占比': data[i].hospname,
              '低风险死亡率': data[i].hospname,
              '时间指数': data[i].hospname,
              '费用指数': data[i].hospname,
             
            }
            dataTable.push(obj);
          }
        }
      }
      option.fileName = '综合能力CMI'
      option.datas=[
        {
          sheetData:dataTable,
          sheetName:'sheet',
          sheetFilter:['医院','出院人次','cm','cmi','组数','平均住院日','平均费用','平均耗材费',"耗材占比","低风险死亡率","时间指数","费用指数"],
          sheetHeader:['医院','出院人次','cm','cmi','组数','平均住院日','平均费用','平均耗材费',"耗材占比","低风险死亡率","时间指数","费用指数"],
        }
      ];
    
      var toExcel = new ExportJsonExcel(option); 
      toExcel.saveExcel();        
    }

  render() {
  

    const columns = [
      {
        title: '医院',
        dataIndex: 'hospname',
        key: 'hospname',
      },
      {
        title: '出院人次',
        dataIndex: 'cnt',
        key: 'cnt',
      },
      {
        title: 'cm',
        dataIndex: 'cm',
        key: 'cm',
      },
      {
        title: 'cmi',
        dataIndex: 'cmi',
        key: 'cmi',
      },
      {
        title: '组数',
        dataIndex: 'gcnt',
        key: 'gcnt',
      },
      {
        title: '平均住院日',
        dataIndex: 'zydays',
        key: 'zydays',
      },
      {
        title: '平均费用',
        dataIndex: 'zfy',
        key: 'zfy',
      },
      {
        title: '平均药费',
        dataIndex: 'yf',
        key: 'yf',
      },
      {
        title: '药占比',
        dataIndex: 'yfrate',
        key: 'yfrate',
      },
      {
        title: '平均耗材费',
        dataIndex: 'hcf',
        key: 'hcf',
      },
      {
        title: '耗材占比',
        dataIndex: 'hcfrate',
        key: 'hcfrate',
      },
      {
        title: '低风险死亡率',
        dataIndex: 'lowdead',
        key: 'lowdead',
      },
      {
        title: '时间指数',
        dataIndex: 'dtindex',
        key: 'dtindex',
      },
      {
        title: '费用指数',
        dataIndex: 'fyindex',
        key: 'fyindex',
      },

    ];
    return (
      <div>
        <PageHeaderWrapper
          title="综合能力CMI"
          wrapperClassName={styles.advancedForm}
        >
          <div className={styles.tablediv}>
            <Row gutter={8} className={styles.timediv}>
              日期范围：<DatePicker.RangePicker onChange={this.rangOnChange}/>&nbsp;
             <Button type="primary" icon="search" onClick={this.btuOnclick}>查询</Button>
             <Button type="primary" icon="download" style={{float:"right"}} onClick={this.downloadExcel}>导出</Button>
            </Row>
            <Row style={{padding:16}}>
              <Table
                rowKey={record => record.hospname}
                bordered={true}
                dataSource={this.state.data}
                columns={columns}
                size='middle'
              />
            </Row>
            <Row>
            
            </Row>
          </div>

        </PageHeaderWrapper>
      </div>

    );
  }
}

export default TodoList;
