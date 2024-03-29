import React, { PropTypes } from 'react';
import { Tabs, Buttonm, Button, Icon, message, Badge } from 'antd';
const TabPane = Tabs.TabPane;
import { routerRedux } from 'dva/router';

/**
* tab控制
*/
export class TabController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: null,

            panes: []
        };
    }

    componentWillMount() {
        // debugger;
        // console.log(this.props)
        const { name, keys, component } = this.props;
        if (keys === '/' || !name) {
            return;
        }
        // if (!name) {
        //     return;
        // }
        const panes = this.state.panes;
        const activeKey = keys;
        panes.push({ name, key: activeKey, component });
        this.setState({ panes, activeKey });
    }

    componentWillReceiveProps(nextProps) {
        const { name, keys, component } = nextProps;
        // if (!name) {
        //     return;
        // }
        if (keys === '/' || !name) {
            return;
        }
        const panes = this.state.panes;
        const activeKey = keys;
        let isExist = false;
        for (let i = 0; i < panes.length; i++) {
            if (panes[i].key === activeKey) {
                isExist = true;
                break;
            }
        }

        if (isExist) {
            //如果已经存在
            this.setState({
                activeKey
            });
        } else {
            panes.push({ name, key: activeKey, component });
            this.setState({ panes, activeKey });
        }
    }

    onChange = (activeKey) => {
        // this.setState({ activeKey });
        this.props.dispatch(routerRedux.push({
            pathname: activeKey,
        }))
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        if (this.state.panes.length === 1) {
            message.warning('窗口不能全部关闭');
            return;
        }
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render() {
        const { location, match } = this.props;
        return (
            <div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >

                    {this.state.panes.map(pane =>
                    pane.name=="首页"?
                        <TabPane closable={false} tab={pane.name} key={pane.key} style={{ padding: "12px 24px 24px 24px" }}>                          
                            <pane.component location={location} match={match} />
                        </TabPane>
                      : <TabPane tab={pane.name} key={pane.key} style={{ padding: "12px 24px 24px 24px" }}>
                            <pane.component location={location} match={match} />
                        </TabPane>
                    )}
                </Tabs>
            </div>
        )

    }
}