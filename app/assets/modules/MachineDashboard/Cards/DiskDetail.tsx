import BatteryChart from '@assets/components/Charts/BatteryChart';
import { IRootState } from '@assets/store';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapState = (state: IRootState) => {
  const { diskSizeStat, diskUsageRate } = state.machine;
  return {
    diskUsageDetail: diskUsageRate.map((instance, idx) => {
      const latestValues = _.last(instance.values);
      const size = diskSizeStat.length ? Number(diskSizeStat[idx].value[1]) : 0;

      return  {
        size,
        type: instance.metric.instance,
        value: latestValues ? Number(latestValues[1]) : 0,
      };
    })
  };
};

interface IProps extends ReturnType<typeof mapState> {

}

class DiskDetail extends React.Component<IProps> {
  render () {
    const { diskUsageDetail } = this.props;
    return (
      <div className="disk-detail detail-card">
        <BatteryChart data={diskUsageDetail} />
      </div>
    );
  }
}

export default connect(mapState)(DiskDetail);